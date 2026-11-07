import fs from "fs";
import os from "os";
import path from "path";
import crypto from "crypto";
import { hashPassword, verifyPassword, SessionPayload } from "../auth/session";
import { createSupabaseServerClient } from "../supabase/server";

export type ServiceCategory =
  | "Segurança Eletrônica"
  | "Instalações Elétricas"
  | "Manutenção Elétrica";

export interface UserRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  password_hash: string;
  reset_code?: string | null;
  reset_expires?: number | null;
  created_at: string;
  updated_at: string;
}

export interface PublicUserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "client" | "admin";
  created_at: string;
  updated_at: string;
}

export interface ReviewRecord {
  id: string;
  user_id: string;
  public_name: string;
  rating: number;
  service_category: ServiceCategory;
  comment: string;
  status: "pending" | "approved" | "rejected";
  is_demo: boolean;
  reported_count: number;
  created_at: string;
  updated_at: string;
}

export interface ReviewReportRecord {
  id: string;
  review_id: string;
  reporter_user_id: string | null;
  reason: string;
  details: string;
  status: "open" | "resolved" | "dismissed";
  created_at: string;
}

export interface ContactMessageRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_category: string;
  property_type: string;
  message: string;
  status: "unread" | "read" | "replied";
  created_at: string;
}

interface DatabaseSchema {
  users: UserRecord[];
  reviews: ReviewRecord[];
  review_reports: ReviewReportRecord[];
  contact_messages: ContactMessageRecord[];
}

/**
 * Em ambiente Serverless na Vercel (process.env.VERCEL), o diretório raiz (/var/task)
 * é somente leitura (read-only). Utilizamos os.tmpdir() (/tmp) na Vercel e ./data localmente,
 * além de cache em memória para máxima resiliência.
 */
const IS_VERCEL = Boolean(process.env.VERCEL || process.env.VERCEL_ENV);
const DB_DIR = IS_VERCEL
  ? path.join(os.tmpdir(), "alltech-data")
  : path.join(process.cwd(), "data");
const DB_FILE = path.join(DB_DIR, "alltech-db.json");

let memoryDbCache: DatabaseSchema | null = null;

export class RLSError extends Error {
  statusCode: number;
  constructor(message: string, statusCode = 403) {
    super(message);
    this.name = "RLSError";
    this.statusCode = statusCode;
  }
}

