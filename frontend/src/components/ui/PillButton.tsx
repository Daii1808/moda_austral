import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Pill Button (Filled) — Burdeo Austral (#510f18) background with Marfil (#f5ecda) text,
 * matching the Canva prototype buttons ("Cómo comprar", "Sucursales") on Page 15 of the PDF
 * and the 36px pill geometry of docs/DESIGN.md.
 */
export function PillButton({ children, className = '', ...props }: PillButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[36px] bg-[#510f18] px-[24px] py-[14px] text-[12px] font-medium uppercase leading-none text-[#f5ecda] transition-colors hover:bg-[#9b4067] cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
