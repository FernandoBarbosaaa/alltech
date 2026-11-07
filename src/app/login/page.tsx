"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { LogIn, Lock, Mail, AlertCircle, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { AlltechLogo } from "@/components/AlltechLogo";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirect") || "/minha-conta";
  const { refreshAuth } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Falha ao entrar na conta.");
      } else {
        await refreshAuth();
        if (json.user?.role === "admin" && redirectTo === "/minha-conta") {
          router.push("/admin");
        } else {
          router.push(redirectTo);
        }
        router.refresh();
      }
    } catch {
      setError("Erro de conexão ao tentar entrar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <AlltechLogo variant="dark" size="md" />
            </div>
            <h1 className="text-2xl font-display font-extrabold text-navy-900">
              Acessar Minha Conta
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              Entre com seu e-mail e senha para publicar ou gerenciar suas
              avaliações.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="loginEmail"
                className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
              >
                E-mail *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="loginEmail"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com.br"
                  className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label
                  htmlFor="loginPassword"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  Senha *
                </label>
                <Link
                  href="/recuperar-senha"
                  className="text-xs font-semibold text-brand-600 hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="loginPassword"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-navy-900 hover:bg-brand-600 disabled:opacity-60 text-white shadow-md transition-all"
            >
              <LogIn className="w-4 h-4" />
              {loading ? "Entrando..." : "Entrar na Conta"}
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-600">
            Ainda não possui uma conta?{" "}
            <Link
              href={`/cadastro?redirect=${encodeURIComponent(redirectTo)}`}
              className="font-bold text-brand-600 hover:underline"
            >
              Criar conta gratuitamente
            </Link>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-navy-900/5 border border-slate-200 text-xs text-slate-600 flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-brand-600 shrink-0" />
          <span>
            Ambiente seguro com controle de permissões (RLS) e proteção de
            dados.
          </span>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[70vh] flex items-center justify-center">
          Carregando...
        </div>
      }
    >
      <LoginFormContent />
    </Suspense>
  );
}