function getInitialSeedData(): DatabaseSchema {
  const adminEmail =
    process.env.ADMIN_DEFAULT_EMAIL || "admin@alltechsolucoes.com.br";
  const adminPass = process.env.ADMIN_DEFAULT_PASSWORD || "Alltech@Admin2026";
  const now = new Date().toISOString();

  const adminId = "00000000-0000-4000-8000-000000000001";
  const demoUser1Id = "00000000-0000-4000-8000-000000000002";
  const demoUser2Id = "00000000-0000-4000-8000-000000000003";
  const demoUser3Id = "00000000-0000-4000-8000-000000000004";

  return {
    users: [
      {
        id: adminId,
        name: "Administrador Alltech Soluções",
        email: adminEmail.toLowerCase(),
        phone: "(21) 99822-1178",
        role: "admin",
        password_hash: hashPassword(adminPass),
        created_at: now,
        updated_at: now,
      },
      {
        id: demoUser1Id,
        name: "Perfil de Demonstração — Residencial",
        email: "demo.residencial@exemplo.local",
        phone: "(21) 90000-0001",
        role: "client",
        password_hash: hashPassword("Demo@123456"),
        created_at: now,
        updated_at: now,
      },
      {
        id: demoUser2Id,
        name: "Perfil de Demonstração — Comercial",
        email: "demo.comercial@exemplo.local",
        phone: "(21) 90000-0002",
        role: "client",
        password_hash: hashPassword("Demo@123456"),
        created_at: now,
        updated_at: now,
      },
      {
        id: demoUser3Id,
        name: "Perfil de Demonstração — Condomínio",
        email: "demo.condominio@exemplo.local",
        phone: "(21) 90000-0003",
        role: "client",
        password_hash: hashPassword("Demo@123456"),
        created_at: now,
        updated_at: now,
      },
    ],
    reviews: [
      {
        id: "10000000-0000-4000-8000-000000000001",
        user_id: demoUser1Id,
        public_name: "Exemplo de Avaliação (Residência & Acompanhamento de Idosos)",
        rating: 5,
        service_category: "Segurança Eletrônica",
        comment:
          "[REGISTRO DE DEMONSTRAÇÃO] Exemplo de como a avaliação de um cliente aparece no sistema: instalação de câmeras com acesso remoto configurado no celular para acompanhamento de familiares idosos em casa, com imagem nítida dia e noite.",
        status: "approved",
        is_demo: true,
        reported_count: 0,
        created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 5).toISOString(),
      },
      {
        id: "10000000-0000-4000-8000-000000000002",
        user_id: demoUser2Id,
        public_name: "Exemplo de Avaliação (Quadro Elétrico Empresarial)",
        rating: 5,
        service_category: "Instalações Elétricas",
        comment:
          "[REGISTRO DE DEMONSTRAÇÃO] Exemplo ilustrativo do sistema de avaliações: montagem e organização completa do quadro elétrico da empresa, com identificação dos disjuntores, proteção DR/DPS e cabeamento organizado.",
        status: "approved",
        is_demo: true,
        reported_count: 0,
        created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: "10000000-0000-4000-8000-000000000003",
        user_id: demoUser3Id,
        public_name: "Exemplo de Avaliação (Manutenção Elétrica & CFTV)",
        rating: 5,
        service_category: "Manutenção Elétrica",
        comment:
          "[REGISTRO DE DEMONSTRAÇÃO] Exemplo ilustrativo de avaliação publicada: diagnóstico rápido de falha elétrica com multímetro e revisão preventiva do sistema de câmeras do condomínio.",
        status: "approved",
        is_demo: true,
        reported_count: 0,
        created_at: new Date(Date.now() - 86400000 * 1).toISOString(),
        updated_at: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ],
    review_reports: [],
    contact_messages: [
      {
        id: "20000000-0000-4000-8000-000000000001",
        name: "Mensagem de Exemplo (Demonstração do Painel)",
        email: "exemplo@demonstracao.local",
        phone: "(21) 99999-0000",
        service_category: "Segurança Eletrônica",
        property_type: "Empresa / Estoque",
        message:
          "[EXEMPLO DE DEMONSTRAÇÃO] Olá! Gostaria de solicitar um orçamento para instalação de Kit com 4 câmeras de segurança para monitoramento do nosso estoque e organização do quadro elétrico.",
        status: "unread",
        created_at: now,
      },
    ],
  };
}

function readLocalDb(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initial = memoryDbCache || getInitialSeedData();
      memoryDbCache = initial;
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    const parsed = JSON.parse(raw) as DatabaseSchema;
    memoryDbCache = parsed;
    return parsed;
  } catch {
    if (!memoryDbCache) {
      memoryDbCache = getInitialSeedData();
    }
    return memoryDbCache;
  }
}

