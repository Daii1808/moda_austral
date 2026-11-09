interface SectionDividerProps {
  tone?: 'cork' | 'driftwood';
  className?: string;
}

/**
 * Section Divider (Dashed Hairline) — docs/DESIGN.md
 * 1px dashed line in Cork Border (#40372e) or Driftwood (#6c5f51).
 * Never solid, never thicker than 2px.
 */
export function SectionDivider({ tone = 'cork', className = '' }: SectionDividerProps) {
  const borderTone = tone === 'driftwood' ? 'border-driftwood' : 'border-cork-border';
  return <hr className={`w-full border-0 border-t border-dashed ${borderTone} ${className}`} />;
}
