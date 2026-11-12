import type { BranchId, CategoryFilter, PageRoute } from '@/types/product';
import { BRANCHES_DATA, STORE_CONTACT } from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface BranchesSectionProps {
  onSelectBranchForInquiry: (branch: BranchId) => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Dedicated Sucursales Page — Spacious boutique locator (Lenca & Puerto Montt)
 * Uses exclusive store photographs (`ma-12.jpg` for Lenca, `ma-07.jpg` for Puerto Montt).
 */
export function BranchesSection({
  onSelectBranchForInquiry,
  onNavigate,
}: BranchesSectionProps) {
  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[40px] flex flex-wrap items-end justify-between gap-[16px] sm:mb-[52px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              TIENDAS FÍSICAS · {STORE_CONTACT.instagramHandle}
            </span>
            <h1 className="type-heading text-warm-cream">SUCURSALES</h1>
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

        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        {/* 2-Column Visual Storefront Grid with Exclusive Photo Per Branch */}
        <div className="grid grid-cols-1 gap-[56px] lg:grid-cols-2 lg:gap-[48px]">
          {BRANCHES_DATA.map((branch) => (
            <article key={branch.id} className="flex flex-col">
              <div className="aspect-[16/10] w-full overflow-hidden bg-bark-brown">
                <img
                  src={branch.imageUrl}
                  alt={branch.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              <div className="mt-[28px] flex flex-col gap-[12px] sm:mt-[32px]">
                <span className="text-[11px] font-medium uppercase text-ember-accent">
                  {branch.statusNote}
                </span>
                <h2 className="type-heading-sm text-warm-cream">{branch.name}</h2>

                <div className="mt-[8px] flex flex-col gap-[8px] border-y border-dashed border-cork-border py-[18px]">
                  <span className="text-[14px] font-medium uppercase text-warm-cream">
                    {branch.address}
                  </span>
                  <span className="text-[12px] font-medium uppercase text-driftwood">
                    {branch.schedule}
                  </span>
                  <span className="text-[12px] font-medium uppercase text-ember-accent">
                    WHATSAPP TIENDA: {STORE_CONTACT.whatsappDisplay}
                  </span>
                </div>

                <div className="mt-[12px] flex flex-wrap items-center gap-[18px]">
                  <a
                    href={branch.mapQueryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-[22.5px] border border-warm-cream bg-transparent px-[18px] py-[8px] text-[12px] font-medium uppercase leading-none text-warm-cream transition-opacity hover:opacity-80"
                  >
                    VER EN MAPA ↗
                  </a>

                  <UnderlineLink
                    href="#consulta"
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectBranchForInquiry(branch.id);
                    }}
                  >
                    CONSULTAR {branch.id.toUpperCase()} →
                  </UnderlineLink>
                </div>
              </div>
            </article>
          ))}
        </div>

        <SectionDivider className="my-[64px] sm:my-[88px]" />

        <div className="flex flex-col items-center justify-between gap-[24px] text-center sm:flex-row sm:text-left">
          <span className="text-[13px] font-medium uppercase text-warm-cream">
            CONFIRMA EN QUÉ SUCURSAL ESTÁ LA PRENDA ANTES DE VIAJAR.
          </span>

          <div className="flex flex-wrap items-center justify-center gap-[16px]">
            <PillButton onClick={() => onNavigate('consulta')}>
              CONSULTAR A LA TIENDA
            </PillButton>
            <GhostButton onClick={() => onNavigate('categorias', 'all')}>
              VER CATÁLOGO
            </GhostButton>
          </div>
        </div>
      </div>
    </div>
  );
}