function writeLocalDb(data: DatabaseSchema): void {
  memoryDbCache = data;
  try {
    if (!fs.existsSync(DB_DIR)) {
      fs.mkdirSync(DB_DIR, { recursive: true });
    }
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch {
    // Caso o ambiente Serverless bloqueie escrita em disco, mantém em memoryDbCache sem erro
  }
}

function sanitizeUser(user: UserRecord): PublicUserProfile {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    phone: user.phone,
    role: user.role,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}

function assertAuthenticated(actor: SessionPayload | null): SessionPayload {
  if (!actor || !actor.userId) {
    throw new RLSError(
      "Acesso negado (RLS): Usuário não autenticado. Faça login para continuar.",
      401
    );
  }
  return actor;
}

function assertAdmin(actor: SessionPayload | null): SessionPayload {
  const authed = assertAuthenticated(actor);
  if (authed.role !== "admin") {
    throw new RLSError(
      "Acesso negado (RLS): Permissão exclusiva para o administrador da empresa.",
      403
    );
  }
  return authed;
}

// ============================================================================
// OPERAÇÕES DE AUTENTICAÇÃO E PERFIL DE USUÁRIOS
// ============================================================================

export async function registerUser(input: {
  name: string;
  email: string;
  phone?: string;
  password: string;
}): Promise<PublicUserProfile> {
  const cleanEmail = input.email.trim().toLowerCase();
  const cleanName = input.name.trim();
  const cleanPhone = (input.phone || "").trim();

  if (!cleanName || cleanName.length < 2) {
    throw new RLSError("Informe seu nome completo (mínimo 2 caracteres).", 400);
  }
  if (!cleanEmail.includes("@")) {
    throw new RLSError("Informe um endereço de e-mail válido.", 400);
  }
  if (!input.password || input.password.length < 6) {
    throw new RLSError("A senha deve ter pelo menos 6 caracteres.", 400);
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password: input.password,
      options: {
        data: { name: cleanName, phone: cleanPhone },
      },
    });
    if (error) {
      throw new RLSError(error.message, 400);
    }
    if (data.user) {
      return {
        id: data.user.id,
        name: cleanName,
        email: cleanEmail,
        phone: cleanPhone,
        role: "client",
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
    }
  }

  const db = readLocalDb();
  const exists = db.users.find((u) => u.email === cleanEmail);
  if (exists) {
    throw new RLSError("Já existe uma conta cadastrada com este e-mail.", 409);
  }

  const now = new Date().toISOString();
  const newUser: UserRecord = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    role: "client",
    password_hash: hashPassword(input.password),
    created_at: now,
    updated_at: now,
  };

  db.users.push(newUser);
  writeLocalDb(db);
  return sanitizeUser(newUser);
}

export async function authenticateUser(input: {
  email: string;
  password: string;
}): Promise<PublicUserProfile> {
  const cleanEmail = input.email.trim().toLowerCase();

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password: input.password,
    });
    if (error || !data.user) {
      throw new RLSError("E-mail ou senha inválidos.", 401);
    }
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", data.user.id)
      .single();

    return {
      id: data.user.id,
      name: profile?.name || data.user.user_metadata?.name || cleanEmail,
      email: cleanEmail,
      phone: profile?.phone || "",
      role: profile?.role === "admin" ? "admin" : "client",
      created_at: profile?.created_at || new Date().toISOString(),
      updated_at: profile?.updated_at || new Date().toISOString(),
    };
  }

  const db = readLocalDb();
  const user = db.users.find((u) => u.email === cleanEmail);
  if (!user || !verifyPassword(input.password, user.password_hash)) {
    throw new RLSError("E-mail ou senha incorretos. Verifique seus dados.", 401);
  }

  return sanitizeUser(user);
}

export async function requestPasswordReset(email: string): Promise<{
  resetCode: string;
  email: string;
}> {
  const cleanEmail = email.trim().toLowerCase();
  const db = readLocalDb();
  const user = db.users.find((u) => u.email === cleanEmail);
  if (!user) {
    throw new RLSError("Nenhuma conta encontrada com este endereço de e-mail.", 404);
  }

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  user.reset_code = code;
  user.reset_expires = Date.now() + 15 * 60 * 1000;
  user.updated_at = new Date().toISOString();
  writeLocalDb(db);

  return { resetCode: code, email: cleanEmail };
}

