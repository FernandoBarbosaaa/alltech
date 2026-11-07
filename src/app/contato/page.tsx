"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ShieldCheck,
} from "lucide-react";
import { getWhatsAppUrl, SITE_CONFIG } from "@/config/site";

export default function ContatoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceCategory, setServiceCategory] = useState("Segurança Eletrônica");
  const [propertyType, setPropertyType] = useState("Residência");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          service_category: serviceCategory,
          property_type: propertyType,
          message,
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus({
          type: "error",
          text: json.error || "Não foi possível enviar sua mensagem.",
        });
      } else {
        setStatus({
          type: "success",
          text: "Mensagem enviada e registrada com sucesso! Nossa equipe entrará em contato em breve.",
        });
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      }
    } catch {
      setStatus({
        type: "error",
        text: "Erro de conexão ao enviar formulário.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 pb-24">
      {/* Cabeçalho */}
      <section className="bg-navy-950 text-white py-16 border-b border-brand-500/20 relative overflow-hidden">
        <div className="absolute inset-0 bg-circuit-pattern opacity-35" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-500/20 text-brand-300 border border-brand-400/30">
              <ShieldCheck className="w-4 h-4" />
              Fale Conosco • {SITE_CONFIG.name}
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              Solicite seu Orçamento ou Tire Dúvidas
            </h1>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Entre em contato pelo WhatsApp, telefone ou preencha o formulário
              abaixo para projetos de câmeras de segurança (CFTV), fechaduras
              eletrônicas, instalações e manutenção elétrica, ou montagem,
              formatação e manutenção de computadores e notebooks.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Coluna Esquerda: Canais de Atendimento */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-navy-900 text-white rounded-3xl p-7 sm:p-8 border border-brand-500/30 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-400">
                  Atendimento Direto
                </span>
                <h2 className="text-2xl font-display font-extrabold mt-1">
                  Canais de Contato
                </h2>
                <p className="text-sm text-slate-300 mt-1">
                  Prefere resposta imediata? Clique no botão abaixo para abrir
                  uma conversa direto no nosso WhatsApp oficial.
                </p>
              </div>

              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-xl font-bold text-base bg-emerald-500 hover:bg-emerald-400 text-navy-950 shadow-lg transition-all"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Chamar no WhatsApp {SITE_CONFIG.whatsapp.display}
              </a>

              <div className="space-y-4 pt-4 border-t border-white/10">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">
                      Telefone & WhatsApp
                    </span>
                    <a
                      href={SITE_CONFIG.contact.phoneHref}
                      className="text-lg font-display font-bold text-white hover:text-brand-300"
                    >
                      {SITE_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">
                      E-mail Corporativo
                    </span>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-brand-300 break-all"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">
                      Região de Atendimento
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {SITE_CONFIG.contact.region}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-brand-400" />
                  </div>
                  <div>
                    <span className="block text-xs text-slate-400">
                      Horários de Atendimento
                    </span>
                    <span className="text-sm sm:text-base font-semibold text-white">
                      {SITE_CONFIG.contact.hours}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna Direita: Formulário de Contato */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-display font-extrabold text-navy-900">
                Envie sua Solicitação de Orçamento
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Preencha os dados abaixo. Sua mensagem será salva em nosso
                sistema de atendimento e respondida rapidamente.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contactName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Nome Completo *
                    </label>
                    <input
                      id="contactName"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Seu nome ou nome da empresa"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contactPhone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      WhatsApp / Telefone *
                    </label>
                    <input
                      id="contactPhone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(21) 99999-9999"
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    E-mail
                  </label>
                  <input
                    id="contactEmail"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com.br"
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contactCategory"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Tipo de Serviço Desejado *
                    </label>
                    <select
                      id="contactCategory"
                      value={serviceCategory}
                      onChange={(e) => setServiceCategory(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Segurança Eletrônica">
                        Segurança Eletrônica / Câmeras CFTV
                      </option>
                      <option value="Aluguel de Câmeras de Segurança">
                        Aluguel de Câmeras (a partir de R$ 199,99)
                      </option>
                      <option value="Kit com 4 Câmeras">
                        Kit com 4 Câmeras de Segurança
                      </option>
                      <option value="Instalações Elétricas">
                        Instalações Elétricas / Quadros Elétricos
                      </option>
                      <option value="Manutenção Elétrica">
                        Manutenção Elétrica Preventiva ou Corretiva
                      </option>
                      <option value="Informática e Computadores">
                        Montagem, Formatação e Manutenção de PC e Notebook
                      </option>
                      <option value="Coleta de Descarte Eletrônico">
                        Coleta de Descarte de Equipamentos Eletrônicos
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contactProperty"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                    >
                      Tipo de Local / Ambiente *
                    </label>
                    <select
                      id="contactProperty"
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    >
                      <option value="Residência">Residência / Casa</option>
                      <option value="Acompanhamento de Idosos em Casa">
                        Acompanhamento de Idosos em Casa
                      </option>
                      <option value="Empresa / Comércio">
                        Empresa / Estabelecimento Comercial
                      </option>
                      <option value="Estoque / Galpão Empresarial">
                        Estoque / Galpão Empresarial
                      </option>
                      <option value="Condomínio Residencial ou Comercial">
                        Condomínio Residencial ou Comercial
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contactMessage"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Descreva sua Necessidade *
                  </label>
                  <textarea
                    id="contactMessage"
                    rows={4}
                    required
                    minLength={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Conte-nos quantos pontos de câmera deseja instalar ou qual serviço elétrico você precisa..."
                    className="w-full rounded-xl border border-slate-300 px-3.5 py-2.5 text-sm text-navy-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  />
                </div>

                {status && (
                  <div
                    className={`p-4 rounded-xl text-sm font-medium flex items-start gap-2.5 ${
                      status.type === "success"
                        ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                        : "bg-red-50 text-red-700 border border-red-200"
                    }`}
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                    )}
                    <span>{status.text}</span>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-sm bg-brand-600 hover:bg-brand-500 disabled:opacity-60 text-white shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Enviando..." : "Enviar Mensagem pelo Site"}
                  </button>

                  <a
                    href={getWhatsAppUrl(
                      name && message
                        ? `Olá! Conheci sua empresa pelo site e gostaria de solicitar um orçamento para um serviço.\n\nNome: ${name}\nServiço: ${serviceCategory}\nLocal: ${propertyType}\nDetalhes: ${message}`
                        : SITE_CONFIG.whatsapp.defaultMessage
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-bold text-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Enviar também via WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
