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
 * Top Search Drawer Overlay — Instant catalog filtering (No sale prices, pure reference catalog)
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
          item.conversationalDescription.toLowerCase().includes(normalized) ||
          item.refCode.toLowerCase().includes(normalized) ||
          item.categoryLabel.toLowerCase().includes(normalized) ||
          item.branch.toLowerCase().includes(normalized),
      )
    : GARMENT_CATALOG.slice(0, 4);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Buscador de catálogo Moda Austral"
      className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-walnut-shadow/95 px-[24px] py-[31px] backdrop-blur-md sm:px-[56px] animate-fade-in"
    >
      <div className="mx-auto w-full max-w-[1280px]">
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

        <div className="my-[18px]">
          <UnderlineInput
            autoFocus
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="BUSCAR POR PRENDA, CATEGORÍA O SUCURSAL (EJ: VESTIDOS, BOTÍN, CROCHET, PERFUMERÍA)..."
            className="py-[12px] text-[16px] sm:text-[22px]"
          />
        </div>

        <div className="mt-[18px] flex flex-wrap items-center gap-[14px]">
          <span className="text-[10px] font-medium uppercase text-driftwood">
            EXPLORAR CATEGORÍAS:
          </span>
          {(['vestuario', 'calzado', 'textiles', 'accesorios'] as const).map((cat) => (
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
        </div>

        <SectionDivider className="my-[36px]" />

        <div>
          <span className="text-[12px] font-medium uppercase text-warm-cream/80">
            {normalized
              ? `RESULTADOS EN EL CATÁLOGO (${results.length})`
              : 'EJEMPLOS DESTACADOS DEL CATÁLOGO'}
          </span>

          <div className="mt-[28px] grid grid-cols-2 gap-x-[24px] gap-y-[36px] md:grid-cols-4">
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
                <div className="mt-[16px] flex flex-col gap-[6px]">
                  <span className="text-[10px] font-medium uppercase text-ember-accent">
                    {item.categoryLabel} · {item.branch.toUpperCase()}
                  </span>
                  <span className="text-[13px] font-medium uppercase leading-[1.3] text-warm-cream group-hover:underline">
                    {item.name}
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
