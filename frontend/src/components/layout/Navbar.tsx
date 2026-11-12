import { useState, useEffect } from 'react';
import type { CategoryFilter, PageRoute } from '@/types/product';
import { ModaAustralLogo } from '@/components/ui';

interface NavbarProps {
  currentPage: PageRoute;
  activeCategoryFilter: CategoryFilter;
  selectedReference: string;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
}

/**
 * Gucci-inspired Scroll-Reactive Sticky Header + Balanced Mobile Layout
 * - Left: Search (icon-only on mobile, "BUSCAR" on desktop) + 4 catalog categories on xl+
 * - Center: MODA AUSTRAL wordmark (starts in center of hero -> docks cleanly in header center with MA logo)
 * - Right: Hamburger Menu (icon-only on mobile without "MENÚ" text; "MENÚ" label on sm+)
 */
export function Navbar({
  currentPage,
  activeCategoryFilter,
  selectedReference,
  onNavigate,
  onOpenMenu,
  onOpenSearch,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 36);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const isHeroTop = currentPage === 'inicio' && !isScrolled;

  return (
    <header
      className={`fixed top-0 left-0 z-40 w-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isHeroTop
          ? 'border-b border-transparent bg-gradient-to-b from-[#510f18]/80 to-transparent py-[4px]'
          : 'translate-y-0 border-b border-dashed border-cork-border bg-[#f5ecda]/98 py-0 backdrop-blur-md'
      }`}
    >
      <div className="relative flex h-[64px] w-full items-center justify-between px-[16px] sm:h-[68px] sm:px-[31px] lg:px-[45px]">
        {/* Left: Search Button (Lupita) + Quick Catalog Category Links on Desktop */}
        <div
          className={`z-10 flex items-center gap-[18px] transition-colors duration-500 ${
            isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar en el catálogo"
            className="flex h-[38px] w-[38px] cursor-pointer items-center justify-start gap-[8px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75 sm:w-auto"
          >
            <svg
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <span className="hidden md:inline">BUSCAR</span>
          </button>

          <div
            className={`hidden items-center gap-[16px] transition-opacity duration-500 xl:flex ${
              isHeroTop ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'vestuario')}
              className={`cursor-pointer pb-[2px] text-[12px] font-medium uppercase leading-none transition-colors ${
                currentPage === 'categorias' && activeCategoryFilter === 'vestuario'
                  ? 'border-b border-dashed border-[#9b4067] text-[#9b4067]'
                  : 'border-b border-transparent text-[#510f18]/80 hover:border-[#510f18] hover:text-[#510f18]'
              }`}
            >
              VESTUARIO
            </button>
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'calzado')}
              className={`cursor-pointer pb-[2px] text-[12px] font-medium uppercase leading-none transition-colors ${
                currentPage === 'categorias' && activeCategoryFilter === 'calzado'
                  ? 'border-b border-dashed border-[#9b4067] text-[#9b4067]'
                  : 'border-b border-transparent text-[#510f18]/80 hover:border-[#510f18] hover:text-[#510f18]'
              }`}
            >
              CALZADO
            </button>
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'textiles')}
              className={`cursor-pointer pb-[2px] text-[12px] font-medium uppercase leading-none transition-colors ${
                currentPage === 'categorias' && activeCategoryFilter === 'textiles'
                  ? 'border-b border-dashed border-[#9b4067] text-[#9b4067]'
                  : 'border-b border-transparent text-[#510f18]/80 hover:border-[#510f18] hover:text-[#510f18]'
              }`}
            >
              TEXTILES
            </button>
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'accesorios')}
              className={`cursor-pointer pb-[2px] text-[12px] font-medium uppercase leading-none transition-colors ${
                currentPage === 'categorias' && activeCategoryFilter === 'accesorios'
                  ? 'border-b border-dashed border-[#9b4067] text-[#9b4067]'
                  : 'border-b border-transparent text-[#510f18]/80 hover:border-[#510f18] hover:text-[#510f18]'
              }`}
            >
              ACCESORIOS
            </button>
          </div>
        </div>

        {/* Center: Scroll-Docking MODA AUSTRAL Wordmark */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className={`absolute left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-[8px] whitespace-nowrap font-medium uppercase leading-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-[10px] ${
            isHeroTop
              ? 'translate-y-[28vh] scale-[1.85] text-[16px] text-[#de9fbd] sm:translate-y-[31vh] sm:scale-[3.5] sm:text-[20px] lg:scale-[5.0]'
              : 'translate-y-0 scale-100 text-[14px] text-[#510f18] sm:text-[19px]'
          }`}
        >
          <span
            className={`transition-all duration-500 ${
              isHeroTop ? 'hidden w-0 opacity-0' : 'inline-flex opacity-100'
            }`}
          >
            <ModaAustralLogo showWordmark={false} size="sm" />
          </span>
          <span>MODA AUSTRAL</span>
        </button>

        {/* Right: Consultation link (Desktop) + Hamburger Icon (Icon-only on mobile) */}
        <div
          className={`z-10 flex items-center gap-[16px] transition-colors duration-500 sm:gap-[24px] ${
            isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className="hidden cursor-pointer items-center gap-[6px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75 md:flex"
          >
            <span>TU CONSULTA</span>
            {selectedReference && (
              <span className="rounded-full bg-[#9b4067] px-[8px] py-[3px] text-[10px] text-[#f5ecda]">
                1
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú principal"
            className="group flex h-[38px] w-[38px] cursor-pointer items-center justify-end gap-[10px] text-[12px] font-medium uppercase leading-none sm:w-auto"
          >
            <span className="flex flex-col items-end gap-[5px]">
              <span
                className={`block h-[2px] w-[20px] rounded-full transition-transform duration-300 group-hover:translate-x-[2px] ${
                  isHeroTop ? 'bg-[#f5ecda]' : 'bg-[#510f18]'
                }`}
              />
              <span
                className={`block h-[2px] w-[20px] rounded-full transition-transform duration-300 group-hover:-translate-x-[2px] ${
                  isHeroTop ? 'bg-[#f5ecda]' : 'bg-[#510f18]'
                }`}
              />
              <span
                className={`block h-[2px] w-[14px] rounded-full transition-all duration-300 group-hover:w-[20px] ${
                  isHeroTop ? 'bg-[#de9fbd]' : 'bg-[#9b4067]'
                }`}
              />
            </span>
            <span className="hidden sm:inline">MENÚ</span>
          </button>
        </div>
      </div>
    </header>
  );
}
