"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  Star,
  Flag,
  Edit3,
  Trash2,
  Send,
  CheckCircle2,
  AlertCircle,
  LogIn,
  Info,
  X,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { ReviewRecord, ServiceCategory } from "@/lib/db";

interface ReviewsApiResponse {
  reviews: ReviewRecord[];
  stats: {
    averageRating: number;
    totalCount: number;
    realCount: number;
    demoCount: number;
    distribution: Record<1 | 2 | 3 | 4 | 5, number>;
  };
}

const SERVICE_CATEGORIES: ServiceCategory[] = [
  "Segurança Eletrônica",
  "Instalações Elétricas",
  "Manutenção Elétrica",
  "Informática e Computadores",
];

const REPORT_REASONS = [
  "Conteúdo ofensivo ou linguagem imprópria",
  "Spam ou propaganda indevida",
  "Informação falsa ou fora do tema da empresa",
  "Exposição de dados pessoais de terceiros",
  "Outro motivo",
];

export default function AvaliacoesPage() {
  const { user, refreshAuth } = useAuth();
  const [data, setData] = useState<ReviewsApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState<string>("Todas");

  // Estado do formulário de nova avaliação
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [serviceCategory, setServiceCategory] = useState<ServiceCategory>(
    "Segurança Eletrônica"
  );
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Estado de edição da própria avaliação
  const [editingReview, setEditingReview] = useState<ReviewRecord | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editCategory, setEditCategory] = useState<ServiceCategory>(
    "Segurança Eletrônica"
  );
  const [editComment, setEditComment] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Estado de denúncia de comentário inadequado
  const [reportingReview, setReportingReview] = useState<ReviewRecord | null>(
    null
  );
  const [reportReason, setReportReason] = useState<string>(REPORT_REASONS[0]);
  const [reportDetails, setReportDetails] = useState<string>("");
  const [reportLoading, setReportLoading] = useState(false);
  const [reportSuccess, setReportSuccess] = useState<string | null>(null);

  const loadReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/reviews", { cache: "no-store" });
      if (res.ok) {
        const json = (await res.json()) as ReviewsApiResponse;
        setData(json);
      }
    } catch {
      // Silencioso
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadReviews();
  }, [loadReviews]);

  const handlePublishReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating,
          service_category: serviceCategory,
          comment,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setFeedback({
          type: "error",
          text: json.error || "Não foi possível publicar sua avaliação.",
        });
      } else {
        setComment("");
        setRating(5);
        setFeedback({
          type: "success",
          text: "Sua avaliação foi publicada com sucesso! Obrigado por compartilhar sua experiência.",
        });
        await loadReviews();
        await refreshAuth();
      }
    } catch {
      setFeedback({
        type: "error",
        text: "Erro de conexão ao enviar avaliação.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const openEditModal = (rev: ReviewRecord) => {
    setEditingReview(rev);
    setEditRating(rev.rating);
    setEditCategory(rev.service_category);
    setEditComment(rev.comment);
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;
    setEditLoading(true);

    try {
      const res = await fetch(`/api/reviews/${editingReview.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rating: editRating,
          service_category: editCategory,
          comment: editComment,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Erro ao atualizar avaliação.");
      } else {
        setEditingReview(null);
        await loadReviews();
        await refreshAuth();
      }
    } finally {
      setEditLoading(false);
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta avaliação?")) return;

    const res = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await loadReviews();
      await refreshAuth();
    } else {
      const json = await res.json();
      alert(json.error || "Não foi possível excluir a avaliação.");
    }
  };

  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportingReview) return;
    setReportLoading(true);

    try {
      const res = await fetch(`/api/reviews/${reportingReview.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reason: reportReason,
          details: reportDetails,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json.error || "Erro ao registrar denúncia.");
      } else {
        setReportSuccess(
          "Denúncia registrada e encaminhada para análise da administração."
        );
        setReportDetails("");
        await loadReviews();
        setTimeout(() => {
          setReportingReview(null);
          setReportSuccess(null);
        }, 1800);
      }
    } finally {
      setReportLoading(false);
    }
  };

  const reviewsList = data?.reviews || [];
  const filteredReviews =
    filterCategory === "Todas"
      ? reviewsList
      : reviewsList.filter((r) => r.service_category === filterCategory);

  const avg = data?.stats.averageRating ?? 5.0;
  const total = data?.stats.totalCount ?? 0;

  return (
    <div className="bg-slate-50 pb-24">
      {/* Cabeçalho */}
      <section className="bg-navy-950 text-white py-16 border-b border-brand-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-35" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <ShieldCheck className="w-4 h-4" />
              Opinião dos Clientes • Alltech Soluções
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              Avaliações de Clientes
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Espaço dedicado para nossos clientes compartilharem suas
              experiências com nossos serviços de segurança eletrônica, CFTV e
              instalações elétricas.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Painel de Média Geral e Distribuição */}
        <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:border-r border-slate-200 lg:pr-8 space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600">
              Média Geral das Avaliações
            </span>
            <div className="text-5xl sm:text-6xl font-display font-extrabold text-navy-900">
              {avg.toFixed(1)}
            </div>
            <div className="flex items-center justify-center gap-1 py-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-6 h-6 ${
                    s <= Math.round(avg)
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-slate-600 font-medium">
              Baseado em <strong>{total}</strong> avaliações publicadas
            </p>
          </div>

          {/* Barras de 5 a 1 estrelas */}
          <div className="lg:col-span-5 space-y-2.5">
            {([5, 4, 3, 2, 1] as const).map((starLevel) => {
              const count = data?.stats.distribution?.[starLevel] ?? 0;
              const pct = total > 0 ? Math.round((count / total) * 100) : 0;
              return (
                <div
                  key={starLevel}
                  className="flex items-center gap-3 text-xs sm:text-sm"
                >
                  <span className="w-20 font-semibold text-slate-700 flex items-center gap-1">
                    {starLevel}{" "}
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </span>
                  <div className="flex-1 h-2.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-amber-400 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-12 text-right text-slate-500 font-medium">
                    {count} ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-3 flex flex-col justify-center gap-3">
            <a
              href="#publicar"
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              Avaliar nossos serviços
            </a>
            {user && (
              <Link
                href="/minha-conta"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl font-semibold text-xs bg-slate-100 hover:bg-slate-200 text-navy-900 transition-all"
              >
                Gerenciar meus comentários
              </Link>
            )}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Coluna Esquerda: Lista de Avaliações Publicadas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-2xl font-display font-extrabold text-navy-900">
                Comentários Publicados ({filteredReviews.length})
              </h2>

              <div className="flex flex-wrap gap-1.5">
                {["Todas", ...SERVICE_CATEGORIES].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilterCategory(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      filterCategory === cat
                        ? "bg-navy-900 text-white"
                        : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-44 rounded-2xl bg-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : filteredReviews.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 space-y-2">
                <p className="font-display font-bold text-navy-900 text-lg">
                  Nenhuma avaliação encontrada nesta categoria.
                </p>
                <p className="text-sm text-slate-500">
                  Seja o primeiro a publicar uma avaliação!
                </p>
              </div>
            ) : (
              <div className="space-y-5">
                {filteredReviews.map((rev) => {
                  const isOwner = user && user.id === rev.user_id;
                  const isAdmin = user && user.role === "admin";

                  return (
                    <article
                      key={rev.id}
                      className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-display font-bold text-navy-900 text-base">
                              {rev.public_name}
                            </h3>
                            {isOwner && (
                              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-brand-100 text-brand-700">
                                Sua Avaliação
                              </span>
                            )}
                            {rev.is_demo && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                                <Info className="w-3 h-3" />
                                Exemplo de Demonstração
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1 text-xs text-slate-500">
                            <time dateTime={rev.created_at}>
                              Publicado em{" "}
                              {new Date(rev.created_at).toLocaleDateString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "long",
                                  year: "numeric",
                                }
                              )}
                            </time>
                            <span>•</span>
                            <span className="font-semibold text-brand-700">
                              {rev.service_category}
                            </span>
                          </div>
                        </div>

                        {/* Estrelas da Avaliação */}
                        <div
                          className="flex items-center gap-1 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/70"
                          aria-label={`Nota ${rev.rating} de 5 estrelas`}
                        >
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= rev.rating
                                  ? "fill-amber-400 text-amber-400"
                                  : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      <p className="text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                        {rev.comment}
                      </p>

                      {/* Ações: Editar / Excluir (próprio autor) ou Denunciar comentário inadequado */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs">
                        <div className="flex items-center gap-3">
                          {(isOwner || isAdmin) && (
                            <>
                              <button
                                type="button"
                                onClick={() => openEditModal(rev)}
                                className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800"
                              >
                                <Edit3 className="w-3.5 h-3.5" />
                                Editar avaliação
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteReview(rev.id)}
                                className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-800"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Excluir
                              </button>
                            </>
                          )}
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setReportingReview(rev);
                            setReportReason(REPORT_REASONS[0]);
                            setReportDetails("");
                            setReportSuccess(null);
                          }}
                          className="inline-flex items-center gap-1 text-slate-400 hover:text-red-600 transition-colors"
                          title="Denunciar comentário inadequado"
                        >
                          <Flag className="w-3.5 h-3.5" />
                          Denunciar comentário
                        </button>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          {/* Coluna Direita: Formulário para Publicar Avaliação */}
          <div id="publicar" className="lg:col-span-5 scroll-mt-28">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md sticky top-28">
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-navy-900">
                Publicar uma Avaliação
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Compartilhe sua experiência com a Alltech Soluções.
              </p>

              {!user ? (
                <div className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mx-auto">
                    <LogIn className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-display font-bold text-navy-900 text-base">
                      Faça login para avaliar
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Para garantir a autenticidade das avaliações e permitir
                      que você edite ou consulte seus comentários depois, entre
                      na sua conta ou cadastre-se gratuitamente.
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                    <Link
                      href="/login?redirect=/avaliacoes"
                      className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-navy-900 hover:bg-navy-800 text-white transition-all"
                    >
                      Entrar na Conta
                    </Link>
                    <Link
                      href="/cadastro?redirect=/avaliacoes"
                      className="flex-1 py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-brand-600 hover:bg-brand-500 text-white transition-all"
                    >
                      Criar Conta Rápida
                    </Link>
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handlePublishReview}
                  className="mt-6 space-y-5"
                >
                  <div className="p-3.5 rounded-xl bg-brand-50/70 border border-brand-200 text-xs text-navy-900 flex items-center justify-between">
                    <span>
                      Publicando como: <strong>{user.name}</strong>
                    </span>
                    <Link
                      href="/minha-conta"
                      className="text-brand-600 font-semibold hover:underline"
                    >
                      Editar nome
                    </Link>
                  </div>

                  {/* Seletor de 1 a 5 estrelas */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Sua Nota (1 a 5 Estrelas) *
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverRating || rating) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            onClick={() => setRating(star)}
                            aria-label={`Avaliar com ${star} estrelas`}
                            className="p-1.5 rounded-lg hover:bg-amber-50 transition-colors focus:outline-none"
                          >
                            <Star
                              className={`w-8 h-8 transition-transform ${
                                active
                                  ? "fill-amber-400 text-amber-400 scale-110"
                                  : "text-slate-300"
                              }`}
                            />
                          </button>
                        );
                      })}
                      <span className="ml-2 text-sm font-bold text-navy-900">
                        {rating} de 5 estrelas
                      </span>
                    </div>
                  </div>

                  {/* Categoria do serviço */}
                  <div>
                    <label
                      htmlFor="serviceCategory"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Categoria do Serviço Realizado *
                    </label>
                    <select
                      id="serviceCategory"
                      value={serviceCategory}
                      onChange={(e) =>
                        setServiceCategory(e.target.value as ServiceCategory)
                      }
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      {SERVICE_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Comentário escrito */}
                  <div>
                    <label
                      htmlFor="reviewComment"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Seu Comentário *
                    </label>
                    <textarea
                      id="reviewComment"
                      rows={4}
                      required
                      minLength={10}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Conte como foi o atendimento, a instalação das câmeras ou o serviço elétrico realizado..."
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  {feedback && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2 ${
                        feedback.type === "success"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {feedback.type === "success" ? (
                        <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                      ) : (
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      )}
                      <span>{feedback.text}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    {submitting ? "Publicando..." : "Publicar Avaliação"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal para Editar a Própria Avaliação */}
      {editingReview && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-display font-bold text-navy-900">
                Editar Minha Avaliação
              </h3>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Nota (1 a 5 estrelas)
                </label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setEditRating(s)}
                      className="p-1"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          s <= editRating
                            ? "fill-amber-400 text-amber-400"
                            : "text-slate-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Categoria do Serviço
                </label>
                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(e.target.value as ServiceCategory)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                >
                  {SERVICE_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Comentário
                </label>
                <textarea
                  rows={4}
                  required
                  minLength={10}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-100 text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={editLoading}
                  className="px-5 py-2.5 rounded-xl text-sm font-bold bg-brand-600 hover:bg-brand-500 text-white"
                >
                  {editLoading ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para Denunciar Comentário Inadequado */}
      {reportingReview && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setReportingReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-7 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-navy-900 flex items-center gap-2">
                <Flag className="w-5 h-5 text-red-600" />
                Denunciar Comentário Inadequado
              </h3>
              <button
                type="button"
                onClick={() => setReportingReview(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Você está sinalizando o comentário de{" "}
              <strong>{reportingReview.public_name}</strong> para revisão da
              administração.
            </p>

            {reportSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-medium flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{reportSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Motivo da Denúncia *
                  </label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-sm"
                  >
                    {REPORT_REASONS.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                    Observações adicionais (opcional)
                  </label>
                  <textarea
                    rows={3}
                    value={reportDetails}
                    onChange={(e) => setReportDetails(e.target.value)}
                    placeholder="Descreva por que este comentário viola as diretrizes..."
                    className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                  />
                </div>

                <div className="flex justify-end gap-2.5 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportingReview(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={reportLoading}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white"
                  >
                    {reportLoading ? "Enviando..." : "Enviar Denúncia"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
