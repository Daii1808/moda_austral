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
 * - Left: Search (icon-only on mobile, "BUSCAR" on desktop) + desktop category links
 * - Center: MODA AUSTRAL wordmark (starts in center of hero -> docks cleanly in header center without overlapping icons)
 * - Right: Hamburger Menu (icon-only on mobile without "MENÚ" text; "MENÚ" label only on sm+)
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
      <div className="relative flex h-[64px] sm:h-[68px] w-full items-center justify-between px-[16px] sm:px-[31px] lg:px-[45px]">
        {/* Left: Search Button (Lupita) + Quick Boutique Links on Desktop */}
        <div
          className={`z-10 flex items-center gap-[20px] transition-colors duration-500 ${
            isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar prendas"
            className="flex h-[38px] w-[38px] sm:w-auto cursor-pointer items-center justify-start gap-[8px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75"
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
            className={`hidden items-center gap-[18px] transition-opacity duration-500 xl:flex ${
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
          </div>
        </div>

        {/* Center: Scroll-Docking MODA AUSTRAL Wordmark (Centered with ample room on mobile & desktop) */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className={`absolute left-1/2 -translate-x-1/2 flex cursor-pointer items-center gap-[8px] sm:gap-[10px] whitespace-nowrap font-medium uppercase leading-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHeroTop
              ? 'translate-y-[28vh] sm:translate-y-[31vh] text-[16px] sm:text-[20px] scale-[1.85] sm:scale-[3.5] lg:scale-[5.0] text-[#de9fbd]'
              : 'translate-y-0 scale-100 text-[14px] sm:text-[19px] text-[#510f18]'
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

        {/* Right: Consultation link (Desktop only) + Hamburger Icon (Icon-only on mobile, + "MENÚ" on sm+) */}
        <div
          className={`z-10 flex items-center gap-[16px] sm:gap-[24px] transition-colors duration-500 ${
            isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
          }`}
        >
          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className="hidden md:flex cursor-pointer items-center gap-[6px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75"
          >
            <span>TU CONSULTA</span>
            {selectedReference && (
              <span className="rounded-full bg-[#9b4067] px-[8px] py-[3px] text-[10px] text-[#f5ecda]">
                1
              </span>
            )}
          </button>

          {/* Hamburger Button — Only the icon on mobile, no "MENÚ" text crowding the header */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú principal"
            className="group flex h-[38px] w-[38px] sm:w-auto cursor-pointer items-center justify-end gap-[10px] text-[12px] font-medium uppercase leading-none"
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
