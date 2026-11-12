import type { CategoryFilter, PageRoute } from '@/types/product';
import { EXCLUSIVE_SECTION_IMAGES } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface CircularFashionSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Moda Circular Page — Spacious visual layout with generous margins between photos & text
 * Uses exclusive store interior photographs (`ma-18.jpg` and `ma-29.jpg`) not repeated anywhere else.
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

        {/* 1. Editorial Header Lockup */}
        <div className="grid grid-cols-1 items-end gap-[32px] lg:grid-cols-12 lg:gap-[56px]">
          <div className="flex flex-col items-start gap-[16px] lg:col-span-6">
            <h1 className="type-heading text-warm-cream">UN NUEVO ENCUENTRO</h1>
            <p className="text-[14px] font-medium uppercase text-ember-accent">
              ROPA CON SEGUNDA VIDA Y REUTILIZACIÓN CONSCIENTE.
            </p>
          </div>

          <div className="flex flex-col items-start gap-[24px] lg:col-span-6">
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

        <SectionDivider className="my-[64px] sm:my-[88px]" />

        {/* 2. Two Visual Pillars — Exclusive photos ma-18.jpg & ma-29.jpg */}
        <div className="grid grid-cols-1 gap-[52px] md:grid-cols-2 md:gap-[48px]">
          <div className="flex flex-col">
            <div className="aspect-[4/3] w-full overflow-hidden bg-bark-brown">
              <img
                src={EXCLUSIVE_SECTION_IMAGES.circularFind}
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
            <div className="aspect-[4/3] w-full overflow-hidden bg-bark-brown">
              <img
                src={EXCLUSIVE_SECTION_IMAGES.circularChoose}
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
