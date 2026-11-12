import { useState } from 'react';
import type {
  CategoryFilter,
  CategoryId,
  GarmentItem,
  PageRoute,
} from '@/types/product';
import { CATEGORIES_DATA, GARMENT_CATALOG } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface CategoriesSectionProps {
  activeCategoryFilter: CategoryFilter;
  onChangeCategoryFilter: (filter: CategoryFilter) => void;
  onSelectGarment: (garment: GarmentItem) => void;
  onSelectCategoryForInquiry: (category: CategoryId, sampleRef?: string) => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Catálogo / Categorías Page
 * Displays 18 catalog items across Vestuario, Calzado, Textiles & Bolsos, and Accesorios & Belleza.
 * Every item uses its own exclusive photograph (zero duplicate images).
 */
export function CategoriesSection({
  activeCategoryFilter,
  onChangeCategoryFilter,
  onSelectGarment,
  onSelectCategoryForInquiry,
  onNavigate,
}: CategoriesSectionProps) {
  const [branchFilter, setBranchFilter] = useState<'all' | 'Lenca' | 'Puerto Montt'>('all');

  const activeCategoryMeta =
    activeCategoryFilter !== 'all'
      ? CATEGORIES_DATA.find((c) => c.id === activeCategoryFilter)
      : undefined;

  const filteredGarments = GARMENT_CATALOG.filter((item) => {
    const matchesCategory =
      activeCategoryFilter === 'all' || item.category === activeCategoryFilter;
    const matchesBranch =
      branchFilter === 'all' || item.branch === branchFilter;
    return matchesCategory && matchesBranch;
  });

  const inquiryCategoryTarget: CategoryId =
    activeCategoryFilter === 'all' ? 'vestuario' : activeCategoryFilter;

  const primaryCtaLabel = activeCategoryMeta
    ? activeCategoryMeta.buttonLabel
    : 'CONSULTAR DISPONIBILIDAD';

  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        {/* 1. Spacious Header */}
        <div className="mb-[36px] flex flex-wrap items-end justify-between gap-[20px] sm:mb-[48px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              EJEMPLOS REFERENCIALES · SIN STOCK GARANTIZADO
            </span>
            <h1 className="type-heading text-warm-cream">
              {activeCategoryMeta ? activeCategoryMeta.title : 'CATÁLOGO REFERENCIAL'}
            </h1>
            <p className="max-w-[680px] text-[13px] font-medium uppercase leading-[1.5] text-driftwood">
              {activeCategoryMeta
                ? activeCategoryMeta.conversationalBody
                : 'VESTUARIO, CALZADO, TEXTILES Y ACCESORIOS · DISPONIBILIDAD Y RESERVAS SE CONFIRMAN CON LA TIENDA'}
            </p>
          </div>

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

        <SectionDivider />

        {/* 2. Responsive Category & Branch Filter Bar with Breathing Room */}
        <div className="my-[28px] flex flex-col justify-between gap-[20px] sm:my-[36px] lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-[10px]">
            <button
              type="button"
              onClick={() => onChangeCategoryFilter('all')}
              className={`cursor-pointer rounded-[22.5px] border px-[18px] py-[8px] text-[12px] font-medium uppercase leading-none transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'border-[#510f18] bg-[#510f18] text-[#f5ecda]'
                  : 'border-[#510f18] bg-transparent text-[#510f18] hover:bg-[#de9fbd]/25'
              }`}
            >
              TODO ({GARMENT_CATALOG.length})
            </button>

            {CATEGORIES_DATA.map((cat) => {
              const count = GARMENT_CATALOG.filter((g) => g.category === cat.id).length;
              const isSelected = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChangeCategoryFilter(cat.id)}
                  className={`cursor-pointer rounded-[22.5px] border px-[18px] py-[8px] text-[12px] font-medium uppercase leading-none transition-colors ${
                    isSelected
                      ? 'border-[#510f18] bg-[#510f18] text-[#f5ecda]'
                      : 'border-[#510f18] bg-transparent text-[#510f18] hover:bg-[#de9fbd]/25'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-[14px]">
            <span className="text-[10px] font-medium uppercase text-driftwood">
              SUCURSAL:
            </span>
            {(['all', 'Lenca', 'Puerto Montt'] as const).map((branch) => {
              const active = branchFilter === branch;
              const label = branch === 'all' ? 'TODAS' : branch.toUpperCase();
              return (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setBranchFilter(branch)}
                  className={`cursor-pointer pb-[2px] text-[12px] font-medium uppercase transition-colors ${
                    active
                      ? 'border-b border-dashed border-ember-accent text-warm-cream'
                      : 'border-b border-transparent text-warm-cream/70 hover:text-warm-cream'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <SectionDivider className="mb-[52px] sm:mb-[68px]" />

        {/* 3. Spacious Catalog Grid — Single exclusive photo per item */}
        <div className="grid grid-cols-1 gap-x-[24px] gap-y-[56px] sm:grid-cols-2 sm:gap-x-[32px] sm:gap-y-[72px] md:grid-cols-3 xl:grid-cols-4">
          {filteredGarments.map((garment) => (
            <article
              key={garment.id}
              className="group flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => onSelectGarment(garment)}
                  className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden bg-bark-brown"
                >
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

                {/* Airy Caption Below Image */}
                <div
                  onClick={() => onSelectGarment(garment)}
                  className="mt-[20px] flex cursor-pointer flex-col gap-[8px] sm:mt-[24px]"
                >
                  <span className="text-[10px] font-medium uppercase text-ember-accent">
                    {garment.categoryLabel} · REF. {garment.refCode}
                  </span>
                  <h2 className="text-[13px] font-medium uppercase leading-[1.35] text-warm-cream group-hover:underline sm:text-[14px]">
                    {garment.name}
                  </h2>
                  <span className="text-[11px] font-medium uppercase text-driftwood">
                    TALLA {garment.size} · {garment.condition}
                  </span>
                </div>
              </div>

              <div className="mt-[16px] flex items-center justify-between border-t border-dashed border-cork-border pt-[12px]">
                <span className="text-[11px] font-medium uppercase text-driftwood">
                  {garment.availabilityNote}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    onSelectCategoryForInquiry(
                      garment.category,
                      `${garment.refCode} — ${garment.name}`,
                    )
                  }
                  className="cursor-pointer text-[11px] font-medium uppercase text-ember-accent hover:underline"
                >
                  CONSULTAR →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Spacious Bottom CTA */}
        <div className="mt-[80px] sm:mt-[104px]">
          <SectionDivider className="mb-[40px] sm:mb-[48px]" />

          <div className="flex flex-col items-center justify-between gap-[24px] text-center sm:flex-row sm:text-left">
            <span className="text-[12px] font-medium uppercase text-driftwood">
              LA DISPONIBILIDAD, RESERVAS Y CONDICIONES DE COMPRA SE CONFIRMAN CON LA TIENDA
            </span>

            <div className="flex flex-wrap items-center justify-center gap-[16px]">
              <PillButton
                onClick={() => onSelectCategoryForInquiry(inquiryCategoryTarget)}
              >
                {primaryCtaLabel}
              </PillButton>
              <GhostButton onClick={() => onNavigate('como-comprar')}>
                CÓMO COMPRAR
              </GhostButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