export async function resetPasswordWithCode(input: {
  email: string;
  code: string;
  newPassword: string;
}): Promise<PublicUserProfile> {
  const cleanEmail = input.email.trim().toLowerCase();
  if (!input.newPassword || input.newPassword.length < 6) {
    throw new RLSError("A nova senha deve ter no mínimo 6 caracteres.", 400);
  }

  const db = readLocalDb();
  const user = db.users.find((u) => u.email === cleanEmail);
  if (!user) {
    throw new RLSError("Usuário não encontrado.", 404);
  }
  if (
    !user.reset_code ||
    user.reset_code !== input.code.trim() ||
    !user.reset_expires ||
    Date.now() > user.reset_expires
  ) {
    throw new RLSError("Código de recuperação inválido ou expirado.", 400);
  }

  user.password_hash = hashPassword(input.newPassword);
  user.reset_code = null;
  user.reset_expires = null;
  user.updated_at = new Date().toISOString();
  writeLocalDb(db);

  return sanitizeUser(user);
}

export async function getUserProfile(
  actor: SessionPayload | null,
  targetUserId: string
): Promise<PublicUserProfile> {
  const authed = assertAuthenticated(actor);
  if (authed.userId !== targetUserId && authed.role !== "admin") {
    throw new RLSError(
      "Violação de RLS: Você não tem permissão para acessar os dados privados de outro usuário.",
      403
    );
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", targetUserId)
      .single();
    if (profile) {
      return {
        id: profile.id,
        name: profile.name,
        email: profile.email,
        phone: profile.phone || "",
        role: profile.role,
        created_at: profile.created_at,
        updated_at: profile.updated_at,
      };
    }
  }

  const db = readLocalDb();
  const user = db.users.find((u) => u.id === targetUserId);
  if (!user) {
    throw new RLSError("Perfil de usuário não encontrado.", 404);
  }
  return sanitizeUser(user);
}

export async function updateUserProfile(
  actor: SessionPayload | null,
  targetUserId: string,
  updates: {
    name?: string;
    phone?: string;
    currentPassword?: string;
    newPassword?: string;
  }
): Promise<PublicUserProfile> {
  const authed = assertAuthenticated(actor);
  if (authed.userId !== targetUserId) {
    throw new RLSError(
      "Violação de RLS: Você só pode editar as informações do seu próprio perfil.",
      403
    );
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const updatePayload: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (updates.name !== undefined) updatePayload.name = updates.name.trim();
    if (updates.phone !== undefined) updatePayload.phone = updates.phone.trim();

    const { data: updatedProfile, error } = await supabase
      .from("profiles")
      .update(updatePayload)
      .eq("id", targetUserId)
      .select("*")
      .single();

    if (!error && updatedProfile) {
      if (updates.newPassword) {
        await supabase.auth.updateUser({ password: updates.newPassword });
      }
      return {
        id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        phone: updatedProfile.phone || "",
        role: updatedProfile.role,
        created_at: updatedProfile.created_at,
        updated_at: updatedProfile.updated_at,
      };
    }
  }

  const db = readLocalDb();
  const user = db.users.find((u) => u.id === targetUserId);
  if (!user) {
    throw new RLSError("Usuário não encontrado.", 404);
  }

  if (updates.name !== undefined) {
    const cleanName = updates.name.trim();
    if (cleanName.length < 2) {
      throw new RLSError("O nome deve ter pelo menos 2 caracteres.", 400);
    }
    user.name = cleanName;
    db.reviews.forEach((rev) => {
      if (rev.user_id === user.id && !rev.is_demo) {
        rev.public_name = cleanName;
      }
    });
  }

  if (updates.phone !== undefined) {
    user.phone = updates.phone.trim();
  }

  if (updates.newPassword) {
    if (updates.newPassword.length < 6) {
      throw new RLSError("A nova senha deve ter pelo menos 6 caracteres.", 400);
    }
    if (
      updates.currentPassword &&
      !verifyPassword(updates.currentPassword, user.password_hash)
    ) {
      throw new RLSError("A senha atual informada está incorreta.", 400);
    }
    user.password_hash = hashPassword(updates.newPassword);
  }

  user.updated_at = new Date().toISOString();
  writeLocalDb(db);
  return sanitizeUser(user);
}

