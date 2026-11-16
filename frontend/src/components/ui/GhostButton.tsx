import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Botón Secundario Moda Austral — Estilo Gráfico del Manual de Identidad Visual (Páginas 6, 11 y 12)
 * Bloque suavemente redondeado (14px), borde Fucsia (#A73668), fondo Rosa Pastel suave / Beige
 * y tipografía oficial Arcifom legible para todas las edades.
 */
export function GhostButton({ children, className = '', ...props }: GhostButtonProps) {
  return (
    <button
      className={`font-arcifom inline-flex items-center justify-center rounded-[14px] border-2 border-[#A73668] bg-[#E89BBD]/25 px-[24px] py-[13px] text-[15px] font-medium leading-none tracking-[0.02em] text-[#590516] transition-colors duration-200 hover:bg-[#A73668] hover:text-[#FFFABB] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#590516] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
