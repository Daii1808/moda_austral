import { useState } from 'react';
import type {
  CategoryFilter,
  CategoryId,
  GarmentItem,
  PageRoute,
} from '@/types/product';
import { GARMENT_CATALOG } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface ProductDetailSectionProps {
  garment: GarmentItem;
  onSelectGarment: (garment: GarmentItem) => void;
  onInquireGarment: (category: CategoryId, refString: string, branch: 'Lenca' | 'Puerto Montt') => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Product Detail Page (PDP) — Spacious Gucci.com product sheet
 */
export function ProductDetailSection({
  garment,
  onSelectGarment,
  onInquireGarment,
  onNavigate,
}: ProductDetailSectionProps) {
  const [activeImage, setActiveImage] = useState<string>(garment.primaryImage);

  const displayImage = garment.galleryImages.includes(activeImage)
    ? activeImage
    : garment.primaryImage;

  const relatedGarments = GARMENT_CATALOG.filter(
    (item) => item.id !== garment.id,
  ).slice(0, 4);

  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        {/* Top Breadcrumb */}
        <div className="mb-[32px] flex flex-wrap items-center justify-between gap-[14px]">
          <div className="flex flex-wrap items-center gap-[12px]">
            <UnderlineLink
              href="#categorias"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('categorias', 'all');
              }}
            >
              ← CATÁLOGO
            </UnderlineLink>
            <span className="text-[12px] text-cork-border">/</span>
            <UnderlineLink
              href={`#${garment.category}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate('categorias', garment.category);
              }}
            >
              {garment.categoryLabel}
            </UnderlineLink>
            <span className="text-[12px] text-cork-border">/</span>
            <span className="text-[12px] font-medium uppercase text-ember-accent">
              {garment.refCode}
            </span>
          </div>
        </div>

        <SectionDivider className="mb-[48px] sm:mb-[64px]" />

        {/* Main Split PDP Layout with Generous Gap */}
        <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-12 lg:gap-[64px]">
          {/* Left: Editorial Image Gallery */}
          <div className="flex flex-col gap-[20px] lg:col-span-7">
            <div className="aspect-[4/5] w-full overflow-hidden bg-bark-brown">
              <img
                key={displayImage}
                src={displayImage}
                alt={garment.name}
                className="animate-fade-in h-full w-full object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-[20px]">
              {garment.galleryImages.map((imgUrl, idx) => {
                const isSelected = displayImage === imgUrl;
                return (
                  <button
                    key={imgUrl}
                    type="button"
                    onClick={() => setActiveImage(imgUrl)}
                    className={`cursor-pointer overflow-hidden border transition-opacity ${
                      isSelected
                        ? 'border-warm-cream opacity-100'
                        : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${garment.name} vista ${idx + 1}`}
                      className="aspect-[4/5] w-full object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Clean Scannable Product Info with Breathing Room */}
          <div className="flex flex-col items-start gap-[24px] lg:sticky lg:top-[112px] lg:col-span-5">
            <div className="flex w-full items-center justify-between">
              <span className="text-[11px] font-medium uppercase text-ember-accent">
                REF. {garment.refCode} · {garment.branch.toUpperCase()}
              </span>
              <span className="text-[22px] font-medium uppercase text-warm-cream">
                {garment.price}
              </span>
            </div>

            <h1 className="type-heading-sm text-warm-cream">{garment.name}</h1>

            <p className="text-[15px] leading-[1.6] text-warm-cream/90">
              {garment.conversationalDescription}
            </p>

            <SectionDivider className="my-[8px]" />

            {/* Concise 4-Row Spec List */}
            <div className="flex w-full flex-col gap-[16px]">
              <div className="flex items-center justify-between border-b border-dashed border-cork-border pb-[12px]">
                <span className="text-[11px] font-medium uppercase text-driftwood">
                  TALLA
                </span>
                <span className="text-[13px] font-medium uppercase text-warm-cream">
                  {garment.size}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-dashed border-cork-border pb-[12px]">
                <span className="text-[11px] font-medium uppercase text-driftwood">
                  MEDIDAS
                </span>
                <span className="text-[13px] font-medium uppercase text-warm-cream">
                  {garment.measurements}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-dashed border-cork-border pb-[12px]">
                <span className="text-[11px] font-medium uppercase text-driftwood">
                  ESTADO
                </span>
                <span className="text-[13px] font-medium uppercase text-ember-accent">
                  {garment.condition}
                </span>
              </div>

              <div className="flex items-center justify-between pb-[4px]">
                <span className="text-[11px] font-medium uppercase text-driftwood">
                  SUCURSAL
                </span>
                <span className="text-[13px] font-medium uppercase text-warm-cream">
                  {garment.branch.toUpperCase()}
                </span>
              </div>
            </div>

            <SectionDivider className="my-[8px]" />

            <div className="flex w-full flex-col gap-[16px] sm:flex-row sm:items-center">
              <PillButton
                onClick={() =>
                  onInquireGarment(
                    garment.category,
                    `${garment.refCode} — ${garment.name} (Talla ${garment.size})`,
                    garment.branch,
                  )
                }
                className="w-full sm:w-auto"
              >
                CONSULTAR EN WHATSAPP
              </PillButton>

              <GhostButton onClick={() => onNavigate('como-comprar')}>
                CÓMO COMPRAR
              </GhostButton>
            </div>
          </div>
        </div>

        {/* Related Pieces with Generous Space */}
        <div className="mt-[88px] sm:mt-[112px]">
          <SectionDivider className="mb-[48px] sm:mb-[60px]" />
          <h2 className="mb-[36px] text-[15px] font-medium uppercase text-warm-cream sm:mb-[44px]">
            TAMBIÉN TE PUEDE INTERESAR
          </h2>
          <div className="grid grid-cols-2 gap-x-[24px] gap-y-[48px] sm:gap-x-[32px] lg:grid-cols-4">
            {relatedGarments.map((item) => (
              <article
                key={item.id}
                onClick={() => {
                  onSelectGarment(item);
                  setActiveImage(item.primaryImage);
                }}
                className="group flex cursor-pointer flex-col"
              >
                <div className="aspect-[3/4] w-full overflow-hidden bg-bark-brown">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-[18px] flex flex-col gap-[6px] sm:mt-[22px]">
                  <span className="text-[13px] font-medium uppercase leading-[1.3] text-warm-cream group-hover:underline">
                    {item.name}
                  </span>
                  <span className="text-[12px] font-medium uppercase text-driftwood">
                    {item.price} · TALLA {item.size}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
