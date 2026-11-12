import type { CategoryFilter, PageRoute } from '@/types/product';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface CircularFashionSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Moda Circular Page — Spacious visual layout with generous margins between photos & text
 * Uses real store interior photography from Moda Austral (`ma-26.jpg`, `ma-18.jpg`, `ma-25.jpg`, `ma-29.jpg`).
 */
export function CircularFashionSection({ onNavigate }: CircularFashionSectionProps) {
  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[36px] flex flex-wrap items-center justify-between gap-[16px]">
          <span className="text-[11px] font-medium uppercase text-ember-accent">
            MODA CIRCULAR · IDENTIDAD REUTILIZABLE
          </span>
          <UnderlineLink
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('inicio');
            }}
          >
            ← INICIO
          </UnderlineLink>
        </div>

        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        {/* 1. 3-Column Visual Reveal with Generous Gaps */}
        <div className="grid grid-cols-1 items-center gap-[44px] lg:grid-cols-12 lg:gap-[56px]">
          <div className="flex flex-col items-start gap-[16px] lg:col-span-4">
            <h1 className="type-heading text-warm-cream">UN NUEVO ENCUENTRO</h1>
            <p className="text-[14px] font-medium uppercase text-ember-accent">
              ROPA CON SEGUNDA VIDA Y REUTILIZACIÓN CONSCIENTE.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center lg:col-span-4">
            <div className="aspect-[4/5] w-full overflow-hidden bg-bark-brown">
              <img
                src="/images/catalogo/ma-26.jpg"
                alt="Interior Moda Austral"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>

          <div className="flex flex-col items-start gap-[28px] lg:col-span-4">
            <p className="text-[16px] leading-[1.65] text-warm-cream">
              En Moda Austral trabajamos con prendas únicas y moda circular en Lenca y Puerto Montt, prolongando el uso de vestuario, calzado, textiles y accesorios seleccionados.
            </p>
            <div className="flex flex-wrap items-center gap-[16px]">
              <PillButton onClick={() => onNavigate('categorias', 'all')}>
                VER CATÁLOGO
              </PillButton>
              <GhostButton onClick={() => onNavigate('consulta')}>
                CONSULTAR
              </GhostButton>
            </div>
          </div>
        </div>

        <SectionDivider className="my-[72px] sm:my-[96px]" />

        {/* 2. Two Visual Pillars — Generous distance between image and text below */}
        <div className="grid grid-cols-1 gap-[52px] md:grid-cols-2 md:gap-[48px]">
          <div className="flex flex-col">
            <div className="aspect-[16/10] w-full overflow-hidden bg-bark-brown">
              <img
                src="/images/catalogo/ma-18.jpg"
                alt="Qué puedes encontrar en Moda Austral"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="type-heading-sm mt-[28px] text-warm-cream sm:mt-[32px]">
              QUÉ PUEDES ENCONTRAR
            </h2>
            <p className="mt-[10px] text-[15px] leading-[1.55] text-warm-cream/85">
              Vestuario seleccionado, calzado en cuero y gamuza, tejidos artesanales a crochet, bolsos y accesorios con rotación constante.
            </p>
          </div>

          <div className="flex flex-col">
            <div className="aspect-[16/10] w-full overflow-hidden bg-bark-brown">
              <img
                src="/images/catalogo/ma-25.jpg"
                alt="Antes de elegir en Moda Austral"
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="type-heading-sm mt-[28px] text-warm-cream sm:mt-[32px]">
              ANTES DE ELEGIR
            </h2>
            <p className="mt-[10px] text-[15px] leading-[1.55] text-warm-cream/85">
              Como el stock varía por tratarse de prendas únicas, revisa siempre la categoría, talla referencial y sucursal antes de consultar o visitar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
