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
 * Catálogo Referencial por Categorías — Con botones y tipografía oficial Arcifom del Manual de Identidad Visual
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
    : 'Consultar Disponibilidad';

  return (
    <div className="min-h-screen w-screen bg-[#F6EBD7] px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        {/* 1. Encabezado */}
        <div className="mb-[36px] flex flex-wrap items-end justify-between gap-[20px] sm:mb-[48px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
              Ejemplos Referenciales · Sin Stock Garantizado
            </span>
            <h1 className="type-heading text-[#590516]">
              {activeCategoryMeta ? activeCategoryMeta.title : 'Catálogo Referencial'}
            </h1>
            <p className="max-w-[700px] text-[16px] leading-[1.55] text-[#802348]">
              {activeCategoryMeta
                ? activeCategoryMeta.conversationalBody
                : 'Vestuario, calzado, textiles y accesorios. La disponibilidad y las reservas se confirman directamente con la tienda.'}
            </p>
          </div>

          <UnderlineLink
            href="#inicio"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('inicio');
            }}
          >
            ← Inicio
          </UnderlineLink>
        </div>

        <SectionDivider />

        {/* 2. Barra de Filtros con Botones Estilo Manual de Identidad Visual */}
        <div className="my-[28px] flex flex-col justify-between gap-[20px] sm:my-[36px] lg:flex-row lg:items-center">
          <div className="flex flex-wrap items-center gap-[12px]">
            <button
              type="button"
              onClick={() => onChangeCategoryFilter('all')}
              className={`font-arcifom cursor-pointer rounded-[14px] border-2 px-[20px] py-[11px] text-[15px] font-medium leading-none transition-colors ${
                activeCategoryFilter === 'all'
                  ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                  : 'border-[#A73668]/50 bg-[#FFFABB]/50 text-[#590516] hover:bg-[#E89BBD]/45'
              }`}
            >
              Todo ({GARMENT_CATALOG.length})
            </button>

            {CATEGORIES_DATA.map((cat) => {
              const count = GARMENT_CATALOG.filter((g) => g.category === cat.id).length;
              const isSelected = activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onChangeCategoryFilter(cat.id)}
                  className={`font-arcifom cursor-pointer rounded-[14px] border-2 px-[20px] py-[11px] text-[15px] font-medium leading-none transition-colors ${
                    isSelected
                      ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                      : 'border-[#A73668]/50 bg-[#FFFABB]/50 text-[#590516] hover:bg-[#E89BBD]/45'
                  }`}
                >
                  {cat.title} ({count})
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center gap-[12px]">
            <span className="font-arcifom text-[14px] font-medium text-[#802348]">
              Sucursal:
            </span>
            {(['all', 'Lenca', 'Puerto Montt'] as const).map((branch) => {
              const active = branchFilter === branch;
              const label = branch === 'all' ? 'Todas' : branch;
              return (
                <button
                  key={branch}
                  type="button"
                  onClick={() => setBranchFilter(branch)}
                  className={`font-arcifom cursor-pointer rounded-[12px] px-[16px] py-[9px] text-[14px] font-medium transition-colors ${
                    active
                      ? 'bg-[#A73668] text-[#FFFABB]'
                      : 'bg-[#E89BBD]/30 text-[#590516] hover:bg-[#E89BBD]/60'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>

        <SectionDivider className="mb-[52px] sm:mb-[68px]" />

        {/* 3. Grilla de Productos del Catálogo */}
        <div className="grid grid-cols-1 gap-x-[24px] gap-y-[56px] sm:grid-cols-2 sm:gap-x-[32px] sm:gap-y-[72px] md:grid-cols-3 xl:grid-cols-4">
          {filteredGarments.map((garment) => (
            <article
              key={garment.id}
              className="group flex flex-col justify-between"
            >
              <div>
                <div
                  onClick={() => onSelectGarment(garment)}
                  className="relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-[14px] bg-[#590516]"
                >
                  <img
                    src={garment.primaryImage}
                    alt={garment.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  <div className="absolute top-[12px] left-[12px] rounded-[8px] bg-[#590516]/90 px-[12px] py-[5px]">
                    <span className="font-arcifom text-[12px] font-medium text-[#FFFABB]">
                      {garment.branch}
                    </span>
                  </div>
                </div>

                <div
                  onClick={() => onSelectGarment(garment)}
                  className="mt-[20px] flex cursor-pointer flex-col gap-[8px] sm:mt-[24px]"
                >
                  <span className="font-arcifom text-[13px] font-medium text-[#A73668]">
                    {garment.categoryLabel} · Ref. {garment.refCode}
                  </span>
                  <h2 className="font-arcifom text-[16px] font-medium leading-[1.35] text-[#590516] group-hover:underline sm:text-[17px]">
                    {garment.name}
                  </h2>
                  <span className="text-[14px] text-[#802348]">
                    Talla: {garment.size} · {garment.condition}
                  </span>
                </div>
              </div>

              <div className="mt-[18px] flex items-center justify-between border-t border-dashed border-[#E89BBD] pt-[14px]">
                <span className="text-[13px] font-medium text-[#802348]">
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
                  className="font-arcifom cursor-pointer rounded-[10px] bg-[#A73668] px-[14px] py-[8px] text-[14px] font-medium text-[#FFFABB] transition-colors hover:bg-[#590516]"
                >
                  Consultar →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* 4. Pie de Catálogo */}
        <div className="mt-[80px] sm:mt-[104px]">
          <SectionDivider className="mb-[40px] sm:mb-[48px]" />

          <div className="flex flex-col items-center justify-between gap-[24px] text-center sm:flex-row sm:text-left">
            <span className="text-[15px] font-medium text-[#802348]">
              La disponibilidad, reservas y condiciones de compra se confirman directamente con la tienda.
            </span>

            <div className="flex flex-wrap items-center justify-center gap-[16px]">
              <PillButton
                onClick={() => onSelectCategoryForInquiry(inquiryCategoryTarget)}
              >
                {primaryCtaLabel}
              </PillButton>
              <GhostButton onClick={() => onNavigate('como-comprar')}>
                Cómo Comprar
              </GhostButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
