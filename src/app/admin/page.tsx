"use client";

import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import {
  ShieldAlert,
  Users,
  MessageSquare,
  Flag,
  Mail,
  CheckCircle2,
  XCircle,
  Trash2,
  Star,
  PhoneCall,
  RefreshCw,
  Lock,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type {
  PublicUserProfile,
  ReviewRecord,
  ReviewReportRecord,
  ContactMessageRecord,
} from "@/lib/db";

interface AdminDashboardData {
  users: (PublicUserProfile & { reviewsCount: number })[];
  reviews: ReviewRecord[];
  reports: (ReviewReportRecord & {
    review_author: string;
    review_comment: string;
  })[];
  contacts: ContactMessageRecord[];
}

export default function AdminDashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<
    "reviews" | "contacts" | "reports" | "users"
  >("reviews");

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin", { cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Acesso negado ao painel administrativo.");
      } else {
        setData(json as AdminDashboardData);
      }
    } catch {
      setError("Erro ao carregar dados do servidor.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading && user?.role === "admin") {
      loadDashboard();
    } else if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading, user, loadDashboard]);

  // Proteção estrita contra acesso de usuários comuns ou visitantes
  if (!authLoading && (!user || user.role !== "admin")) {
    return (
      <div className="min-h-[75vh] bg-slate-50 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-red-200 shadow-lg text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-red-600">
              Área Protegida (RLS Server-Side)
            </span>
            <h1 className="text-2xl font-display font-extrabold text-navy-900">
              Acesso Exclusivo do Administrador
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Esta área é restrita ao proprietário da Alltech Soluções. Contas
              de clientes comuns não possuem permissão para acessar funções
              administrativas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/login?redirect=/admin"
              className="flex-1 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-navy-900 text-white"
            >
              Entrar como Administrador
            </Link>
            <Link
              href="/"
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-slate-100 text-slate-700"
            >
              Voltar ao Início
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleModerateReview = async (
    reviewId: string,
    status: "approved" | "rejected"
  ) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "moderate_review",
        reviewId,
        status,
      }),
    });
    if (res.ok) {
      await loadDashboard();
    }
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Confirma a exclusão permanente deste comentário?")) return;
    const res = await fetch(`/api/admin?type=review&id=${reviewId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await loadDashboard();
    }
  };

  const handleResolveReport = async (
    reportId: string,
    status: "resolved" | "dismissed"
  ) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "resolve_report",
        reportId,
        status,
      }),
    });
    if (res.ok) {
      await loadDashboard();
    }
  };

  const handleUpdateContact = async (
    messageId: string,
    status: "unread" | "read" | "replied"
  ) => {
    const res = await fetch("/api/admin", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "update_contact",
        messageId,
        status,
      }),
    });
    if (res.ok) {
      await loadDashboard();
    }
  };

  const handleDeleteContact = async (messageId: string) => {
    if (!confirm("Confirma a exclusão desta mensagem de contato?")) return;
    const res = await fetch(`/api/admin?type=contact&id=${messageId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      await loadDashboard();
    }
  };

  const reviews = data?.reviews || [];
  const contacts = data?.contacts || [];
  const reports = data?.reports || [];
  const users = data?.users || [];

  const unreadContactsCount = contacts.filter(
    (c) => c.status === "unread"
  ).length;
  const openReportsCount = reports.filter((r) => r.status === "open").length;

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Cabeçalho Admin */}
        <div className="bg-navy-950 text-white rounded-3xl p-7 sm:p-9 border border-brand-500/30 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400">
              <ShieldAlert className="w-4 h-4" />
              Painel Administrativo Protegido • Alltech Soluções
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold">
              Gestão de Avaliações, Contatos e Clientes
            </h1>
            <p className="text-xs sm:text-sm text-slate-300">
              Conectado como administrador: <strong>{user?.email}</strong>
            </p>
          </div>
          <button
            type="button"
            onClick={loadDashboard}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/15 text-white border border-white/15 self-start md:self-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Atualizar Dados
          </button>
        </div>

        {error && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-medium">
            {error}
          </div>
        )}

        {/* Cards Resumo */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === "reviews"
                ? "bg-navy-900 text-white border-brand-500 shadow-lg"
                : "bg-white text-navy-900 border-slate-200 hover:border-brand-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Avaliações
              </span>
              <MessageSquare className="w-5 h-5 text-brand-400" />
            </div>
            <div className="text-3xl font-display font-extrabold mt-2">
              {reviews.length}
            </div>
            <p className="text-xs opacity-75 mt-1">
              Aprovar, rejeitar ou excluir comentários
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("contacts")}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === "contacts"
                ? "bg-navy-900 text-white border-brand-500 shadow-lg"
                : "bg-white text-navy-900 border-slate-200 hover:border-brand-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Mensagens de Contato
              </span>
              <Mail className="w-5 h-5 text-accent-400" />
            </div>
            <div className="text-3xl font-display font-extrabold mt-2">
              {contacts.length}
            </div>
            <p className="text-xs opacity-75 mt-1">
              {unreadContactsCount} não lida(s) no formulário
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === "reports"
                ? "bg-navy-900 text-white border-brand-500 shadow-lg"
                : "bg-white text-navy-900 border-slate-200 hover:border-brand-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Denúncias
              </span>
              <Flag className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-3xl font-display font-extrabold mt-2">
              {reports.length}
            </div>
            <p className="text-xs opacity-75 mt-1">
              {openReportsCount} aguardando moderação
            </p>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("users")}
            className={`p-5 rounded-2xl border text-left transition-all ${
              activeTab === "users"
                ? "bg-navy-900 text-white border-brand-500 shadow-lg"
                : "bg-white text-navy-900 border-slate-200 hover:border-brand-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-75">
                Usuários Cadastrados
              </span>
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-3xl font-display font-extrabold mt-2">
              {users.length}
            </div>
            <p className="text-xs opacity-75 mt-1">
              Clientes e administradores registrados
            </p>
          </button>
        </div>

        {/* Conteúdo da Aba Selecionada */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-500 border border-slate-200">
            Carregando registros do banco de dados...
          </div>
        ) : (
          <>
            {/* ABA 1: GERENCIAR AVALIAÇÕES */}
            {activeTab === "reviews" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy-900">
                    Moderação de Avaliações ({reviews.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Aprove, rejeite ou exclua comentários publicados pelos
                    usuários.
                  </p>
                </div>

                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-display font-bold text-navy-900 text-sm">
                            {rev.public_name}
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded bg-brand-100 text-brand-700 font-semibold">
                            {rev.service_category}
                          </span>
                          {rev.is_demo && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-semibold">
                              Registro Demo
                            </span>
                          )}
                          {rev.reported_count > 0 && (
                            <span className="text-[11px] px-2 py-0.5 rounded bg-red-100 text-red-700 font-bold">
                              {rev.reported_count} denúncia(s)
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                className={`w-3.5 h-3.5 ${
                                  s <= rev.rating
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                              rev.status === "approved"
                                ? "bg-emerald-100 text-emerald-800"
                                : rev.status === "rejected"
                                ? "bg-red-100 text-red-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {rev.status === "approved"
                              ? "Aprovada"
                              : rev.status === "rejected"
                              ? "Rejeitada"
                              : "Pendente"}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-slate-700">{rev.comment}</p>

                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-slate-500">
                          Data:{" "}
                          {new Date(rev.created_at).toLocaleString("pt-BR")}
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleModerateReview(rev.id, "approved")
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Aprovar
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleModerateReview(rev.id, "rejected")
                            }
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold bg-amber-500 hover:bg-amber-400 text-navy-950"
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Rejeitar / Ocultar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rev.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold bg-red-600 hover:bg-red-500 text-white"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            Excluir
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ABA 2: MENSAGENS DE CONTATO */}
            {activeTab === "contacts" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy-900">
                    Mensagens do Formulário de Contato ({contacts.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Solicitações de orçamento enviadas pelos clientes através do
                    site.
                  </p>
                </div>

                {contacts.length === 0 ? (
                  <p className="text-sm text-slate-500 py-8 text-center">
                    Nenhuma mensagem recebida até o momento.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {contacts.map((msg) => {
                      const cleanPhoneDigits = msg.phone.replace(/\D/g, "");
                      const waHref = cleanPhoneDigits
                        ? `https://wa.me/55${cleanPhoneDigits.replace(/^55/, "")}?text=${encodeURIComponent(
                            `Olá ${msg.name}! Recebemos sua solicitação de orçamento pelo site da Alltech Soluções sobre ${msg.service_category}. Como podemos ajudar?`
                          )}`
                        : "#";

                      return (
                        <div
                          key={msg.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <h3 className="font-display font-bold text-navy-900 text-base">
                                {msg.name}
                              </h3>
                              <p className="text-xs text-slate-600">
                                Telefone/WhatsApp:{" "}
                                <strong>{msg.phone}</strong> • E-mail:{" "}
                                {msg.email}
                              </p>
                            </div>

                            <span
                              className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                                msg.status === "unread"
                                  ? "bg-amber-100 text-amber-800"
                                  : msg.status === "replied"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {msg.status === "unread"
                                ? "Nova / Não lida"
                                : msg.status === "replied"
                                ? "Respondida"
                                : "Lida"}
                            </span>
                          </div>

                          <div className="flex flex-wrap gap-2 text-xs">
                            <span className="px-2.5 py-0.5 rounded bg-brand-100 text-brand-800 font-semibold">
                              Serviço: {msg.service_category}
                            </span>
                            <span className="px-2.5 py-0.5 rounded bg-slate-200 text-slate-700 font-medium">
                              Ambiente: {msg.property_type}
                            </span>
                          </div>

                          <p className="text-sm text-slate-800 bg-white p-3.5 rounded-xl border border-slate-200">
                            {msg.message}
                          </p>

                          <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
                            <span className="text-slate-500">
                              Recebida em:{" "}
                              {new Date(msg.created_at).toLocaleString("pt-BR")}
                            </span>

                            <div className="flex flex-wrap items-center gap-2">
                              {cleanPhoneDigits && (
                                <a
                                  href={waHref}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() =>
                                    handleUpdateContact(msg.id, "replied")
                                  }
                                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold bg-emerald-600 hover:bg-emerald-500 text-white"
                                >
                                  <PhoneCall className="w-3.5 h-3.5" />
                                  Responder no WhatsApp
                                </a>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  handleUpdateContact(msg.id, "read")
                                }
                                className="px-3 py-1.5 rounded-lg font-semibold bg-slate-200 hover:bg-slate-300 text-slate-800"
                              >
                                Marcar como Lida
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteContact(msg.id)}
                                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg font-bold bg-red-600 hover:bg-red-500 text-white"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                                Excluir
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ABA 3: DENÚNCIAS DE COMENTÁRIOS */}
            {activeTab === "reports" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy-900">
                    Denúncias de Comentários Inadequados ({reports.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Analise os comentários sinalizados pelos usuários.
                  </p>
                </div>

                {reports.length === 0 ? (
                  <p className="text-sm text-slate-500 py-8 text-center">
                    Nenhuma denúncia registrada.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {reports.map((rep) => (
                      <div
                        key={rep.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-red-700 bg-red-50 px-2.5 py-1 rounded border border-red-200">
                            Motivo: {rep.reason}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            Status: {rep.status}
                          </span>
                        </div>

                        {rep.details && (
                          <p className="text-xs text-slate-600">
                            Observações da denúncia: {rep.details}
                          </p>
                        )}

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 text-xs space-y-1">
                          <span className="font-bold text-navy-900">
                            Comentário denunciado ({rep.review_author}):
                          </span>
                          <p className="text-slate-700">{rep.review_comment}</p>
                        </div>

                        <div className="flex flex-wrap gap-2 justify-end pt-2 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              handleResolveReport(rep.id, "dismissed")
                            }
                            className="px-3 py-1.5 rounded-lg font-semibold bg-slate-200 text-slate-700"
                          >
                            Dispensar Denúncia
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleResolveReport(rep.id, "resolved")
                            }
                            className="px-3 py-1.5 rounded-lg font-bold bg-emerald-600 text-white"
                          >
                            Marcar Resolvida
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteReview(rep.review_id)}
                            className="px-3 py-1.5 rounded-lg font-bold bg-red-600 text-white"
                          >
                            Excluir Comentário Denunciado
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* ABA 4: USUÁRIOS CADASTRADOS */}
            {activeTab === "users" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-display font-bold text-navy-900">
                    Usuários Cadastrados ({users.length})
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Relação de contas registradas no sistema.
                  </p>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                        <th className="py-3 px-4">Nome</th>
                        <th className="py-3 px-4">E-mail</th>
                        <th className="py-3 px-4">Telefone</th>
                        <th className="py-3 px-4">Perfil</th>
                        <th className="py-3 px-4">Avaliações</th>
                        <th className="py-3 px-4">Cadastro</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {users.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50">
                          <td className="py-3.5 px-4 font-bold text-navy-900">
                            {u.name}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {u.email}
                          </td>
                          <td className="py-3.5 px-4 text-slate-600">
                            {u.phone || "—"}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                                u.role === "admin"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-brand-50 text-brand-700"
                              }`}
                            >
                              {u.role === "admin" ? "Administrador" : "Cliente"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-navy-900">
                            {u.reviewsCount}
                          </td>
                          <td className="py-3.5 px-4 text-xs text-slate-500">
                            {new Date(u.created_at).toLocaleDateString("pt-BR")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
