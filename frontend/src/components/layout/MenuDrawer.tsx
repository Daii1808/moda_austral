import { useState, useEffect } from 'react';
import type { CategoryFilter, PageRoute } from '@/types/product';
import { ModaAustralLogo, SectionDivider, PillButton } from '@/components/ui';

interface MenuDrawerProps {
  isOpen: boolean;
  currentPage: PageRoute;
  activeCategoryFilter: CategoryFilter;
  onClose: () => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

interface PrimaryNavItem {
  id: string;
  label: string;
  page: PageRoute;
  category?: CategoryFilter;
  previewImage: string;
  previewCaption: string;
  subItems?: { label: string; category: CategoryFilter }[];
}

const PRIMARY_MENU_ITEMS: PrimaryNavItem[] = [
  {
    id: 'inicio',
    label: 'INICIO',
    page: 'inicio',
    previewImage: '/images/hero-rack.jpg',
    previewCaption: 'UN NUEVO ENCUENTRO · COLECCIÓN 2026',
  },
  {
    id: 'catalogo',
    label: 'CATEGORÍAS',
    page: 'categorias',
    category: 'all',
    previewImage: '/images/vestuario-poleron.jpg',
    previewCaption: 'VESTUARIO, CALZADO Y TEXTILES REUTILIZADOS',
    subItems: [
      { label: 'VER TODO EL CATÁLOGO', category: 'all' },
      { label: 'VESTUARIO REUTILIZADO', category: 'vestuario' },
      { label: 'CALZADO REACONDICIONADO', category: 'calzado' },
      { label: 'TEXTILES & BOLSOS', category: 'textiles' },
    ],
  },
  {
    id: 'moda-circular',
    label: 'MODA CIRCULAR',
    page: 'moda-circular',
    previewImage: '/images/moda-circular-empaque.jpg',
    previewCaption: 'REUTILIZAR PRENDAS Y PROLONGAR SU USO',
  },
  {
    id: 'como-comprar',
    label: 'CÓMO COMPRAR',
    page: 'como-comprar',
    previewImage: '/images/etiqueta-prenda.jpg',
    previewCaption: '01 ELIGE · 02 CONSULTA · 03 ESPERA CONFIRMACIÓN · 04 COORDINA',
  },
  {
    id: 'sucursales',
    label: 'SUCURSALES',
    page: 'sucursales',
    previewImage: '/images/sucursal-lenca.jpg',
    previewCaption: 'LENCA (CASA MATRIZ) & PUERTO MONTT',
  },
  {
    id: 'preguntas-frecuentes',
    label: 'PREGUNTAS FRECUENTES',
    page: 'preguntas-frecuentes',
    previewImage: '/images/empaque-bolsa.jpg',
    previewCaption: 'STOCK REFERENCIAL, TALLAS, RESERVAS Y ENTREGAS',
  },
  {
    id: 'consulta',
    label: 'TU CONSULTA WHATSAPP',
    page: 'consulta',
    previewImage: '/images/empaque-sello.jpg',
    previewCaption: 'ATENCIÓN DIRECTA CON LA TIENDA',
  },
];

/**
 * Gucci-inspired Slide-Over Hamburger Navigation Drawer + Frame 09_Menu_Movil 1
 * Clean typography, zero nested cards, interactive category accordion,
 * rotating circular close button, and live editorial image preview on desktop.
 */
export function MenuDrawer({
  isOpen,
  currentPage,
  activeCategoryFilter,
  onClose,
  onNavigate,
}: MenuDrawerProps) {
  const [hoveredItem, setHoveredItem] = useState<PrimaryNavItem>(
    PRIMARY_MENU_ITEMS[0],
  );
  const [categoriesExpanded, setCategoriesExpanded] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (page: PageRoute, category?: CategoryFilter) => {
    onNavigate(page, category);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menú principal de Moda Austral"
      className="fixed inset-0 z-50 flex justify-end"
    >
      {/* Dark Burgundy Backdrop Overlay */}
      <div
        onClick={onClose}
        className="animate-fade-in fixed inset-0 bg-[#510f18]/65 backdrop-blur-xs"
      />

      {/* Slide-Over Panel (Gucci Split: Dark Burgundy Editorial Preview on lg + #f5ecda Cream Navigation Drawer on Right per PDF Page 15) */}
      <div className="animate-slide-in-right relative z-10 flex h-full w-full max-w-[1040px] border-l border-dashed border-cork-border bg-[#f5ecda]">
        {/* Left Editorial Preview Column (Visible on Desktop lg+ in Deep Burgundy #510f18) */}
        <div className="hidden w-[440px] flex-col justify-between border-r border-dashed border-[#de9fbd]/35 bg-[#510f18] p-[41px] text-[#f5ecda] lg:flex">
          <div>
            <span className="text-[10px] font-medium uppercase text-[#de9fbd]">
              MODA AUSTRAL · ARCHIVO VISUAL
            </span>
            <p className="mt-[8px] text-[12px] font-medium uppercase text-[#f5ecda]">
              {hoveredItem.previewCaption}
            </p>
          </div>

          <div className="my-[24px] aspect-[3/4] w-full overflow-hidden bg-[#9b4067]/30">
            <img
              key={hoveredItem.previewImage}
              src={hoveredItem.previewImage}
              alt={hoveredItem.label}
              className="animate-fade-in h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>

          <div className="flex flex-col gap-[6px]">
            <span className="text-[12px] font-medium uppercase text-[#f5ecda]">
              LENCA · CASA MATRIZ & PUERTO MONTT
            </span>
            <span className="type-legal text-[#de9fbd]">
              * VESTUARIO, CALZADO Y TEXTILES REUTILIZADOS
            </span>
          </div>
        </div>

        {/* Right Navigation Column (Main Hamburger Links matching Canva Prototype on PDF Page 15) */}
        <div className="flex flex-1 flex-col justify-between overflow-y-auto px-[24px] py-[24px] sm:px-[45px] sm:py-[31px]">
          {/* Drawer Header with MA Logo & Circular Close Button */}
          <div>
            <div className="flex items-center justify-between pb-[24px]">
              <ModaAustralLogo size="sm" />
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar menú"
                className="group flex h-[41px] w-[41px] cursor-pointer items-center justify-center rounded-full bg-[#510f18] text-[#f5ecda] transition-all duration-300 hover:rotate-90 hover:bg-[#9b4067]"
              >
                <span className="text-[14px] leading-none">✕</span>
              </button>
            </div>
            <SectionDivider />
          </div>

          {/* Primary Navigation List — Borderless, Expansive Typography */}
          <nav aria-label="Secciones de la tienda" className="my-[31px] flex flex-col gap-[18px]">
            {PRIMARY_MENU_ITEMS.map((item) => {
              const isCurrent = currentPage === item.page;
              const hasSubItems = Boolean(item.subItems);

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItem(item)}
                  className="flex flex-col"
                >
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => handleSelect(item.page, item.category)}
                      className={`group flex cursor-pointer items-center gap-[12px] text-left transition-colors ${
                        isCurrent ? 'text-ember-accent' : 'text-warm-cream'
                      }`}
                    >
                      <span className="type-heading-sm transition-transform duration-300 group-hover:translate-x-[8px]">
                        {item.label}
                      </span>
                    </button>

                    {hasSubItems && (
                      <button
                        type="button"
                        onClick={() => setCategoriesExpanded((prev) => !prev)}
                        aria-label="Alternar subcategorías"
                        className="cursor-pointer px-[12px] py-[4px] text-[14px] font-medium uppercase text-warm-cream"
                      >
                        {categoriesExpanded ? '−' : '+'}
                      </button>
                    )}
                  </div>

                  {/* Expandable Sub-Categories for Store Catalog */}
                  {hasSubItems && categoriesExpanded && (
                    <div className="mt-[12px] ml-[18px] flex flex-col gap-[10px] border-l border-dashed border-cork-border pl-[18px]">
                      {item.subItems?.map((sub) => {
                        const isSubActive =
                          currentPage === 'categorias' &&
                          activeCategoryFilter === sub.category;
                        return (
                          <button
                            key={sub.category}
                            type="button"
                            onClick={() => handleSelect('categorias', sub.category)}
                            className={`cursor-pointer text-left text-[12px] font-medium uppercase transition-colors ${
                              isSubActive
                                ? 'text-ember-accent'
                                : 'text-warm-cream/75 hover:text-warm-cream'
                            }`}
                          >
                            {sub.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Bottom Actions & Quick Footer from Figma 09_Menu_Movil 1 */}
          <div>
            <SectionDivider className="mb-[24px]" />
            <div className="flex flex-wrap items-center justify-between gap-[18px]">
              <PillButton onClick={() => handleSelect('consulta')}>
                CONSULTAR A LA TIENDA
              </PillButton>

              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer border-b border-warm-cream pb-[4px] text-[12px] font-medium uppercase text-warm-cream"
              >
                CERRAR MENÚ
              </button>
            </div>

            <div className="mt-[24px] flex flex-wrap items-center justify-between gap-[12px] text-[12px] font-medium uppercase text-warm-cream/75">
              <span>MODA AUSTRAL · MODA CIRCULAR</span>
              <div className="flex items-center gap-[12px]">
                <button
                  type="button"
                  onClick={() => handleSelect('inicio')}
                  className="cursor-pointer hover:text-warm-cream"
                >
                  INICIO
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => handleSelect('sucursales')}
                  className="cursor-pointer hover:text-warm-cream"
                >
                  SUCURSALES
                </button>
                <span>|</span>
                <button
                  type="button"
                  onClick={() => handleSelect('consulta')}
                  className="cursor-pointer hover:text-warm-cream"
                >
                  CONSULTA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
