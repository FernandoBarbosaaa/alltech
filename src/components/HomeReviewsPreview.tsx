"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Star, MessageSquarePlus, ArrowRight, Info } from "lucide-react";
import type { ReviewRecord } from "@/lib/db";

export function HomeReviewsPreview() {
  const [reviews, setReviews] = useState<ReviewRecord[]>([]);
  const [averageRating, setAverageRating] = useState<number>(5.0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/reviews")
      .then((res) => res.json())
      .then((data) => {
        if (data.reviews) {
          setReviews(data.reviews.slice(0, 3));
          setAverageRating(data.stats?.averageRating ?? 5.0);
          setTotalCount(data.stats?.totalCount ?? data.reviews.length);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-100 text-brand-700 mb-3">
              Transparência e Qualidade
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-navy-900">
              Avaliações e Experiências de Clientes
            </h2>
            <p className="text-slate-600 mt-2 max-w-2xl">
              Confira as avaliações publicadas em nossa plataforma ou acesse sua
              conta para registrar sua avaliação sobre nossos serviços.
            </p>
          </div>

          {/* Resumo da Média */}
          <div className="flex items-center gap-4 bg-white px-5 py-4 rounded-2xl shadow-sm border border-slate-200">
            <div className="text-center pr-4 border-r border-slate-200">
              <span className="block text-3xl font-display font-extrabold text-navy-900">
                {averageRating.toFixed(1)}
              </span>
              <span className="text-xs text-slate-500">de 5.0 estrelas</span>
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i <= Math.round(averageRating)
                        ? "fill-amber-400 text-amber-400"
                        : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-xs font-medium text-slate-600 mt-1">
                Baseado em {totalCount} avaliações publicadas
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-56 rounded-2xl bg-slate-200/70 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <article
                key={rev.id}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/90 flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= rev.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 border border-brand-200">
                      {rev.service_category}
                    </span>
                  </div>

                  {rev.is_demo && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold">
                      <Info className="w-3.5 h-3.5 shrink-0" />
                      Exemplo de Demonstração do Sistema
                    </div>
                  )}

                  <p className="text-slate-700 text-sm leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-bold text-navy-900">
                    {rev.public_name}
                  </span>
                  <time dateTime={rev.created_at}>
                    {new Date(rev.created_at).toLocaleDateString("pt-BR")}
                  </time>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/avaliacoes"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-sm transition-all"
          >
            Ver Todas as Avaliações
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/avaliacoes#publicar"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
          >
            <MessageSquarePlus className="w-4 h-4" />
            Deixar Minha Avaliação
          </Link>
        </div>
      </div>
    </section>
  );
}
