"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  PhoneCall,
  UserCheck,
  LogIn,
  ShieldAlert,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { AlltechLogo } from "./AlltechLogo";
import { getWhatsAppUrl, SITE_CONFIG } from "@/config/site";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/", label: "Início" },
  { href: "/servicos", label: "Serviços" },
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/avaliacoes", label: "Avaliações" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-navy-950/95 backdrop-blur-md border-b border-brand-500/20 text-white">
      {/* Topbar Informativa */}
      <div className="bg-navy-900 border-b border-white/5 py-1.5 px-4 text-xs text-slate-300 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 text-brand-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Segurança Eletrônica, CFTV & Instalações Elétricas Profissionais
            </span>
          </div>
          <div className="flex items-center gap-6">
            <span>Atendimento: {SITE_CONFIG.contact.region}</span>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-400 hover:text-accent-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              WhatsApp: {SITE_CONFIG.whatsapp.display}
            </a>
          </div>
        </div>
      </div>

      {/* Barra Principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="focus:outline-none focus:ring-2 focus:ring-brand-400 rounded-lg"
          onClick={() => setMobileMenuOpen(false)}
        >
          <AlltechLogo variant="light" size="md" />
        </Link>

        {/* Navegação Desktop */}
        <nav
          aria-label="Menu principal"
          className="hidden lg:flex items-center gap-1"
        >
          {NAV_LINKS.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-brand-500/20 text-brand-300 border border-brand-500/40"
                    : "text-slate-200 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Ações de Usuário e Orçamento Desktop */}
        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2">
              {user.role === "admin" && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40 hover:bg-amber-500/30 transition-colors"
                >
                  <ShieldAlert className="w-4 h-4" />
                  Painel Admin
                </Link>
              )}
              <Link
                href="/minha-conta"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white/10 text-white hover:bg-white/15 border border-white/10 transition-colors"
              >
                <UserCheck className="w-4 h-4 text-brand-400" />
                <span className="max-w-[130px] truncate">{user.name}</span>
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                title="Encerrar sessão"
                className="p-2 rounded-lg text-slate-300 hover:text-red-400 hover:bg-white/5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-200 hover:text-white hover:bg-white/10 border border-white/15 transition-colors"
            >
              <LogIn className="w-4 h-4 text-brand-400" />
              Entrar / Conta
            </Link>
          )}

          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold bg-accent-500 hover:bg-accent-600 text-navy-950 shadow-md hover:shadow-glow-amber transition-all duration-200"
          >
            Solicitar orçamento
          </a>
        </div>

        {/* Botão Menu Mobile */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label="Abrir ou fechar menu de navegação"
          className="lg:hidden p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white border border-white/10"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-brand-400" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Menu Mobile Adaptável */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-navy-900 border-b border-brand-500/30 px-4 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-base font-medium ${
                    isActive
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/40"
                      : "text-slate-200 hover:bg-white/5"
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-60" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/10 flex flex-col gap-2.5">
            {user ? (
              <>
                {user.role === "admin" && (
                  <Link
                    href="/admin"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold bg-amber-500/20 text-amber-300 border border-amber-400/40"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    Acessar Painel Administrativo
                  </Link>
                )}
                <Link
                  href="/minha-conta"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-semibold bg-white/10 text-white"
                >
                  <UserCheck className="w-4 h-4 text-brand-400" />
                  Minha Conta ({user.name})
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-lg font-medium text-red-300 bg-red-500/10 border border-red-500/20"
                >
                  <LogOut className="w-4 h-4" />
                  Encerrar Sessão
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg font-semibold bg-white/10 text-white border border-white/15"
                >
                  <LogIn className="w-4 h-4 text-brand-400" />
                  Entrar
                </Link>
                <Link
                  href="/cadastro"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-lg font-semibold bg-brand-600 text-white"
                >
                  Criar Conta
                </Link>
              </div>
            )}

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-lg font-bold bg-accent-500 text-navy-950 shadow-md"
            >
              <PhoneCall className="w-4 h-4" />
              Solicitar Orçamento no WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