// ============================================================================
// OPERAÇÕES DE AVALIAÇÕES (COM CONTROLE ESTRITO DE RLS)
// ============================================================================

export async function getPublicReviews(): Promise<{
  reviews: ReviewRecord[];
  stats: {
    averageRating: number;
    totalCount: number;
    realCount: number;
    demoCount: number;
    distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  };
}> {
  let approved: ReviewRecord[] = [];

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("reviews")
      .select(
        "id, user_id, public_name, rating, service_category, comment, status, is_demo, reported_count, created_at, updated_at"
      )
      .eq("status", "approved")
      .order("created_at", { ascending: false });

    if (data && data.length > 0) {
      approved = data as ReviewRecord[];
    }
  }

  if (approved.length === 0) {
    const db = readLocalDb();
    approved = db.reviews
      .filter((r) => r.status === "approved")
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
  }

  const distribution: Record<1 | 2 | 3 | 4 | 5, number> = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  };

  let sum = 0;
  let realCount = 0;
  let demoCount = 0;

  for (const r of approved) {
    const star = Math.min(5, Math.max(1, Math.round(r.rating))) as
      | 1
      | 2
      | 3
      | 4
      | 5;
    distribution[star] += 1;
    sum += r.rating;
    if (r.is_demo) demoCount++;
    else realCount++;
  }

  const totalCount = approved.length;
  const averageRating =
    totalCount > 0 ? Number((sum / totalCount).toFixed(1)) : 5.0;

  return {
    reviews: approved,
    stats: {
      averageRating,
      totalCount,
      realCount,
      demoCount,
      distribution,
    },
  };
}

export async function getUserOwnReviews(
  actor: SessionPayload | null
): Promise<ReviewRecord[]> {
  const authed = assertAuthenticated(actor);

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data } = await supabase
      .from("reviews")
      .select("*")
      .eq("user_id", authed.userId)
      .order("created_at", { ascending: false });
    if (data) return data as ReviewRecord[];
  }

  const db = readLocalDb();
  return db.reviews
    .filter((r) => r.user_id === authed.userId)
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
}

export async function createReview(
  actor: SessionPayload | null,
  input: {
    rating: number;
    service_category: ServiceCategory;
    comment: string;
  }
): Promise<ReviewRecord> {
  const authed = assertAuthenticated(actor);
  const rating = Number(input.rating);
  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw new RLSError("A nota da avaliação deve ser de 1 a 5 estrelas.", 400);
  }

  const cleanComment = (input.comment || "").trim();
  if (cleanComment.length < 10) {
    throw new RLSError(
      "Escreva um comentário com pelo menos 10 caracteres detalhando sua experiência.",
      400
    );
  }

  const validCategories: ServiceCategory[] = [
    "Segurança Eletrônica",
    "Instalações Elétricas",
    "Manutenção Elétrica",
  ];
  const category: ServiceCategory = validCategories.includes(
    input.service_category
  )
    ? input.service_category
    : "Segurança Eletrônica";

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        user_id: authed.userId,
        public_name: authed.name,
        rating: Math.round(rating),
        service_category: category,
        comment: cleanComment,
        status: "approved",
        is_demo: false,
      })
      .select("*")
      .single();

    if (!error && data) {
      return data as ReviewRecord;
    }
  }

  const db = readLocalDb();
  const userRecord = db.users.find((u) => u.id === authed.userId);
  const publicName = userRecord ? userRecord.name : authed.name;

  const now = new Date().toISOString();
  const newReview: ReviewRecord = {
    id: crypto.randomUUID(),
    user_id: authed.userId,
    public_name: publicName,
    rating: Math.round(rating),
    service_category: category,
    comment: cleanComment,
    status: "approved",
    is_demo: false,
    reported_count: 0,
    created_at: now,
    updated_at: now,
  };

  db.reviews.unshift(newReview);
  writeLocalDb(db);
  return newReview;
}

