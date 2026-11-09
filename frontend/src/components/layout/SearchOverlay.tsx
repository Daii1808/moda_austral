import { useState, useEffect } from 'react';
import type { CategoryFilter, GarmentItem, PageRoute } from '@/types/product';
import { GARMENT_CATALOG } from '@/data/products';
import { UnderlineInput, SectionDivider } from '@/components/ui';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGarment: (garment: GarmentItem) => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

/**
 * Gucci-inspired Top Search Drawer Overlay
 * Instant filtering by garment name, category, branch, or reference code (e.g. LEN-0042).
 */
export function SearchOverlay({
  isOpen,
  onClose,
  onSelectGarment,
  onNavigate,
}: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalized = query.trim().toLowerCase();
  const results = normalized
    ? GARMENT_CATALOG.filter(
        (item) =>
          item.name.toLowerCase().includes(normalized) ||
          item.refCode.toLowerCase().includes(normalized) ||
          item.categoryLabel.toLowerCase().includes(normalized) ||
          item.branch.toLowerCase().includes(normalized),
      )
    : GARMENT_CATALOG.slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscador de prendas Moda Austral"
      className="fixed inset-0 z-50 flex flex-col bg-walnut-shadow/95 backdrop-blur-md px-[18px] py-[24px] sm:px-[45px] animate-fade-in overflow-y-auto"
    >
      <div className="mx-auto w-full max-w-[1280px]">
        {/* Header */}
        <div className="flex items-center justify-between pb-[24px]">
          <span className="text-[12px] font-medium uppercase text-ember-accent">
            BUSCADOR DE CATÁLOGO · MODA AUSTRAL
          </span>
          <button
            type="button"
            onClick={onClose}
            className="cursor-pointer text-[12px] font-medium uppercase text-warm-cream hover:opacity-75"
          >
            CERRAR ✕
          </button>
        </div>

        {/* Underline Search Input per docs/DESIGN.md */}
        <div className="my-[18px]">
          <UnderlineInput
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BUSCAR POR PRENDA, CATEGORÍA, SUCURSAL O CÓDIGO (EJ: LEN-0042, ABRIGO, BOTÍN)..."
            className="py-[12px] text-[18px] sm:text-[24px]"
          />
        </div>

        {/* Quick Trending Searches */}
        <div className="mt-[18px] flex flex-wrap items-center gap-[14px]">
          <span className="text-[10px] font-medium uppercase text-driftwood">
            BÚSQUEDAS RÁPIDAS:
          </span>
          {(['vestuario', 'calzado', 'textiles'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => {
                onNavigate('categorias', cat);
                onClose();
              }}
              className="cursor-pointer border-b border-dashed border-cork-border pb-[2px] text-[12px] font-medium uppercase text-warm-cream hover:border-warm-cream"
            >
              {cat.toUpperCase()}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setQuery('LEN-0042')}
            className="cursor-pointer border-b border-dashed border-cork-border pb-[2px] text-[12px] font-medium uppercase text-ember-accent"
          >
            REF. LEN-0042
          </button>
        </div>

        <SectionDivider className="my-[31px]" />

        {/* Live Product Grid Results */}
        <div>
          <span className="text-[12px] font-medium uppercase text-warm-cream/80">
            {normalized
              ? `RESULTADOS ENCONTRADOS (${results.length})`
              : 'PIEZAS DESTACADAS DEL ARCHIVO'}
          </span>

          <div className="mt-[24px] grid grid-cols-2 gap-[18px] md:grid-cols-4">
            {results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  onSelectGarment(item);
                  onClose();
                }}
                className="group flex cursor-pointer flex-col text-left"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-bark-brown">
                  <img
                    src={item.primaryImage}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-[12px] flex flex-col gap-[4px]">
                  <span className="text-[10px] font-medium uppercase text-ember-accent">
                    REF. {item.refCode} · {item.branch.toUpperCase()}
                  </span>
                  <span className="text-[14px] font-medium uppercase text-warm-cream">
                    {item.name}
                  </span>
                  <span className="text-[12px] font-medium uppercase text-warm-cream/75">
                    TALLA {item.size} · {item.price}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
