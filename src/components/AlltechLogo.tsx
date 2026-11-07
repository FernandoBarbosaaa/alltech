import React from "react";

interface AlltechLogoProps {
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
}

/**
 * Reprodução vetorial fiel do logotipo ALLTECH SOLUÇÕES presente nas imagens de referência:
 * Letra "A" tecnológica estilizada com 3 trilhas/nós de circuito eletrônico à direita,
 * acompanhada da tipografia ALLTECH SOLUÇÕES.
 */
export function AlltechLogo({
  variant = "light",
  size = "md",
  className = "",
}: AlltechLogoProps) {
  const iconDimensions =
    size === "sm" ? "w-9 h-9" : size === "lg" ? "w-14 h-14" : "w-11 h-11";
  const titleSize =
    size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl";
  const subSize =
    size === "sm"
      ? "text-[9px] tracking-[0.28em]"
      : size === "lg"
      ? "text-xs tracking-[0.34em]"
      : "text-[10px] tracking-[0.3em]";

  const titleColor = variant === "light" ? "text-white" : "text-navy-900";
  const circuitStroke = variant === "light" ? "#94A3B8" : "#334155";

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      <svg
        viewBox="0 0 100 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconDimensions} shrink-0`}
        aria-hidden="true"
      >
        {/* Trilhas de circuito à direita do A (fiel à imagem de referência) */}
        <path
          d="M57 20 H78"
          stroke={circuitStroke}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle
          cx="83"
          cy="20"
          r="5.5"
          stroke={circuitStroke}
          strokeWidth="4.5"
          fill="none"
        />

        <path
          d="M64 36 H82 L87 41"
          stroke={circuitStroke}
          strokeWidth="5.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="91"
          cy="45"
          r="5.5"
          stroke={circuitStroke}
          strokeWidth="4.5"
          fill="none"
        />

        <path
          d="M69 54 H81"
          stroke={circuitStroke}
          strokeWidth="5.5"
          strokeLinecap="round"
        />
        <circle
          cx="86"
          cy="54"
          r="5.5"
          stroke={circuitStroke}
          strokeWidth="4.5"
          fill="none"
        />

        {/* Sombra sutil do A */}
        <path
          d="M42 10 L54 10 L80 78 L64 78 L58 62 L35 62 L29 78 L13 78 Z"
          fill="rgba(24, 139, 246, 0.12)"
        />

        {/* Corpo principal da letra A em contorno duplo tecnológico */}
        <path
          d="M40 12 H53 L77 76 H62 L56 60 H37 L31 76 H16 L40 12 Z"
          stroke="#188BF6"
          strokeWidth="5.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Triângulo interno do A */}
        <path
          d="M46.5 29 L53.5 48 H39.5 L46.5 29 Z"
          stroke="#36B3FA"
          strokeWidth="4.5"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Borda direita técnica escura/prateada integrando com as trilhas */}
        <path
          d="M53 12 L77 76 H65"
          stroke={circuitStroke}
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      <div className="flex flex-col leading-none">
        <span
          className={`font-display font-extrabold tracking-wider ${titleSize} ${titleColor}`}
        >
          ALLTECH
        </span>
        <span
          className={`font-sans font-bold uppercase text-brand-400 mt-1 ${subSize}`}
        >
          SOLUÇÕES
        </span>
      </div>
    </div>
  );
}
