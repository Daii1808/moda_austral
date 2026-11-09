import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Outlined Ghost Button — docs/DESIGN.md
 * 22.5px border-radius, transparent background, 1px Warm Cream (#ffedd7) border,
 * Warm Cream text, 7.5px vertical padding, weight 500, uppercase, 12px.
 */
export function GhostButton({ children, className = '', ...props }: GhostButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-[22.5px] border border-warm-cream bg-transparent px-[18px] py-[7.5px] text-[12px] font-medium uppercase leading-none text-warm-cream transition-opacity hover:opacity-80 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
