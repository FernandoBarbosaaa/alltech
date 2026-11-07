import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Camera,
  Zap,
  Wrench,
  CheckCircle2,
  PhoneCall,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import {
  ALL_SERVICES,
  FEATURED_PACKAGES,
  getWhatsAppUrl,
  SITE_CONFIG,
  ServiceItem,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Serviços de Segurança Eletrônica, CFTV e Instalações Elétricas",
  description:
    "Conheça todos os serviços da Alltech Soluções: instalação de câmeras de segurança, sistemas de CFTV, monitoramento de estoques, condomínios e idosos, instalações elétricas e manutenção elétrica.",
};

function ServiceCategoryBlock({
  id,
  badge,
  title,
  subtitle,
  icon,
  services,
}: {
  id: string;
  badge: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  services: ServiceItem[];
}) {
  return (
    <section id={id} className="scroll-mt-28 space-y-8">
      <div className="bg-navy-900 text-white rounded-3xl p-8 sm:p-10 border border-brand-500/30 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
            {icon}
            <span>{badge}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
            {title}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {subtitle}
          </p>
        </div>
        <div className="shrink-0">
          <a
            href={getWhatsAppUrl(
              `Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço da categoria: ${title}.`
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl font-bold text-sm bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-md transition-all"
          >
            <PhoneCall className="w-4 h-4" />
            Orçamento de {badge}
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {services.map((service) => (
          <article
            key={service.id}
            id={service.slug}
            className="scroll-mt-32 bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Imagem Ilustrativa do Serviço */}
              <div className="relative h-56 w-full bg-navy-950 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/25 to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 rounded-md text-xs font-bold bg-navy-950/85 text-brand-300 border border-brand-400/30 backdrop-blur-sm">
                    {service.category}
                  </span>
                  {service.highlightBadge && (
                    <span className="px-3 py-1 rounded-md text-xs font-bold bg-accent-500 text-navy-950">
                      {service.highlightBadge}
                    </span>
                  )}
                </div>

                <div className="absolute bottom-3 left-4 right-4">
                  <h3 className="text-xl font-display font-extrabold text-white drop-shadow">
                    {service.title}
                  </h3>
                </div>
              </div>

              {/* Descrição Detalhada e Benefícios */}
              <div className="p-6 sm:p-7 space-y-5">
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  {service.detailedDescription}
                </p>

                <div className="space-y-2.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-navy-900">
                    Principais Benefícios:
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-start gap-2.5 text-sm text-slate-600"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {service.audiences.map((aud) => (
                    <span
                      key={aud}
                      className="text-xs font-medium bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md"
                    >
                      {aud}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão para Solicitar Orçamento pelo WhatsApp */}
            <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <a
                href={getWhatsAppUrl(
                  `Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço: ${service.title}.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                Solicitar orçamento pelo WhatsApp
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function ServicosPage() {
  const securityServices = ALL_SERVICES.filter(
    (s) => s.category === "Segurança Eletrônica"
  );
  const electricalInstallServices = ALL_SERVICES.filter(
    (s) => s.category === "Instalações Elétricas"
  );
  const electricalMaintServices = ALL_SERVICES.filter(
    (s) => s.category === "Manutenção Elétrica"
  );

  return (
    <div className="bg-slate-50 pb-24">
      {/* Cabeçalho da Página */}
      <section className="bg-navy-950 text-white py-16 sm:py-20 border-b border-brand-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-35" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <ShieldCheck className="w-4 h-4" />
              Catálogo Completo • {SITE_CONFIG.name}
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              Soluções em Segurança Eletrônica e Serviços Elétricos
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Confira em detalhes todas as nossas soluções para residências,
              empresas, estoques, condomínios e famílias que buscam proteção e
              instalações elétricas confiáveis.
            </p>

            {/* Atalhos Rápidos para as 3 Categorias */}
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="#seguranca-eletronica"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white transition-all"
              >
                <Camera className="w-4 h-4" />
                Segurança Eletrônica (8)
              </a>
              <a
                href="#instalacoes-eletricas"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
              >
                <Zap className="w-4 h-4 text-accent-400" />
                Instalações Elétricas (7)
              </a>
              <a
                href="#manutencao-eletrica"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-all"
              >
                <Wrench className="w-4 h-4 text-emerald-400" />
                Manutenção Elétrica (6)
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-24">
        {/* Seção 1: Segurança Eletrônica */}
        <ServiceCategoryBlock
          id="seguranca-eletronica"
          badge="Segurança Eletrônica"
          title="Segurança Eletrônica e Monitoramento por Câmeras (CFTV)"
          subtitle="Projetos personalizados de câmeras de segurança para residências, comércios, estoques, condomínios e acompanhamento de idosos, com visualização em tempo real pelo celular."
          icon={<Camera className="w-4 h-4" />}
          services={securityServices}
        />

        {/* Seção 2: Instalações Elétricas */}
        <ServiceCategoryBlock
          id="instalacoes-eletricas"
          badge="Instalações Elétricas"
          title="Instalações Elétricas Residenciais, Comerciais e Empresariais"
          subtitle="Montagem e organização de quadros elétricos, passagem de cabeamento, instalação de tomadas e interruptores e adequação completa de redes elétricas."
          icon={<Zap className="w-4 h-4 text-accent-400" />}
          services={electricalInstallServices}
        />

        {/* Seção 3: Manutenção Elétrica */}
        <ServiceCategoryBlock
          id="manutencao-eletrica"
          badge="Manutenção Elétrica"
          title="Manutenção Elétrica Preventiva, Corretiva e Diagnóstico"
          subtitle="Identificação rápida de falhas elétricas, diagnóstico instrumental de sobrecargas e curtos, substituição de componentes e revisão completa de instalações."
          icon={<Wrench className="w-4 h-4 text-emerald-400" />}
          services={electricalMaintServices}
        />

        {/* Pacotes Especiais das Referências Alltech */}
        <section className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Condições Especiais Alltech Soluções
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900 mt-1">
              Planos de Locação e Kits de Segurança
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1">
              Além de projetos sob medida, trabalhamos com pacotes práticos de
              aluguel de câmeras de segurança e kits prontos para instalação.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FEATURED_PACKAGES.map((pkg) => (
              <div
                key={pkg.id}
                className="rounded-2xl p-6 bg-slate-50 border border-slate-200 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-brand-100 text-brand-700">
                    {pkg.badge}
                  </span>
                  <h3 className="text-xl font-display font-bold text-navy-900">
                    {pkg.title}
                  </h3>
                  <p className="text-2xl font-display font-extrabold text-brand-600">
                    {pkg.price}{" "}
                    <span className="text-xs font-normal text-slate-500">
                      {pkg.priceSuffix}
                    </span>
                  </p>
                  <p className="text-xs text-slate-600">{pkg.subtitle}</p>
                </div>
                <div className="pt-5 mt-5 border-t border-slate-200">
                  <a
                    href={getWhatsAppUrl(pkg.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-bold bg-navy-900 hover:bg-brand-600 text-white transition-colors"
                  >
                    Solicitar Orçamento no WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Final */}
        <div className="text-center space-y-4">
          <h3 className="text-2xl font-display font-bold text-navy-900">
            Tem alguma dúvida sobre qual serviço é ideal para seu imóvel?
          </h3>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Nossa equipe avalia sua necessidade e orienta a solução mais segura
            e econômica.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-md transition-all"
            >
              <PhoneCall className="w-5 h-5" />
              Conversar pelo WhatsApp
            </a>
            <Link
              href="/contato"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-xl font-bold bg-navy-900 hover:bg-navy-800 text-white transition-all"
            >
              Enviar Mensagem pelo Site
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