export async function updateReview(
  actor: SessionPayload | null,
  reviewId: string,
  input: {
    rating?: number;
    service_category?: ServiceCategory;
    comment?: string;
  }
): Promise<ReviewRecord> {
  const authed = assertAuthenticated(actor);
  const db = readLocalDb();
  const review = db.reviews.find((r) => r.id === reviewId);

  if (!review) {
    throw new RLSError("Avaliação não encontrada.", 404);
  }

  if (review.user_id !== authed.userId && authed.role !== "admin") {
    throw new RLSError(
      "Violação de RLS: Você só tem permissão para editar suas próprias avaliações.",
      403
    );
  }

  if (input.rating !== undefined) {
    const rating = Number(input.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      throw new RLSError("A avaliação deve ser entre 1 e 5 estrelas.", 400);
    }
    review.rating = Math.round(rating);
  }

  if (input.service_category !== undefined) {
    const validCategories: ServiceCategory[] = [
      "Segurança Eletrônica",
      "Instalações Elétricas",
      "Manutenção Elétrica",
    ];
    if (validCategories.includes(input.service_category)) {
      review.service_category = input.service_category;
    }
  }

  if (input.comment !== undefined) {
    const cleanComment = input.comment.trim();
    if (cleanComment.length < 10) {
      throw new RLSError(
        "O comentário deve ter pelo menos 10 caracteres.",
        400
      );
    }
    review.comment = cleanComment;
  }

  review.updated_at = new Date().toISOString();
  writeLocalDb(db);
  return review;
}

export async function deleteReview(
  actor: SessionPayload | null,
  reviewId: string
): Promise<void> {
  const authed = assertAuthenticated(actor);
  const db = readLocalDb();
  const idx = db.reviews.findIndex((r) => r.id === reviewId);

  if (idx === -1) {
    throw new RLSError("Avaliação não encontrada.", 404);
  }

  const target = db.reviews[idx];
  if (target.user_id !== authed.userId && authed.role !== "admin") {
    throw new RLSError(
      "Violação de RLS: Você só pode excluir avaliações de sua própria autoria.",
      403
    );
  }

  db.reviews.splice(idx, 1);
  db.review_reports = db.review_reports.filter(
    (rep) => rep.review_id !== reviewId
  );
  writeLocalDb(db);
}

export async function reportReview(
  actor: SessionPayload | null,
  reviewId: string,
  input: {
    reason: string;
    details?: string;
  }
): Promise<ReviewReportRecord> {
  const cleanReason = (input.reason || "").trim();
  if (!cleanReason) {
    throw new RLSError("Selecione o motivo da denúncia.", 400);
  }

  const db = readLocalDb();
  const review = db.reviews.find((r) => r.id === reviewId);
  if (!review) {
    throw new RLSError("Avaliação não encontrada.", 404);
  }

  review.reported_count = (review.reported_count || 0) + 1;

  const newReport: ReviewReportRecord = {
    id: crypto.randomUUID(),
    review_id: reviewId,
    reporter_user_id: actor?.userId || null,
    reason: cleanReason,
    details: (input.details || "").trim(),
    status: "open",
    created_at: new Date().toISOString(),
  };

  db.review_reports.unshift(newReport);
  writeLocalDb(db);
  return newReport;
}

// ============================================================================
// OPERAÇÕES DO FORMULÁRIO DE CONTATO
// ============================================================================

