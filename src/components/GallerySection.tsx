"use client";

import React, { useState } from "react";
import { GALLERY_PROJECTS, GalleryProject, getWhatsAppUrl } from "@/config/site";
import { CheckCircle2, Eye, X, ArrowUpRight, Info } from "lucide-react";

const CATEGORIES = [
  "Todos",
  "Segurança Eletrônica",
  "Instalações Elétricas",
  "Manutenção Elétrica",
  "Informática e Computadores",
] as const;

export function GallerySection() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORIES)[number]>("Todos");
  const [activeProject, setActiveProject] = useState<GalleryProject | null>(
    null
  );

  const filtered =
    selectedCategory === "Todos"
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === selectedCategory);

  return (
    <section
      id="galeria"
      className="py-20 bg-slate-900 text-white relative overflow-hidden"
    >
      {/* Fundo tecnológico sutil */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(24,139,246,0.14),transparent_55%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-500/30 mb-3">
              Padrão Técnico Alltech Soluções
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white">
              Galeria de Instalações e Soluções
            </h2>
            <p className="text-slate-300 mt-2 max-w-2xl text-base">
              Conheça o padrão de acabamento, organização de quadros elétricos e
              sistemas de CFTV que aplicamos em residências, empresas e
              condomínios.
            </p>
          </div>

          {/* Filtros por Categoria */}
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-brand-500 text-white shadow-glow-blue"
                    : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid da Galeria */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group bg-navy-900/90 rounded-2xl overflow-hidden border border-white/10 hover:border-brand-400/50 transition-all duration-300 flex flex-col shadow-xl"
            >
              <div className="relative h-60 w-full overflow-hidden bg-navy-950">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/20 to-transparent" />

                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-navy-950/85 text-brand-300 border border-brand-400/30 backdrop-blur-sm">
                    {project.category}
                  </span>
                  {project.isIllustrativeExample && (
                    <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-slate-900/80 text-slate-300 border border-white/15 backdrop-blur-sm">
                      Imagem Ilustrativa
                    </span>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(project)}
                  aria-label={`Ampliar detalhes de ${project.title}`}
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-600/90 hover:bg-brand-500 text-white backdrop-blur-sm shadow-lg transition-all"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Ver Detalhes
                </button>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <span className="text-xs font-semibold text-accent-400 uppercase tracking-wider">
                    {project.environment}
                  </span>
                  <h3 className="text-lg font-display font-bold text-white mt-1">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex flex-wrap gap-1.5">
                  {project.specs.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1 text-xs bg-white/5 text-slate-200 px-2.5 py-1 rounded-md"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Nota de transparência */}
        <p className="mt-6 text-xs text-slate-400 flex items-center gap-1.5">
          <Info className="w-4 h-4 text-brand-400 shrink-0" />
          As imagens com selo &ldquo;Imagem Ilustrativa&rdquo; demonstram o
          padrão visual e técnico dos serviços oferecidos, acompanhadas das
          artes oficiais de referência da Alltech Soluções.
        </p>
      </div>

      {/* Modal Lightbox de Projeto */}
      {activeProject && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveProject(null)}
        >
          <div
            className="bg-navy-900 border border-brand-500/30 rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-72 sm:h-96 bg-navy-950">
              <img
                src={activeProject.image}
                alt={activeProject.title}
                className="w-full h-full object-contain bg-navy-950"
              />
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                aria-label="Fechar visualização"
                className="absolute top-4 right-4 p-2 rounded-full bg-navy-950/80 text-white hover:bg-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-400/30">
                  {activeProject.category} • {activeProject.environment}
                </span>
                {activeProject.isIllustrativeExample && (
                  <span className="text-xs text-slate-400">
                    Exemplo Ilustrativo de Aplicação
                  </span>
                )}
              </div>
              <h3 className="text-2xl font-display font-bold text-white">
                {activeProject.title}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeProject.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {activeProject.specs.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold bg-white/10 text-white px-3 py-1.5 rounded-lg"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    {s}
                  </span>
                ))}
              </div>
              <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-4 py-2.5 rounded-lg text-sm font-medium bg-white/10 text-slate-200 hover:bg-white/15"
                >
                  Fechar
                </button>
                <a
                  href={getWhatsAppUrl(
                    `Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço semelhante a: ${activeProject.title}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold bg-accent-500 hover:bg-accent-400 text-navy-950"
                >
                  Solicitar Orçamento Similar
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
