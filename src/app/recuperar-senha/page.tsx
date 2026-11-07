"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { KeyRound, Mail, Lock, CheckCircle2, AlertCircle, ArrowLeft } from "lucide-react";
import { AlltechLogo } from "@/components/AlltechLogo";
import { useAuth } from "@/context/AuthContext";

export default function RecuperarSenhaPage() {
  const router = useRouter();
  const { refreshAuth } = useAuth();

  const [step, setStep] = useState<"request" | "reset">("request");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/recover", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Não foi possível gerar o código.");
      } else {
        setGeneratedCode(json.resetCode);
        setCode(json.resetCode || "");
        setStep("reset");
      }
    } catch {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/recover", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code, newPassword }),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Erro ao redefinir a senha.");
      } else {
        setSuccessMsg("Sua senha foi redefinida com sucesso! Redirecionando...");
        await refreshAuth();
        setTimeout(() => {
          router.push("/minha-conta");
          router.refresh();
        }, 1200);
      }
    } catch {
      setError("Erro de conexão.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-slate-50 flex items-center justify-center py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-lg space-y-6">
          <div className="text-center space-y-2">
            <div className="flex justify-center mb-3">
              <AlltechLogo variant="dark" size="md" />
            </div>
            <h1 className="text-2xl font-display font-extrabold text-navy-900">
              Recuperação de Senha
            </h1>
            <p className="text-xs sm:text-sm text-slate-600">
              {step === "request"
                ? "Informe o e-mail da sua conta para gerar seu código de redefinição de senha."
                : "Insira o código de verificação e escolha sua nova senha."}
            </p>
          </div>

          {step === "request" ? (
            <form onSubmit={handleRequestCode} className="space-y-4">
              <div>
                <label
                  htmlFor="recEmail"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  E-mail Cadastrado *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="recEmail"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com.br"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none"
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
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 text-white shadow-md transition-all"
              >
                <KeyRound className="w-4 h-4" />
                {loading ? "Gerando código..." : "Receber Código de Recuperação"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              {generatedCode && (
                <div className="p-3.5 rounded-xl bg-brand-50 border border-brand-200 text-xs text-navy-900">
                  Código de verificação gerado para <strong>{email}</strong>:{" "}
                  <span className="font-mono font-bold text-sm bg-white px-2 py-0.5 rounded border border-brand-300">
                    {generatedCode}
                  </span>
                </div>
              )}

              <div>
                <label
                  htmlFor="recCode"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Código de 6 Dígitos *
                </label>
                <input
                  id="recCode"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm font-mono font-bold tracking-widest text-navy-900"
                />
              </div>

              <div>
                <label
                  htmlFor="recNewPass"
                  className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                >
                  Nova Senha (mínimo 6 caracteres) *
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="recNewPass"
                    type="password"
                    required
                    minLength={6}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Digite sua nova senha"
                    className="w-full rounded-xl border border-slate-300 pl-10 pr-3.5 py-2.5 text-sm text-navy-900"
                  />
                </div>
              </div>

              {error && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              {successMsg && (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-all"
              >
                <KeyRound className="w-4 h-4" />
                {loading ? "Redefinindo..." : "Confirmar Nova Senha"}
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-navy-900"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Voltar para a tela de login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
