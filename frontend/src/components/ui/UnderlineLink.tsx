import type { AnchorHTMLAttributes, ReactNode } from 'react';

interface UnderlineLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  active?: boolean;
  variant?: 'cream' | 'ember';
}

/**
 * Underline Text Link — docs/DESIGN.md
 * 0px radius, transparent background, Warm Cream text (or Ember #dc5000 for credit lines/links only),
 * 0px padding, weight 500, uppercase, 12–14px.
 */
export function UnderlineLink({
  children,
  active = false,
  variant = 'cream',
  className = '',
  ...props
}: UnderlineLinkProps) {
  const colorClass = variant === 'ember' ? 'text-ember-accent' : 'text-warm-cream';
  const borderClass = active
    ? 'border-b border-dashed border-cork-border pb-[4px]'
    : 'border-b border-transparent hover:border-warm-cream pb-[4px]';

  return (
    <a
      className={`inline-block rounded-none bg-transparent p-0 text-[12px] font-medium uppercase leading-none transition-colors ${colorClass} ${borderClass} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
