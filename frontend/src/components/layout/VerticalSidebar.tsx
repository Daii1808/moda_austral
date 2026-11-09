interface VerticalSidebarProps {
  serialLabel?: string;
}

/**
 * Vertical Sidebar Label — docs/DESIGN.md
 * Rotated 90° text in Warm Cream, 10–12px uppercase, sits flush right on large viewports.
 */
export function VerticalSidebar({
  serialLabel = 'MODA AUSTRAL · 01-SERIE CIRCULAR',
}: VerticalSidebarProps) {
  return (
    <aside
      aria-label="Identificador de serie"
      className="pointer-events-none fixed top-1/2 right-[-58px] z-30 hidden -translate-y-1/2 xl:block"
    >
      <span className="block origin-center rotate-90 whitespace-nowrap text-[10px] font-medium uppercase tracking-normal text-warm-cream/80">
        {serialLabel}
      </span>
    </aside>
  );
}
