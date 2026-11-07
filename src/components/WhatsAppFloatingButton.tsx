"use client";

import React from "react";
import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/config/site";

export function WhatsAppFloatingButton() {
  const whatsappUrl = getWhatsAppUrl(SITE_CONFIG.whatsapp.defaultMessage);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-3 group">
      <div className="hidden sm:flex flex-col items-end bg-navy-900/95 text-white px-4 py-2 rounded-xl shadow-xl border border-brand-500/30 backdrop-blur-md opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pointer-events-none">
        <span className="text-xs font-semibold text-emerald-400">
          Atendimento Rápido via WhatsApp
        </span>
        <span className="text-xs text-slate-300">
          Solicite seu orçamento agora
        </span>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Solicitar orçamento pelo WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-30 animate-ping" />
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 fill-current relative z-10" />
      </a>
    </div>
  );
}
