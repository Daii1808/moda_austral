import type { CategoryFilter, PageRoute } from '@/types/product';
import { ModaAustralLogo, SectionDivider, UnderlineLink } from '@/components/ui';

interface FooterProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Ultra-Simple Prototype Footer
 * - Mobile: 100% centered, clean vertical rhythm.
 * - Desktop: Minimal single-bar layout with zero text clutter.
 */
export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="w-screen bg-[#f8edd9] px-[24px] pt-[64px] pb-[56px] sm:px-[56px] sm:pt-[80px] sm:pb-[64px]">
      <SectionDivider className="mb-[48px] sm:mb-[56px]" />

      <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-[32px] text-center lg:flex-row lg:justify-between lg:text-left">
        {/* Brand Logo (Normal/Small size, centered on mobile) */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className="flex cursor-pointer flex-col items-center gap-[10px] lg:items-start"
        >
          <ModaAustralLogo size="sm" />
          <span className="text-[11px] font-medium uppercase tracking-wider text-driftwood">
            MODA CIRCULAR · LENCA & PUERTO MONTT
          </span>
        </button>

        {/* Minimal Navigation Links (Centered on mobile, clean row on PC) */}
        <nav
          aria-label="Enlaces de pie de página"
          className="flex flex-wrap items-center justify-center gap-x-[24px] gap-y-[14px] sm:gap-x-[32px]"
        >
          <UnderlineLink
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('inicio');
            }}
          >
            INICIO
          </UnderlineLink>
          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
          >
            CATEGORÍAS
          </UnderlineLink>
          <UnderlineLink
            href="#como-comprar"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('como-comprar');
            }}
          >
            CÓMO COMPRAR
          </UnderlineLink>
          <UnderlineLink
            href="#sucursales"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('sucursales');
            }}
          >
            SUCURSALES
          </UnderlineLink>
          <UnderlineLink
            href="#preguntas-frecuentes"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('preguntas-frecuentes');
            }}
          >
            FAQ
          </UnderlineLink>
          <UnderlineLink
            href="#consulta"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('consulta');
            }}
          >
            CONSULTA
          </UnderlineLink>
        </nav>
      </div>
    </footer>
  );
}