export async function createContactMessage(input: {
  name: string;
  email: string;
  phone: string;
  service_category: string;
  property_type: string;
  message: string;
}): Promise<ContactMessageRecord> {
  const cleanName = (input.name || "").trim();
  const cleanEmail = (input.email || "").trim();
  const cleanPhone = (input.phone || "").trim();
  const cleanMsg = (input.message || "").trim();

  if (!cleanName || cleanName.length < 2) {
    throw new RLSError("Por favor, informe seu nome.", 400);
  }
  if (!cleanPhone || cleanPhone.length < 8) {
    throw new RLSError("Por favor, informe seu telefone ou WhatsApp.", 400);
  }
  if (!cleanMsg || cleanMsg.length < 5) {
    throw new RLSError("Descreva brevemente sua necessidade na mensagem.", 400);
  }

  const supabase = await createSupabaseServerClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("contact_messages")
      .insert({
        name: cleanName,
        email: cleanEmail || "Não informado",
        phone: cleanPhone,
        service_category: input.service_category || "Segurança Eletrônica",
        property_type: input.property_type || "Residência",
        message: cleanMsg,
        status: "unread",
      })
      .select("*")
      .single();

    if (!error && data) {
      return data as ContactMessageRecord;
    }
  }

  const db = readLocalDb();
  const record: ContactMessageRecord = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail || "Não informado",
    phone: cleanPhone,
    service_category: input.service_category || "Segurança Eletrônica",
    property_type: input.property_type || "Residência",
    message: cleanMsg,
    status: "unread",
    created_at: new Date().toISOString(),
  };

  db.contact_messages.unshift(record);
  writeLocalDb(db);
  return record;
}

// ============================================================================
// FUNÇÕES ADMINISTRATIVAS PROTEGIDAS NO SERVIDOR (RLS EXCLUSIVO ADMIN)
// ============================================================================

export async function adminGetDashboardData(actor: SessionPayload | null) {
  assertAdmin(actor);
  const db = readLocalDb();

  const users = db.users.map((u) => ({
    ...sanitizeUser(u),
    reviewsCount: db.reviews.filter((r) => r.user_id === u.id).length,
  }));

  return {
    users,
    reviews: db.reviews,
    reports: db.review_reports.map((rep) => {
      const targetReview = db.reviews.find((r) => r.id === rep.review_id);
      return {
        ...rep,
        review_author: targetReview?.public_name || "Avaliação removida",
        review_comment: targetReview?.comment || "",
      };
    }),
    contacts: db.contact_messages,
  };
}

export async function adminModerateReview(
  actor: SessionPayload | null,
  reviewId: string,
  status: "approved" | "rejected" | "pending"
): Promise<ReviewRecord> {
  assertAdmin(actor);
  const db = readLocalDb();
  const review = db.reviews.find((r) => r.id === reviewId);
  if (!review) {
    throw new RLSError("Avaliação não encontrada.", 404);
  }

  review.status = status;
  review.updated_at = new Date().toISOString();
  writeLocalDb(db);
  return review;
}

export async function adminResolveReport(
  actor: SessionPayload | null,
  reportId: string,
  status: "resolved" | "dismissed"
): Promise<ReviewReportRecord> {
  assertAdmin(actor);
  const db = readLocalDb();
  const report = db.review_reports.find((r) => r.id === reportId);
  if (!report) {
    throw new RLSError("Denúncia não encontrada.", 404);
  }

  report.status = status;
  writeLocalDb(db);
  return report;
}

export async function adminUpdateContactStatus(
  actor: SessionPayload | null,
  messageId: string,
  status: "unread" | "read" | "replied"
): Promise<ContactMessageRecord> {
  assertAdmin(actor);
  const db = readLocalDb();
  const msg = db.contact_messages.find((m) => m.id === messageId);
  if (!msg) {
    throw new RLSError("Mensagem de contato não encontrada.", 404);
  }

  msg.status = status;
  writeLocalDb(db);
  return msg;
}

export async function adminDeleteContactMessage(
  actor: SessionPayload | null,
  messageId: string
): Promise<void> {
  assertAdmin(actor);
  const db = readLocalDb();
  const idx = db.contact_messages.findIndex((m) => m.id === messageId);
  if (idx === -1) {
    throw new RLSError("Mensagem não encontrada.", 404);
  }

  db.contact_messages.splice(idx, 1);
  writeLocalDb(db);
}
