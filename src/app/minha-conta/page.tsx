"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Phone,
  Lock,
  Save,
  Star,
  Edit3,
  Trash2,
  LogOut,
  CheckCircle2,
  AlertCircle,
  MessageSquarePlus,
  ShieldAlert,
  X,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import type { ReviewRecord, ServiceCategory } from "@/lib/db";

const CATEGORIES: ServiceCategory[] = [
  "Segurança Eletrônica",
  "Instalações Elétricas",
  "Manutenção Elétrica",
  "Informática e Computadores",
];

export default function MinhaContaPage() {
  const router = useRouter();
  const { user, ownReviews, loading, refreshAuth, logout } = useAuth();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [profileFeedback, setProfileFeedback] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Estado de edição de avaliação na área do cliente
  const [editingReview, setEditingReview] = useState<ReviewRecord | null>(null);
  const [editRating, setEditRating] = useState<number>(5);
  const [editCategory, setEditCategory] = useState<ServiceCategory>(
    "Segurança Eletrônica"
  );
  const [editComment, setEditComment] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login?redirect=/minha-conta");
    } else if (user) {
      setName(user.name);
      setPhone(user.phone || "");
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center text-slate-600">
        Carregando informações da sua conta...
      </div>
    );
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setProfileFeedback(null);

    try {
      const res = await fetch("/api/auth/me", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setProfileFeedback({
          type: "error",
          text: json.error || "Não foi possível atualizar seu perfil.",
        });
      } else {
        setCurrentPassword("");
        setNewPassword("");
        await refreshAuth();
        setProfileFeedback({
          type: "success",
          text: "Suas informações de perfil foram atualizadas com sucesso!",
        });
      }
    } catch {
      setProfileFeedback({
        type: "error",
        text: "Erro de conexão ao salvar perfil.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingReview) return;

    const res = await fetch(`/api/reviews/${editingReview.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rating: editRating,
        service_category: editCategory,
        comment: editComment,
      }),
    });
    if (res.ok) {
      setEditingReview(null);
      await refreshAuth();
    } else {
      const json = await res.json();
      alert(json.error || "Erro ao editar avaliação.");
    }
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm("Deseja realmente excluir esta avaliação?")) return;
    const res = await fetch(`/api/reviews/${id}`, { method: "DELETE" });
    if (res.ok) {
      await refreshAuth();
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <div className="bg-slate-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Cabeçalho da Conta */}
        <div className="bg-navy-900 text-white rounded-3xl p-7 sm:p-10 border border-brand-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
              Área do Cliente • Alltech Soluções
            </span>
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold">
              Olá, {user.name}
            </h1>
            <p className="text-sm text-slate-300">
              E-mail: {user.email} • Perfil:{" "}
              {user.role === "admin" ? "Administrador" : "Cliente"}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            {user.role === "admin" && (
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-amber-500 text-navy-950"
              >
                <ShieldAlert className="w-4 h-4" />
                Ir para o Painel Administrativo
              </Link>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-red-500/20 text-white border border-white/15 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Encerrar Sessão
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna 1: Editar Perfil */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm space-y-6">
              <div>
                <h2 className="text-xl font-display font-bold text-navy-900">
                  Editar Informações do Perfil
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Atualize seu nome público, telefone ou senha de acesso.
                </p>
              </div>

              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div>
                  <label
                    htmlFor="profName"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Nome Público
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="profName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="profPhone"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Telefone / WhatsApp (Privado)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="profPhone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900"
                    />
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 space-y-3">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Alterar Senha (Opcional)
                  </span>

                  <div>
                    <label
                      htmlFor="profCurrPass"
                      className="block text-xs font-medium text-slate-600 mb-1"
                    >
                      Senha Atual
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="profCurrPass"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Preencha apenas se for mudar a senha"
                        className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="profNewPass"
                      className="block text-xs font-medium text-slate-600 mb-1"
                    >
                      Nova Senha
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        id="profNewPass"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Mínimo de 6 caracteres"
                        className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {profileFeedback && (
                  <div
                    className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2 ${
                      profileFeedback.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {profileFeedback.type === "success" ? (
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    )}
                    <span>{profileFeedback.text}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={saving}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  {saving ? "Salvando..." : "Salvar Alterações"}
                </button>
              </form>
            </div>
          </div>

          {/* Coluna 2: Histórico de Comentários / Avaliações do Próprio Cliente */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm">
              <div>
                <h2 className="text-xl font-display font-bold text-navy-900">
                  Minhas Avaliações Publicadas ({ownReviews.length})
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Consulte, edite ou exclua suas avaliações anteriores.
                </p>
              </div>
              <Link
                href="/avaliacoes#publicar"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-navy-900 hover:bg-brand-600 text-white transition-all shrink-0"
              >
                <MessageSquarePlus className="w-4 h-4" />
                Nova Avaliação
              </Link>
            </div>

            {ownReviews.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 space-y-3">
                <p className="font-display font-bold text-navy-900">
                  Você ainda não publicou nenhuma avaliação.
                </p>
                <p className="text-xs sm:text-sm text-slate-500">
                  Já contratou um serviço de câmeras ou instalações elétricas da
                  Alltech Soluções? Conte sua experiência!
                </p>
                <div className="pt-2">
                  <Link
                    href="/avaliacoes#publicar"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-600 text-white"
                  >
                    Publicar Minha Primeira Avaliação
                  </Link>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {ownReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
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
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700">
                          {rev.service_category}
                        </span>
                      </div>

                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          rev.status === "approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : rev.status === "rejected"
                            ? "bg-red-50 text-red-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {rev.status === "approved"
                          ? "Publicada"
                          : rev.status === "rejected"
                          ? "Rejeitada pela moderação"
                          : "Em análise"}
                      </span>
                    </div>

                    <p className="text-sm text-slate-700 leading-relaxed">
                      {rev.comment}
                    </p>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <span>
                        Data:{" "}
                        {new Date(rev.created_at).toLocaleDateString("pt-BR")}
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingReview(rev);
                            setEditRating(rev.rating);
                            setEditCategory(rev.service_category);
                            setEditComment(rev.comment);
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-brand-600 hover:text-brand-800"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteReview(rev.id)}
                          className="inline-flex items-center gap-1 font-semibold text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal de Edição */}
      {editingReview && (
        <div
          className="fixed inset-0 z-50 bg-navy-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setEditingReview(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-display font-bold text-navy-900">
                Editar Meu Comentário
              </h3>
              <button
                type="button"
                onClick={() => setEditingReview(null)}
                className="p-1 text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleUpdateReview} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Estrelas
                </label>
                <div className="flex gap-1.5">
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
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Categoria
                </label>
                <select
                  value={editCategory}
                  onChange={(e) =>
                    setEditCategory(e.target.value as ServiceCategory)
                  }
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">
                  Comentário
                </label>
                <textarea
                  rows={4}
                  required
                  minLength={10}
                  value={editComment}
                  onChange={(e) => setEditComment(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingReview(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-brand-600 text-white"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
