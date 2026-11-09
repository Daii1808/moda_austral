import type { CategoryFilter, PageRoute } from '@/types/product';
import { HOW_TO_BUY_STEPS } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface HowToBuySectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Cómo Comprar Page — Spacious 4-step guide
 */
export function HowToBuySection({ onNavigate }: HowToBuySectionProps) {
  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[40px] flex flex-wrap items-end justify-between gap-[16px] sm:mb-[52px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              COMPRA EN 4 PASOS
            </span>
            <h1 className="type-heading text-warm-cream">CÓMO COMPRAR</h1>
          </div>
          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
          >
            ← CATÁLOGO
          </UnderlineLink>
        </div>

        <SectionDivider className="mb-[24px]" />

        {/* 4 Spacious Steps */}
        <div className="flex flex-col">
          {HOW_TO_BUY_STEPS.map((step) => (
            <div
              key={step.number}
              className="grid grid-cols-1 items-center gap-[16px] border-b border-dashed border-cork-border py-[36px] sm:py-[44px] md:grid-cols-12"
            >
              <div className="md:col-span-5">
                <h2 className="type-heading-sm text-warm-cream">{step.title}</h2>
              </div>

              <div className="md:col-span-5">
                <p className="text-[16px] leading-[1.55] text-warm-cream/90">
                  {step.description}
                </p>
              </div>

              <div className="md:col-span-2 md:text-right">
                <span className="text-[11px] font-medium uppercase text-ember-accent">
                  {step.highlightNote}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Spacious Notice & CTA */}
        <div className="mt-[56px] flex flex-col items-center justify-between gap-[24px] text-center sm:mt-[72px] sm:flex-row sm:text-left">
          <span className="text-[13px] font-medium uppercase text-warm-cream">
            EL MENSAJE NO RESERVA AUTOMÁTICAMENTE LA PRENDA.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-[16px]">
            <PillButton onClick={() => onNavigate('consulta')}>
              INICIAR CONSULTA
            </PillButton>
            <GhostButton onClick={() => onNavigate('preguntas-frecuentes')}>
              PREGUNTAS FRECUENTES
            </GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}
