import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Camera,
  Zap,
  Wrench,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Home,
  Building2,
  Warehouse,
  Building,
  HeartHandshake,
  PhoneCall,
  Lock,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import {
  ALL_SERVICES,
  FEATURED_PACKAGES,
  getWhatsAppUrl,
  SITE_CONFIG,
  TARGET_AUDIENCES,
} from "@/config/site";
import { GallerySection } from "@/components/GallerySection";
import { HomeReviewsPreview } from "@/components/HomeReviewsPreview";

export default function HomePage() {
  const securityServices = ALL_SERVICES.filter(
    (s) => s.category === "Segurança Eletrônica"
  );
  const electricalInstallServices = ALL_SERVICES.filter(
    (s) => s.category === "Instalações Elétricas"
  );
  const electricalMaintServices = ALL_SERVICES.filter(
    (s) => s.category === "Manutenção Elétrica"
  );

  const audienceIcons: Record<string, React.ReactNode> = {
    Home: <Home className="w-6 h-6 text-brand-400" />,
    Building2: <Building2 className="w-6 h-6 text-brand-400" />,
    Warehouse: <Warehouse className="w-6 h-6 text-brand-400" />,
    Building: <Building className="w-6 h-6 text-brand-400" />,
    HeartHandshake: <HeartHandshake className="w-6 h-6 text-accent-400" />,
    Zap: <Zap className="w-6 h-6 text-accent-400" />,
  };

  return (
    <div className="flex flex-col">
      {/* =====================================================================
          1. BANNER PRINCIPAL (HERO)
          ===================================================================== */}
      <section className="relative bg-navy-950 text-white overflow-hidden">
        {/* Imagem de fundo com overlay corporativo azul-marinho */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-cameras.jpg"
            alt="Câmeras de segurança profissionais instaladas pela Alltech Soluções"
            className="w-full h-full object-cover object-center opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/65" />
          <div className="absolute inset-0 bg-circuit-pattern opacity-40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Coluna Texto Hero */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/15 border border-brand-400/30 text-brand-300 text-xs sm:text-sm font-semibold">
                <ShieldCheck className="w-4 h-4 text-brand-400 shrink-0" />
                <span>
                  Segurança Eletrônica • Câmeras CFTV • Serviços Elétricos
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight text-white leading-[1.12]">
                Sua segurança e tranquilidade em{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-400">
                  boas mãos
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-slate-200 leading-relaxed max-w-2xl">
                Soluções completas em{" "}
                <strong className="text-white">
                  instalação de câmeras de segurança, sistemas de CFTV com
                  acesso pelo celular, instalações elétricas e manutenção
                  elétrica
                </strong>{" "}
                para residências, empresas, estoques, condomínios e proteção de
                idosos em casa.
              </p>

              {/* Botões Principais Exigidos */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl text-base font-bold bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-lg hover:shadow-glow-amber transition-all duration-200"
                >
                  <PhoneCall className="w-5 h-5" />
                  Solicitar orçamento
                </a>
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-base font-bold bg-white/10 hover:bg-white/15 text-white border border-white/20 backdrop-blur-sm transition-all duration-200"
                >
                  Conheça nossos serviços
                  <ArrowRight className="w-5 h-5 text-brand-400" />
                </Link>
              </div>

              {/* Selos de Confiança Rápida */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/10">
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Smartphone className="w-5 h-5 text-brand-400 shrink-0" />
                  <span>Acesso ao vivo pelo celular</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Zap className="w-5 h-5 text-accent-400 shrink-0" />
                  <span>Elétrica organizada e segura</span>
                </div>
                <div className="flex items-center gap-2.5 text-sm text-slate-200">
                  <Lock className="w-5 h-5 text-emerald-400 shrink-0" />
                  <span>Projetos sob medida</span>
                </div>
              </div>
            </div>

            {/* Coluna Card Visual Hero */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-brand-400/30 bg-navy-900/90 shadow-2xl">
                <img
                  src="/images/hero-cameras.jpg"
                  alt="Sistema de câmeras de segurança CFTV de alta definição"
                  className="w-full h-72 sm:h-80 object-cover"
                />
                <div className="p-6 space-y-4 bg-gradient-to-b from-navy-900 to-navy-950">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      Monitoramento 24h no Smartphone
                    </span>
                    <span className="text-xs font-semibold text-brand-300 bg-brand-500/15 px-2.5 py-1 rounded-md border border-brand-500/30">
                      Full HD & Visão Noturna
                    </span>
                  </div>
                  <h2 className="text-xl font-display font-bold text-white">
                    Proteja o que realmente importa com tecnologia confiável
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Câmeras para residências, acompanhamento de idosos, lojas,
                    galpões de estoque e condomínios, além de quadros elétricos
                    impecáveis.
                  </p>
                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <span className="text-slate-300">
                      Aluguel de câmeras a partir de{" "}
                      <strong className="text-accent-400 text-sm">
                        R$ 199,99
                      </strong>
                    </span>
                    <Link
                      href="/servicos"
                      className="text-brand-400 hover:text-brand-300 font-semibold inline-flex items-center gap-1"
                    >
                      Ver pacotes <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. SOLUÇÕES EM DESTAQUE (INSPIRADAS NAS REFERÊNCIAS VISUAIS ALLTECH)
          ===================================================================== */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 mb-3">
              Destaques Alltech Soluções
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900">
              Pacotes de Segurança e Soluções Elétricas
            </h2>
            <p className="text-slate-600 mt-2">
              Opções flexíveis de locação ou aquisição de sistemas de câmeras e
              atendimento técnico especializado em instalações elétricas.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {FEATURED_PACKAGES.map((pkg, idx) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-7 flex flex-col justify-between border transition-all duration-300 ${
                  idx === 0
                    ? "bg-navy-900 text-white border-brand-500 shadow-xl ring-2 ring-brand-500/30"
                    : "bg-slate-50 text-slate-800 border-slate-200 hover:border-brand-400 hover:shadow-lg"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                        idx === 0
                          ? "bg-accent-500 text-navy-950"
                          : "bg-brand-100 text-brand-700"
                      }`}
                    >
                      {pkg.badge}
                    </span>
                  </div>

                  <h3
                    className={`text-2xl font-display font-extrabold ${
                      idx === 0 ? "text-white" : "text-navy-900"
                    }`}
                  >
                    {pkg.title}
                  </h3>

                  <div className="py-3 border-y border-current/10">
                    <span
                      className={`block text-xs uppercase font-semibold ${
                        idx === 0 ? "text-brand-300" : "text-slate-500"
                      }`}
                    >
                      {pkg.pricePrefix}
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-0.5">
                      <span
                        className={`text-3xl font-display font-extrabold ${
                          idx === 0 ? "text-accent-400" : "text-brand-600"
                        }`}
                      >
                        {pkg.price}
                      </span>
                      <span
                        className={`text-xs font-semibold ${
                          idx === 0 ? "text-slate-300" : "text-slate-500"
                        }`}
                      >
                        {pkg.priceSuffix}
                      </span>
                    </div>
                  </div>

                  <p
                    className={`text-sm ${
                      idx === 0 ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {pkg.subtitle}
                  </p>

                  <ul className="space-y-2.5 pt-2">
                    {pkg.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2.5 text-sm"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            idx === 0 ? "text-brand-400" : "text-brand-600"
                          }`}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6">
                  <a
                    href={getWhatsAppUrl(pkg.whatsappText)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm transition-all ${
                      idx === 0
                        ? "bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-md"
                        : "bg-navy-900 hover:bg-brand-600 text-white"
                    }`}
                  >
                    Solicitar Orçamento deste Pacote
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. SEÇÃO DOS PRINCIPAIS SERVIÇOS (3 CATEGORIAS ESPECÍFICAS)
          ===================================================================== */}
      <section id="servicos" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 mb-3">
              Especialidades Exclusivas
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900">
              Nossas Categorias de Serviços
            </h2>
            <p className="text-slate-600 mt-3 text-base sm:text-lg">
              Atuamos exclusivamente com{" "}
              <strong>
                Segurança Eletrônica, Instalações Elétricas e Manutenção Elétrica
              </strong>
              , entregando alto padrão técnico em cada atendimento.
            </p>
          </div>

          {/* CATEGORIA 1: SEGURANÇA ELETRÔNICA */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-brand-50 text-brand-700 text-xs font-bold uppercase tracking-wider border border-brand-200">
                  <Camera className="w-4 h-4" />
                  Categoria 01
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                  Segurança Eletrônica e Sistemas de CFTV
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Monitoramento inteligente de alta definição para residências,
                  empresas, estoques, condomínios e acompanhamento cuidadoso de
                  idosos em casa, com acesso remoto configurado diretamente no
                  seu celular.
                </p>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="/images/service-cftv.jpg"
                  alt="Monitoramento de câmeras de segurança CFTV pelo celular"
                  className="w-full h-56 object-cover rounded-2xl shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {securityServices.map((service) => (
                <div
                  key={service.id}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-brand-50/50 border border-slate-200/80 hover:border-brand-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-brand-600 text-white flex items-center justify-center mb-3">
                      <Camera className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-navy-900 text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/servicos#${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
                  >
                    Detalhes e orçamento <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORIA 2: INSTALAÇÕES ELÉTRICAS */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-50 text-amber-800 text-xs font-bold uppercase tracking-wider border border-amber-200">
                  <Zap className="w-4 h-4 text-amber-600" />
                  Categoria 02
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                  Instalações Elétricas Residenciais, Comerciais e Empresariais
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Execução técnica de instalações elétricas novas, reformas,
                  montagem e organização de quadros elétricos de distribuição,
                  instalação de tomadas, interruptores e passagem estruturada de
                  cabeamento.
                </p>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="/images/service-eletrica.jpg"
                  alt="Montagem e organização profissional de quadro elétrico DIN"
                  className="w-full h-56 object-cover rounded-2xl shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {electricalInstallServices.map((service) => (
                <div
                  key={service.id}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-navy-900 text-accent-400 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-navy-900 text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/servicos#${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-navy-900 hover:text-brand-600"
                  >
                    Detalhes e orçamento <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* CATEGORIA 3: MANUTENÇÃO ELÉTRICA */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-10">
              <div className="lg:col-span-7 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
                  <Wrench className="w-4 h-4 text-emerald-600" />
                  Categoria 03
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-navy-900">
                  Manutenção Elétrica e Diagnóstico de Falhas
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Manutenção preventiva e corretiva, identificação precisa de
                  curtos-circuitos e fugas de corrente com multímetro digital,
                  substituição de componentes desgastados e revisão completa de
                  instalações elétricas.
                </p>
              </div>
              <div className="lg:col-span-5">
                <img
                  src="/images/service-manutencao.jpg"
                  alt="Manutenção elétrica e diagnóstico técnico com multímetro digital"
                  className="w-full h-56 object-cover rounded-2xl shadow-md"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {electricalMaintServices.map((service) => (
                <div
                  key={service.id}
                  className="p-5 rounded-2xl bg-slate-50 hover:bg-emerald-50/40 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h4 className="font-display font-bold text-navy-900 text-base">
                      {service.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {service.shortDescription}
                    </p>
                  </div>
                  <Link
                    href={`/servicos#${service.slug}`}
                    className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-emerald-700 hover:text-emerald-800"
                  >
                    Detalhes e orçamento <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. QUEM ATENDEMOS (RESIDÊNCIAS, EMPRESAS, ESTOQUES, CONDOMÍNIOS, IDOSOS)
          ===================================================================== */}
      <section className="py-20 bg-navy-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-3">
              Soluções Sob Medida
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold">
              Ambientes e Clientes que Atendemos
            </h2>
            <p className="text-slate-300 mt-3">
              Projetamos cada sistema de câmeras e cada circuito elétrico de
              acordo com a rotina e a necessidade de proteção do seu espaço.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TARGET_AUDIENCES.map((aud) => (
              <div
                key={aud.id}
                className="bg-navy-900/90 border border-white/10 hover:border-brand-400/50 rounded-2xl p-6 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                  {audienceIcons[aud.icon]}
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  {aud.title}
                </h3>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  {aud.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. POR QUE CONTRATAR A ALLTECH SOLUÇÕES
          ===================================================================== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700">
                Diferenciais Técnicos
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900 leading-tight">
                Por que contratar a Alltech Soluções?
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Segurança eletrônica e instalações elétricas exigem rigor
                técnico, organização e confiança. Nosso foco é entregar sistemas
                estáveis, limpos e fáceis de operar no seu dia a dia.
              </p>

              <div className="p-5 rounded-2xl bg-navy-900 text-white space-y-3">
                <div className="flex items-center gap-2 text-accent-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>Compromisso com a Organização e Segurança</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Nada de fios expostos ou quadros elétricos confusos. Prezamos
                  pelo acabamento profissional e pelo diagnóstico preciso em
                  cada atendimento.
                </p>
              </div>

              <div>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-bold bg-accent-500 hover:bg-accent-400 text-navy-950 shadow-md transition-all"
                >
                  Falar com Especialista no WhatsApp
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-900">
                  Especialização Focada
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Dedicação exclusiva à segurança eletrônica (CFTV) e serviços
                  elétricos, garantindo conhecimento aprofundado e ferramentas
                  adequadas para cada instalação.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-navy-900 text-accent-400 flex items-center justify-center">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-900">
                  Acabamento e Cabeamento Limpo
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Quadros elétricos organizados e identificados, passagem
                  estruturada de cabos e posicionamento discreto e eficiente das
                  câmeras de segurança.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-brand-600 text-white flex items-center justify-center">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-900">
                  Monitoramento na Palma da Mão
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Deixamos o aplicativo configurado no seu smartphone Android ou
                  iPhone e orientamos você e sua família sobre como visualizar
                  câmeras ao vivo e gravações.
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-display font-bold text-navy-900">
                  Atendimento Transparente
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Explicação clara do diagnóstico elétrico ou do projeto de
                  câmeras antes da execução, com orçamentos objetivos e sem
                  surpresas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. GALERIA DE INSTALAÇÕES E PROJETOS
          ===================================================================== */}
      <GallerySection />

      {/* =====================================================================
          7. AVALIAÇÕES DE CLIENTES
          ===================================================================== */}
      <HomeReviewsPreview />

      {/* =====================================================================
          8. CHAMADA ESTRATÉGICA PARA ENTRAR EM CONTATO
          ===================================================================== */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-gradient-to-br from-navy-950 via-navy-900 to-brand-700 p-8 sm:p-12 text-white shadow-2xl border border-brand-400/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="inline-block text-xs font-bold uppercase tracking-widest text-accent-400">
                Orçamento Sem Compromisso
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
                Fale agora com a {SITE_CONFIG.name}
              </h2>
              <p className="text-slate-200 text-sm sm:text-base max-w-xl">
                Conte-nos o que você precisa proteger ou instalar. Atendemos
                residências, comércios, galpões, condomínios e famílias que
                buscam segurança e tranquilidade.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full md:w-auto">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-lg transition-all"
              >
                <PhoneCall className="w-5 h-5" />
                Chamar no WhatsApp
              </a>
              <Link
                href="/contato"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                Página de Contato
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
