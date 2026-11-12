import type { CategoryFilter, GarmentItem, PageRoute } from '@/types/product';
import {
  CATEGORIES_DATA,
  EXCLUSIVE_SECTION_IMAGES,
  GARMENT_CATALOG,
} from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface HeroSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
  onSelectGarment: (garment: GarmentItem) => void;
}

/**
 * Inicio Page (Catálogo Digital & Guía Informativa)
 * Every single photograph on this page is 100% unique (zero repeated images):
 * - Hero Banner: ma-03.jpg
 * - Category Covers: ma-26.jpg (Vestuario), ma-22.jpg (Calzado), ma-16.jpg (Textiles), ma-10.jpg (Accesorios)
 * - Moda Circular Banner: ma-25.jpg
 * - Featured Catalog Items: ma-02.jpg, ma-01.jpg, ma-17.jpg, ma-23.jpg
 */
export function HeroSection({
  onNavigate,
  onSelectGarment,
}: HeroSectionProps) {
  const featuredGarments = GARMENT_CATALOG.filter((item) => item.featured).slice(0, 4);

  return (
    <div className="w-screen bg-walnut-shadow">
      {/* 1. Full-Viewport Hero Campaign (100vh) — Exclusive image ma-03.jpg */}
      <section className="relative flex min-h-screen w-screen flex-col justify-between overflow-hidden bg-[#510f18] px-[24px] pt-[96px] pb-[64px] sm:px-[56px] sm:pb-[80px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={EXCLUSIVE_SECTION_IMAGES.heroBanner}
            alt="Catálogo Moda Austral"
            className="animate-hero-zoom h-full w-full object-cover opacity-65 contrast-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#510f18]/75 via-[#510f18]/35 to-[#510f18]/90" />
        </div>

        {/* Top spacer for the scroll-docking MODA AUSTRAL wordmark from Navbar */}
        <div className="relative z-10 pt-[76px]" aria-hidden="true" />

        {/* Bottom Centered Campaign Lockup — Subtitle smaller than MODA AUSTRAL */}
        <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center gap-[16px] text-center animate-fade-up">
          <span className="inline-block bg-[#9b4067] px-[14px] py-[6px] text-[10px] font-medium uppercase tracking-wider text-[#fffbc3]">
            CATÁLOGO REFERENCIAL · LENCA & PUERTO MONTT
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
              EXPLORAR CATÁLOGO
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

      {/* 2. 4 Catalog Category Showcases (ma-26, ma-22, ma-16, ma-10) + Moda Circular Banner (ma-25) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[80px] sm:px-[56px] sm:py-[112px]">
        <div className="mb-[48px] flex flex-col items-center justify-between gap-[16px] text-center sm:mb-[64px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              GUÍA DE CATEGORÍAS
            </span>
            <h2 className="type-heading text-warm-cream">CATÁLOGO POR CATEGORÍA</h2>
          </div>
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

        {/* 2x2 Grid of the 4 Categories using their exclusive cover images */}
        <div className="grid grid-cols-1 gap-[28px] sm:gap-[36px] md:grid-cols-2">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('categorias', cat.id)}
              className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#510f18] p-[32px] text-center sm:p-[48px]"
            >
              <img
                src={cat.imageUrl}
                alt={cat.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#510f18]/92 via-[#510f18]/25 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-[12px]">
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#fffbc3]">
                  {cat.badgeText}
                </span>
                <h3 className="type-heading text-[#f5ecda]">{cat.title}</h3>
                <span className="border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
                  EXPLORAR CATEGORÍA →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Full-Width Editorial Banner: Moda Circular (Exclusive image ma-25.jpg) */}
        <div
          onClick={() => onNavigate('moda-circular')}
          className="group relative mt-[28px] flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-[#9b4067] p-[36px] text-center sm:mt-[36px] sm:min-h-[400px] sm:p-[56px]"
        >
          <img
            src={EXCLUSIVE_SECTION_IMAGES.circularBanner}
            alt="Moda Circular Moda Austral"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#510f18]/95 via-[#510f18]/45 to-transparent" />
          <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-[14px]">
            <span className="inline-block bg-[#9b4067] px-[12px] py-[4px] text-[10px] font-medium uppercase tracking-wider text-[#fffbc3]">
              IDENTIDAD REUTILIZABLE · SUR DE CHILE
            </span>
            <h3 className="type-heading text-[#f5ecda]">MODA CIRCULAR</h3>
            <p className="text-[14px] leading-[1.5] text-[#f5ecda]/90">
              Ropa seleccionada con segunda vida y enfoque sustentable. Revisa qué puedes encontrar antes de visitar o escribirnos.
            </p>
            <span className="mt-[4px] border-b border-[#f5ecda] pb-[4px] text-[12px] font-medium uppercase text-[#f5ecda]">
              CONOCER MODA CIRCULAR →
            </span>
          </div>
        </div>
      </section>

      {/* 3. Featured Reference Catalog Examples (ma-02, ma-01, ma-17, ma-23 — distinct from category covers above) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[104px]">
        <SectionDivider className="mb-[64px] sm:mb-[80px]" />

        <div className="mb-[48px] flex flex-col items-center justify-between gap-[20px] text-center sm:mb-[60px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              EJEMPLOS REFERENCIALES · SIN STOCK GARANTIZADO
            </span>
            <h2 className="type-heading text-warm-cream">
              MUESTRA DEL CATÁLOGO
            </h2>
          </div>
          <GhostButton onClick={() => onNavigate('categorias', 'all')}>
            VER CATÁLOGO COMPLETO
          </GhostButton>
        </div>

        <div className="grid grid-cols-1 gap-x-[24px] gap-y-[52px] sm:grid-cols-2 sm:gap-x-[32px] sm:gap-y-[68px] lg:grid-cols-4">
          {featuredGarments.map((garment) => (
            <article
              key={garment.id}
              onClick={() => onSelectGarment(garment)}
              className="group flex cursor-pointer flex-col"
            >
              {/* Tall 3:4 Single Unique Catalog Image */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-bark-brown">
                <img
                  src={garment.primaryImage}
                  alt={garment.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-[12px] left-[12px] bg-[#510f18]/90 px-[10px] py-[4px]">
                  <span className="text-[10px] font-medium uppercase text-[#f5ecda]">
                    {garment.branch.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Generous space between photo and product text */}
              <div className="mt-[20px] flex flex-col gap-[8px] sm:mt-[24px]">
                <span className="text-[10px] font-medium uppercase text-ember-accent">
                  {garment.categoryLabel}
                </span>
                <h3 className="text-[13px] font-medium uppercase leading-[1.35] text-warm-cream group-hover:underline sm:text-[14px]">
                  {garment.name}
                </h3>
                <div className="flex items-center justify-between pt-[4px]">
                  <span className="text-[11px] font-medium uppercase text-driftwood">
                    {garment.availabilityNote}
                  </span>
                  <span className="text-[11px] font-medium uppercase text-warm-cream">
                    VER FICHA →
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
