import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Botón Primario Moda Austral — Estilo Gráfico del Manual de Identidad Visual (Páginas 6, 11 y 12)
 * Bloque suavemente redondeado (14px), tipografía oficial Arcifom, fondo Burdeo (#590516)
 * con transición a Fucsia (#A73668) y texto Mantequilla/Beige de alto contraste.
 */
export function PillButton({ children, className = '', ...props }: PillButtonProps) {
  return (
    <button
      className={`font-arcifom inline-flex items-center justify-center rounded-[14px] bg-[#590516] px-[26px] py-[15px] text-[15px] font-medium leading-none tracking-[0.02em] text-[#FFFABB] transition-colors duration-200 hover:bg-[#A73668] hover:text-[#F6EBD7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A73668] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
