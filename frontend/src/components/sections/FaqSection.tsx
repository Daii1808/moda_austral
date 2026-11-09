import { useState } from 'react';
import type { CategoryFilter, PageRoute } from '@/types/product';
import { FAQ_ITEMS } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface FaqSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Preguntas Frecuentes Page — Spacious accordion with generous air
 */
export function FaqSection({ onNavigate }: FaqSectionProps) {
  const [expandedId, setExpandedId] = useState<string | null>('stock');

  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[44px] flex flex-wrap items-end justify-between gap-[16px] sm:mb-[56px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              AYUDA RÁPIDA
            </span>
            <h1 className="type-heading text-warm-cream">
              PREGUNTAS FRECUENTES
            </h1>
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

        <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-12 lg:gap-[64px]">
          {/* Left: Visual Image + Direct CTA with generous separation */}
          <div className="flex flex-col items-start gap-[28px] lg:col-span-5">
            <div className="aspect-[16/10] w-full overflow-hidden bg-bark-brown">
              <img
                src="/images/empaque-bolsa.jpg"
                alt="Empaque Moda Austral"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-wrap items-center gap-[16px]">
              <PillButton onClick={() => onNavigate('consulta')}>
                CONSULTAR POR WHATSAPP
              </PillButton>
              <GhostButton onClick={() => onNavigate('como-comprar')}>
                CÓMO COMPRAR
              </GhostButton>
            </div>
          </div>

          {/* Right: Spacious 4-Item Accordion */}
          <div className="flex flex-col lg:col-span-7">
            <SectionDivider />
            {FAQ_ITEMS.map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div
                  key={item.id}
                  className="border-b border-dashed border-cork-border py-[28px] sm:py-[32px]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpandedId((prev) => (prev === item.id ? null : item.id))
                    }
                    className="flex w-full cursor-pointer items-center justify-between gap-[20px] text-left"
                  >
                    <div className="flex flex-col gap-[8px]">
                      <h2 className="text-[16px] font-medium uppercase text-warm-cream sm:text-[18px]">
                        {item.question}
                      </h2>
                      <span className="text-[12px] font-medium uppercase text-ember-accent">
                        {item.shortAnswer}
                      </span>
                    </div>
                    <span className="text-[24px] font-medium leading-none text-warm-cream">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {isExpanded && (
                    <p className="mt-[16px] text-[15px] leading-[1.6] text-warm-cream/85 animate-fade-in">
                      {item.detailedAnswer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
