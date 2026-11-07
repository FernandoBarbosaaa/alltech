import React from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Camera,
  Zap,
  Wrench,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import { AlltechLogo } from "./AlltechLogo";
import { getWhatsAppUrl, SITE_CONFIG } from "@/config/site";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-brand-500/20">
      {/* Faixa Superior de Conversão */}
      <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-400">
              <ShieldCheck className="w-4 h-4" />
              Proteção Patrimonial & Engenharia Elétrica
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Precisa instalar câmeras ou revisar sua rede elétrica?
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl">
              Fale diretamente com a equipe técnica da Alltech Soluções e receba
              um orçamento personalizado para sua residência, empresa ou
              condomínio.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-lg hover:shadow-glow-amber transition-all"
            >
              Solicitar Orçamento no WhatsApp
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
            >
              Formulário de Contato
            </Link>
          </div>
        </div>
      </div>

      {/* Conteúdo Principal do Rodapé */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Coluna 1: Identidade */}
          <div className="space-y-4">
            <AlltechLogo variant="light" size="md" />
            <p className="text-sm text-slate-400 leading-relaxed">
              Especialistas em segurança eletrônica, instalação de câmeras de
              segurança (CFTV), monitoramento remoto pelo celular, instalações
              elétricas e manutenção elétrica preventiva e corretiva.
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-brand-500/15 text-brand-300 px-2.5 py-1 rounded-md border border-brand-500/30">
                <Camera className="w-3.5 h-3.5" /> Segurança Eletrônica
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-500/15 text-amber-300 px-2.5 py-1 rounded-md border border-amber-500/30">
                <Zap className="w-3.5 h-3.5" /> Serviços Elétricos
              </span>
            </div>
          </div>

          {/* Coluna 2: Especialidades */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4">
              Nossas Especialidades
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/servicos#seguranca-eletronica"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-brand-400 shrink-0" />
                  Instalação de Câmeras e CFTV
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#seguranca-eletronica"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-brand-400 shrink-0" />
                  Acompanhamento de Idosos e Residências
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#seguranca-eletronica"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Camera className="w-4 h-4 text-brand-400 shrink-0" />
                  CFTV para Empresas, Estoques e Condomínios
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#instalacoes-eletricas"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-accent-400 shrink-0" />
                  Montagem e Organização de Quadros Elétricos
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#instalacoes-eletricas"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Zap className="w-4 h-4 text-accent-400 shrink-0" />
                  Instalações Elétricas Residenciais e Comerciais
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos#manutencao-eletrica"
                  className="hover:text-brand-400 transition-colors flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4 text-emerald-400 shrink-0" />
                  Manutenção Preventiva, Corretiva e Diagnóstico
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Navegação Rápida e Conta */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4">
              Navegação do Site
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-400 transition-colors"
                >
                  Página Inicial
                </Link>
              </li>
              <li>
                <Link
                  href="/servicos"
                  className="hover:text-brand-400 transition-colors"
                >
                  Catálogo Completo de Serviços
                </Link>
              </li>
              <li>
                <Link
                  href="/sobre"
                  className="hover:text-brand-400 transition-colors"
                >
                  Sobre a Alltech Soluções
                </Link>
              </li>
              <li>
                <Link
                  href="/avaliacoes"
                  className="hover:text-brand-400 transition-colors"
                >
                  Avaliações de Clientes
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="hover:text-brand-400 transition-colors"
                >
                  Solicitar Orçamento / Contato
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="hover:text-brand-400 transition-colors"
                >
                  Área do Cliente (Login / Cadastro)
                </Link>
              </li>
            </ul>
          </div>

          {/* Coluna 4: Contato Direto */}
          <div>
            <h3 className="text-white font-display font-bold text-base mb-4">
              Atendimento e Contato
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">
                    WhatsApp & Telefone
                  </span>
                  <a
                    href={getWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white font-bold hover:text-brand-400 transition-colors"
                  >
                    {SITE_CONFIG.whatsapp.display}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">E-mail</span>
                  <a
                    href={`mailto:${SITE_CONFIG.contact.email}`}
                    className="text-slate-200 hover:text-brand-400 transition-colors break-all"
                  >
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">
                    Região de Atendimento
                  </span>
                  <span className="text-slate-200">
                    {SITE_CONFIG.contact.region}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-brand-400 shrink-0 mt-1" />
                <div>
                  <span className="block text-xs text-slate-400">
                    Horário de Atendimento
                  </span>
                  <span className="text-slate-200">
                    {SITE_CONFIG.contact.hours}
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra Inferior de Direitos */}
      <div className="border-t border-white/10 bg-navy-950 py-6 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            © {currentYear} <strong>{SITE_CONFIG.name}</strong> — Segurança
            Eletrônica e Instalações Elétricas. Todos os direitos reservados.
          </p>
          <p className="text-slate-500">
            Sua segurança e tranquilidade em boas mãos.
          </p>
        </div>
      </div>
    </footer>
  );
}
