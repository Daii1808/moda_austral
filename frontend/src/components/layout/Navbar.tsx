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
 * Gucci-inspired Scroll-Reactive Sticky Header + Animated Hero Wordmark
 * - At scrollY === 0 on 'inicio': transparent header over hero photo, and the
 *   MODA AUSTRAL wordmark sits large over the hero in Rosa Austral (#de9fbd).
 * - On scroll down (or on interior pages): the header bar slides/solidifies in
 *   Marfil (#f5ecda) and the MODA AUSTRAL wordmark shrinks and docks into the center
 *   of the sticky header as it accompanies the user down the page.
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
          ? 'border-b border-transparent bg-gradient-to-b from-[#510f18]/80 to-transparent py-[6px]'
          : 'translate-y-0 border-b border-dashed border-cork-border bg-[#f5ecda]/98 py-0 backdrop-blur-md'
      }`}
    >
      <div className="relative flex h-[68px] w-full items-center justify-between px-[18px] sm:px-[31px] lg:px-[45px]">
        {/* Left: Gucci-style "+ Contactar" + Quick Boutique Links on Desktop */}
        <div className="z-10 flex items-center gap-[20px]">
          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className={`group flex cursor-pointer items-center gap-[8px] text-[12px] font-medium uppercase leading-none transition-colors duration-500 ${
              isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
            }`}
          >
            <span
              className={`transition-transform duration-300 group-hover:rotate-90 ${
                isHeroTop ? 'text-[#de9fbd]' : 'text-[#9b4067]'
              }`}
            >
              +
            </span>
            <span className="border-b border-transparent pb-[2px] transition-colors group-hover:border-current">
              CONTACTAR
            </span>
          </button>

          <div
            className={`hidden items-center gap-[18px] transition-opacity duration-500 xl:flex ${
              isHeroTop ? 'opacity-0 pointer-events-none' : 'opacity-100'
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

        {/* Center: Gucci Scroll-Docking Wordmark (Starts in the Center of the Hero Banner -> Shrinks into Sticky Header on Scroll) */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className={`absolute left-1/2 -translate-x-1/2 flex cursor-pointer items-center gap-[10px] whitespace-nowrap text-[16px] sm:text-[20px] font-medium uppercase leading-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHeroTop
              ? 'translate-y-[28vh] sm:translate-y-[31vh] scale-[2.4] sm:scale-[3.8] lg:scale-[5.2] text-[#de9fbd]'
              : 'translate-y-0 scale-100 text-[#510f18]'
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

        {/* Right: Search, Consultation Bag Indicator, and Hamburger Menu Trigger */}
        <div
          className={`z-10 flex items-center gap-[18px] sm:gap-[24px] transition-colors duration-500 ${
            isHeroTop ? 'text-[#f5ecda]' : 'text-[#510f18]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar prendas"
            className="flex cursor-pointer items-center gap-[6px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75"
          >
            <svg
              width="14"
              height="14"
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

          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className="flex cursor-pointer items-center gap-[6px] text-[12px] font-medium uppercase leading-none transition-opacity hover:opacity-75"
          >
            <span className="hidden sm:inline">TU CONSULTA</span>
            {selectedReference && (
              <span className="rounded-full bg-[#9b4067] px-[8px] py-[3px] text-[10px] text-[#f5ecda]">
                1
              </span>
            )}
          </button>

          {/* Gucci + Canva Prototype Hamburger Button */}
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú principal"
            className="group flex cursor-pointer items-center gap-[10px] text-[12px] font-medium uppercase leading-none"
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-[2px] w-[18px] transition-transform duration-300 group-hover:translate-x-[2px] ${
                  isHeroTop ? 'bg-[#f5ecda]' : 'bg-[#510f18]'
                }`}
              />
              <span
                className={`block h-[2px] w-[18px] transition-transform duration-300 group-hover:-translate-x-[2px] ${
                  isHeroTop ? 'bg-[#f5ecda]' : 'bg-[#510f18]'
                }`}
              />
              <span
                className={`block h-[2px] w-[12px] transition-all duration-300 group-hover:w-[18px] ${
                  isHeroTop ? 'bg-[#de9fbd]' : 'bg-[#9b4067]'
                }`}
              />
            </span>
            <span>MENÚ</span>
          </button>
        </div>
      </div>
    </header>
  );
}
