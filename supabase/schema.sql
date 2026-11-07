-- ============================================================================
-- ALLTECH SOLUÇÕES — SUPABASE POSTGRESQL SCHEMA & ROW LEVEL SECURITY (RLS)
-- Segurança Eletrônica, Instalação de Câmeras (CFTV) e Serviços Elétricos
-- ============================================================================

-- Extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ----------------------------------------------------------------------------
-- 1. TABELA DE PERFIS DE USUÁRIOS (profiles)
-- Vinculada a auth.users do Supabase Auth
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  role TEXT NOT NULL DEFAULT 'client' CHECK (role IN ('client', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Função auxiliar segura no servidor para verificar se o usuário autenticado é admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Trigger para criar perfil automaticamente ao registrar no Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, phone, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    'client'
  );
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ----------------------------------------------------------------------------
-- 2. TABELA DE AVALIAÇÕES DE CLIENTES (reviews)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  public_name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  service_category TEXT NOT NULL DEFAULT 'Segurança Eletrônica'
    CHECK (service_category IN ('Segurança Eletrônica', 'Instalações Elétricas', 'Manutenção Elétrica')),
  comment TEXT NOT NULL CHECK (char_length(trim(comment)) >= 10),
  status TEXT NOT NULL DEFAULT 'approved'
    CHECK (status IN ('pending', 'approved', 'rejected')),
  is_demo BOOLEAN NOT NULL DEFAULT FALSE,
  reported_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 3. TABELA DE DENÚNCIAS DE COMENTÁRIOS (review_reports)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.review_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  reporter_user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reason TEXT NOT NULL,
  details TEXT,
  status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 4. TABELA DE MENSAGENS DE CONTATO / ORÇAMENTOS (contact_messages)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service_category TEXT NOT NULL,
  property_type TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ----------------------------------------------------------------------------
-- 5. VIEW PÚBLICA SEGURA DE AVALIAÇÕES
-- Garante que dados privados (e-mail, telefone) nunca sejam expostos
-- ----------------------------------------------------------------------------
CREATE OR REPLACE VIEW public.public_reviews_view AS
SELECT
  r.id,
  r.user_id,
  r.public_name,
  r.rating,
  r.service_category,
  r.comment,
  r.status,
  r.is_demo,
  r.created_at,
  r.updated_at
FROM public.reviews r
WHERE r.status = 'approved';

-- ============================================================================
-- 6. POLÍTICAS DE SEGURANÇA (ROW LEVEL SECURITY - RLS)
-- ============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- ---- POLÍTICAS: profiles ----
-- Cada usuário vê apenas seus próprios dados privados; admin vê todos os clientes.
CREATE POLICY "Usuários visualizam apenas seu próprio perfil ou admin vê todos"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

-- Cada usuário pode atualizar somente seu próprio perfil (sem alterar o campo role).
CREATE POLICY "Usuários atualizam apenas seu próprio perfil"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND (role = (SELECT p.role FROM public.profiles p WHERE p.id = auth.uid()))
  );

-- ---- POLÍTICAS: reviews ----
-- Qualquer visitante vê avaliações aprovadas; o autor vê as próprias; admin vê todas.
CREATE POLICY "Leitura pública de avaliações aprovadas, próprias ou admin"
  ON public.reviews FOR SELECT
  USING (
    status = 'approved'
    OR auth.uid() = user_id
    OR public.is_admin()
  );

-- Clientes autenticados podem publicar avaliações apenas em seu próprio user_id.
CREATE POLICY "Clientes autenticados criam avaliações próprias"
  ON public.reviews FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND is_demo = FALSE
  );

-- Cada usuário edita somente suas próprias avaliações; admin pode moderar qualquer avaliação.
CREATE POLICY "Autor edita sua própria avaliação ou admin modera"
  ON public.reviews FOR UPDATE
  USING (auth.uid() = user_id OR public.is_admin())
  WITH CHECK (auth.uid() = user_id OR public.is_admin());

-- Cada usuário exclui somente suas próprias avaliações; admin pode excluir comentários inadequados.
CREATE POLICY "Autor exclui sua própria avaliação ou admin exclui"
  ON public.reviews FOR DELETE
  USING (auth.uid() = user_id OR public.is_admin());

-- ---- POLÍTICAS: review_reports ----
-- Qualquer visitante/usuário pode registrar uma denúncia de comentário inadequado.
CREATE POLICY "Qualquer pessoa pode denunciar comentário inadequado"
  ON public.review_reports FOR INSERT
  WITH CHECK (true);

-- Somente o administrador pode ler, moderar ou excluir denúncias.
CREATE POLICY "Somente administrador visualiza denúncias"
  ON public.review_reports FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Somente administrador atualiza denúncias"
  ON public.review_reports FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

-- ---- POLÍTICAS: contact_messages ----
-- Qualquer visitante pode enviar mensagem pelo formulário de contato.
CREATE POLICY "Visitantes podem enviar mensagens de contato"
  ON public.contact_messages FOR INSERT
  WITH CHECK (true);

-- Somente o administrador pode visualizar, atualizar ou excluir mensagens de contato.
CREATE POLICY "Somente administrador visualiza mensagens de contato"
  ON public.contact_messages FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Somente administrador gerencia mensagens de contato"
  ON public.contact_messages FOR UPDATE
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Somente administrador exclui mensagens de contato"
  ON public.contact_messages FOR DELETE
  USING (public.is_admin());

-- ============================================================================
-- 7. STORAGE BUCKET PARA IMAGENS DE PROJETOS E SEGURANÇA
-- ============================================================================
INSERT INTO storage.buckets (id, name, public)
VALUES ('alltech-media', 'alltech-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Imagens públicas para leitura"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'alltech-media');

CREATE POLICY "Apenas admin faz upload de imagens"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'alltech-media' AND public.is_admin());
