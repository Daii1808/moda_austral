import type { CategoryFilter, GarmentItem, PageRoute } from '@/types/product';
import { GARMENT_CATALOG } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface HeroSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
  onSelectGarment: (garment: GarmentItem) => void;
}

/**
 * Inicio Page (Storefront) — Generous Luxury Spacing + Gucci Visual Rhythm
 * Wide margins, breathing room between sections, and ample gap between images and text.
 */
export function HeroSection({
  onNavigate,
  onSelectGarment,
}: HeroSectionProps) {
  const featuredGarments = GARMENT_CATALOG.filter((item) => item.featured).slice(0, 4);

  return (
    <div className="w-screen bg-walnut-shadow">
      {/* 1. Full-Viewport Hero Campaign (100vh) */}
      <section className="relative flex min-h-screen w-screen flex-col justify-between overflow-hidden bg-[#510f18] px-[24px] pt-[96px] pb-[64px] sm:px-[56px] sm:pb-[80px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/images/hero-rack.jpg"
            alt="Colección Moda Austral"
            className="animate-hero-zoom h-full w-full object-cover opacity-60 contrast-115"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#510f18]/75 via-[#510f18]/35 to-[#510f18]/90" />
        </div>

        {/* Top spacer for the scroll-docking MODA AUSTRAL wordmark from Navbar */}
        <div className="relative z-10 pt-[76px]" aria-hidden="true" />

        {/* Bottom Centered Campaign Lockup — Refined Gucci campaign subtitle (much smaller than MODA AUSTRAL) */}
        <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center gap-[16px] text-center animate-fade-up">
          <span className="inline-block bg-[#9b4067] px-[14px] py-[6px] text-[10px] font-medium uppercase tracking-wider text-[#fffbc3]">
            COLECCIÓN CIRCULAR · LENCA & PUERTO MONTT
          </span>
          <h2 className="text-[18px] sm:text-[24px] font-medium uppercase tracking-[0.12em] text-[#f5ecda]">
            UN NUEVO ENCUENTRO
          </h2>

          <div className="mt-[12px] flex flex-wrap items-center justify-center gap-[18px]">
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'all')}
              className="inline-flex cursor-pointer items-center justify-center rounded-[36px] bg-[#f5ecda] px-[28px] py-[15px] text-[12px] font-medium uppercase leading-none text-[#510f18] transition-colors hover:bg-[#de9fbd]"
            >
              EXPLORAR COLECCIÓN
            </button>
            <button
              type="button"
              onClick={() => onNavigate('como-comprar')}
              className="inline-flex cursor-pointer items-center justify-center rounded-[22.5px] border border-[#f5ecda] bg-transparent px-[22px] py-[12px] text-[12px] font-medium uppercase leading-none text-[#f5ecda] transition-colors hover:bg-[#f5ecda]/15"
            >
              CÓMO COMPRAR
            </button>
          </div>
        </div>
      </section>

      {/* 2. Gucci Split Category Showcases — Generous top/bottom padding & grid gaps */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[80px] sm:px-[56px] sm:py-[112px]">
        <div className="mb-[48px] flex flex-col items-center justify-between gap-[16px] text-center sm:mb-[64px] sm:flex-row sm:items-end sm:text-left">
          <h2 className="type-heading text-warm-cream">CATEGORÍAS</h2>
          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
          >
            VER TODO EL CATÁLOGO →
          </UnderlineLink>
        </div>

        <div className="grid grid-cols-1 gap-[28px] sm:gap-[36px] md:grid-cols-2">
          {/* Vestuario */}
          <div
            onClick={() => onNavigate('categorias', 'vestuario')}
            className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#510f18] p-[36px] text-center sm:p-[52px]"
          >
            <img
              src="/images/abrigo-lana-editorial.jpg"
              alt="Vestuario Moda Austral"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#510f18]/90 via-[#510f18]/20 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-[14px]">
              <h3 className="type-heading text-[#f5ecda]">VESTUARIO</h3>
              <span className="border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
                EXPLORAR →
              </span>
            </div>
          </div>

          {/* Calzado */}
          <div
            onClick={() => onNavigate('categorias', 'calzado')}
            className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#510f18] p-[36px] text-center sm:p-[52px]"
          >
            <img
              src="/images/calzado-editorial.jpg"
              alt="Calzado Moda Austral"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#510f18]/90 via-[#510f18]/20 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-[14px]">
              <h3 className="type-heading text-[#f5ecda]">CALZADO</h3>
              <span className="border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
                EXPLORAR →
              </span>
            </div>
          </div>
        </div>

        {/* Second Row: Textiles + Moda Circular */}
        <div className="mt-[28px] grid grid-cols-1 gap-[28px] sm:mt-[36px] sm:gap-[36px] md:grid-cols-2">
          {/* Textiles */}
          <div
            onClick={() => onNavigate('categorias', 'textiles')}
            className="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#510f18] p-[36px] text-center sm:p-[52px]"
          >
            <img
              src="/images/textiles-bufanda-editorial.jpg"
              alt="Textiles Moda Austral"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#510f18]/90 via-[#510f18]/20 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-[14px]">
              <h3 className="type-heading text-[#f5ecda]">TEXTILES</h3>
              <span className="border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
                EXPLORAR →
              </span>
            </div>
          </div>

          {/* Moda Circular Banner */}
          <div
            onClick={() => onNavigate('moda-circular')}
            className="group relative flex aspect-[16/10] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#9b4067] p-[36px] text-center sm:p-[52px]"
          >
            <img
              src="/images/moda-circular-empaque.jpg"
              alt="Moda Circular"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#9b4067]/95 via-[#510f18]/35 to-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-[14px]">
              <h3 className="type-heading text-[#f5ecda]">MODA CIRCULAR</h3>
              <span className="border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
                VER INFORMACIÓN →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Featured Boutique Selection — Plenty of space between header, photos, and captions */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[104px]">
        <SectionDivider className="mb-[64px] sm:mb-[80px]" />

        <div className="mb-[48px] flex flex-col items-center justify-between gap-[20px] text-center sm:mb-[60px] sm:flex-row sm:items-end sm:text-left">
          <h2 className="type-heading text-warm-cream">
            PIEZAS DESTACADAS
          </h2>
          <GhostButton onClick={() => onNavigate('categorias', 'all')}>
            VER CATÁLOGO
          </GhostButton>
        </div>

        <div className="grid grid-cols-2 gap-x-[24px] gap-y-[52px] sm:gap-x-[32px] sm:gap-y-[68px] lg:grid-cols-4">
          {featuredGarments.map((garment) => (
            <article
              key={garment.id}
              onClick={() => onSelectGarment(garment)}
              className="group flex cursor-pointer flex-col"
            >
              {/* Tall 3:4 Product Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-bark-brown">
                <img
                  src={garment.primaryImage}
                  alt={garment.name}
                  className="h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                />
                <img
                  src={garment.secondaryImage}
                  alt={`${garment.name} detalle`}
                  className="absolute inset-0 h-full w-full object-cover opacity-0 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
                <div className="absolute top-[12px] left-[12px] bg-[#510f18]/90 px-[10px] py-[4px]">
                  <span className="text-[10px] font-medium uppercase text-[#f5ecda]">
                    {garment.branch.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Generous space between photo and product text */}
              <div className="mt-[20px] flex flex-col gap-[8px] sm:mt-[24px]">
                <h3 className="text-[13px] font-medium uppercase leading-[1.35] text-warm-cream group-hover:underline sm:text-[14px]">
                  {garment.name}
                </h3>
                <div className="flex items-center justify-between pt-[2px]">
                  <span className="text-[14px] font-medium uppercase text-warm-cream">
                    {garment.price}
                  </span>
                  <span className="text-[11px] font-medium uppercase text-driftwood">
                    TALLA {garment.size}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Minimal Quick-Action Bar with Generous Air */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[96px]">
        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        <div className="grid grid-cols-1 gap-[40px] sm:grid-cols-2 sm:gap-[48px]">
          <div className="flex flex-col items-center justify-between gap-[20px] border-b border-dashed border-cork-border pb-[36px] text-center sm:flex-row sm:border-b-0 sm:pb-0 sm:text-left">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[11px] font-medium uppercase text-ember-accent">
                PASO A PASO
              </span>
              <h3 className="type-heading-sm text-warm-cream">
                CÓMO COMPRAR
              </h3>
            </div>
            <PillButton onClick={() => onNavigate('como-comprar')}>
              CÓMO COMPRAR
            </PillButton>
          </div>

          <div className="flex flex-col items-center justify-between gap-[20px] text-center sm:flex-row sm:text-left">
            <div className="flex flex-col gap-[8px]">
              <span className="text-[11px] font-medium uppercase text-ember-accent">
                LENCA & PUERTO MONTT
              </span>
              <h3 className="type-heading-sm text-warm-cream">
                SUCURSALES
              </h3>
            </div>
            <PillButton onClick={() => onNavigate('sucursales')}>
              SUCURSALES
            </PillButton>
          </div>
        </div>
      </section>
    </div>
  );
}
