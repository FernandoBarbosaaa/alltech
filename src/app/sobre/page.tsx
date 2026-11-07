import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Camera,
  Zap,
  Wrench,
  CheckCircle2,
  HeartHandshake,
  PhoneCall,
  ArrowRight,
  Lock,
  Smartphone,
} from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG, TARGET_AUDIENCES } from "@/config/site";

export const metadata: Metadata = {
  title: "Sobre Nós — Compromisso com Segurança e Qualidade Técnica",
  description:
    "Conheça a proposta de trabalho da Alltech Soluções: dedicação exclusiva à segurança eletrônica, sistemas de CFTV e instalações e manutenções elétricas seguras.",
};

export default function SobrePage() {
  return (
    <div className="bg-slate-50 pb-24">
      {/* Cabeçalho */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 border-b border-brand-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-35" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <ShieldCheck className="w-4 h-4" />
              Quem Somos • {SITE_CONFIG.name}
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              Compromisso real com sua segurança e tranquilidade
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              A <strong>{SITE_CONFIG.name}</strong> atua com{" "}
              <strong>
                segurança eletrônica, instalação de câmeras de monitoramento
                (CFTV), fechaduras eletrônicas, instalações e manutenção
                elétrica, além de montagem, formatação e manutenção de
                computadores e notebooks
              </strong>
              , entregando soluções organizadas, confiáveis e sob medida.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-20">
        {/* Proposta de Trabalho */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Nossa Proposta de Trabalho
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
              Tecnologia de Monitoramento e Engenharia Elétrica com Organização
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Sabemos que confiar a segurança e a infraestrutura elétrica de uma
              residência, empresa ou condomínio exige seriedade e transparência.
              Por isso, nossa atuação é pautada no planejamento cuidadoso de
              cada ponto instalado e na entrega de um serviço limpo, seguro e
              duradouro.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Na área de <strong>Segurança Eletrônica</strong>, trabalhamos para
              eliminar pontos cegos e proporcionar acesso simples e imediato às
              câmeras pelo celular — seja para proteger um comércio, controlar
              um galpão de estoque, monitorar áreas comuns de condomínios ou
              permitir que famílias acompanhem e protejam idosos em casa com
              carinho e tranquilidade.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Na área de <strong>Instalações e Manutenção Elétrica</strong>,
              priorizamos a segurança contra sobrecargas e curtos-circuitos:
              organizamos quadros elétricos, identificamos circuitos, passamos
              cabeamento estruturado e realizamos diagnósticos precisos com
              instrumentos adequados. E na área de{" "}
              <strong>Informática e Computadores</strong>, realizamos montagem,
              formatação com backup, upgrades de SSD/memória RAM e manutenção
              completa de computadores e notebooks, além de coleta de descarte
              eletrônico.
            </p>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-md">
              <img
                src="/images/service-eletrica.jpg"
                alt="Organização técnica de quadro elétrico pela Alltech Soluções"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-5 rounded-2xl bg-navy-900 text-white space-y-2">
              <div className="flex items-center gap-2 text-brand-300 font-bold text-sm">
                <Lock className="w-4 h-4 text-accent-400" />
                <span>Soluções Integradas</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Segurança eletrônica (CFTV e fechaduras digitais), serviços
                elétricos e assistência técnica especializada em computadores e
                notebooks em um só lugar.
              </p>
            </div>
          </div>
        </section>

        {/* Pilares de Qualidade */}
        <section className="space-y-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Nossos Pilares
            </span>
            <h2 className="text-3xl font-display font-extrabold text-navy-900 mt-1">
              Como Garantimos a Qualidade em Cada Serviço
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                <Camera className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-900">
                Planejamento Visual e Posicionamento
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Antes de fixar qualquer câmera, avaliamos a iluminação, os
                acessos e as áreas críticas do imóvel para garantir cobertura
                efetiva tanto durante o dia quanto à noite.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Acesso remoto configurado no celular do cliente
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Orientação prática de uso do aplicativo
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-navy-900 text-accent-400 flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-900">
                Rigor e Segurança nas Instalações Elétricas
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Executamos montagem de quadros elétricos, passagem de cabos e
                instalação de tomadas e disjuntores priorizando conexões firmes,
                isolamento correto e organização limpa.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Organização e identificação dos circuitos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Prevenção de aquecimentos e sobrecargas
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-2xl p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-display font-bold text-navy-900">
                Diagnóstico Transparente e Manutenção
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utilizamos instrumentos de medição para localizar falhas
                elétricas ou problemas em sistemas de câmeras, explicando ao
                cliente exatamente o que precisa ser reparado ou substituído.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Manutenção preventiva e corretiva
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  Atendimento cordial, pontual e organizado
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Atendimento a diferentes perfis de clientes */}
        <section className="bg-navy-900 text-white rounded-3xl p-8 sm:p-12 border border-brand-500/30">
          <div className="max-w-3xl mb-10 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Atendimento Personalizado
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
              Para Quem Desenvolvemos Nossas Soluções
            </h2>
            <p className="text-slate-300 text-sm sm:text-base">
              Adaptamos nossos projetos para atender com excelência diferentes
              necessidades residenciais e corporativas:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_AUDIENCES.map((aud) => (
              <div
                key={aud.id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2"
              >
                <h3 className="font-display font-bold text-white text-base flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-accent-400 shrink-0" />
                  {aud.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <HeartHandshake className="w-8 h-8 text-accent-400 shrink-0" />
              <p className="text-sm text-slate-200">
                Quer conversar sobre um projeto de segurança ou instalação
                elétrica para seu imóvel?
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-accent-500 hover:bg-accent-400 text-navy-950 transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                Solicitar Orçamento
              </a>
              <Link
                href="/servicos"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-sm bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
              >
                Ver Serviços
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
