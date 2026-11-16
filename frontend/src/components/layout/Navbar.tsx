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
 * Header Oficial Moda Austral — Basado en el Manual de Identidad Visual
 * - En portada sin scroll: muestra "moda austral" en minúsculas con tipografía Arcifom y color Rosa Pastel (#E89BBD) tal como en la Página 1 del Manual.
 * - Al bajar o cambiar de sección: se acopla con el Isotipo MA y "Moda Austral" en la barra superior.
 * - Botón "Consultar" SIEMPRE visible (móvil y escritorio) con el estilo gráfico de bloque redondeado del Manual.
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
          ? 'border-b border-transparent bg-gradient-to-b from-[#590516]/85 to-transparent py-[6px]'
          : 'translate-y-0 border-b border-dashed border-[#E89BBD] bg-[#F6EBD7]/98 py-0 backdrop-blur-md'
      }`}
    >
      <div className="relative flex h-[68px] w-full items-center justify-between px-[14px] sm:h-[74px] sm:px-[31px] lg:px-[45px]">
        {/* Izquierda: Buscador + Enlaces de Categorías en Escritorio */}
        <div
          className={`z-10 flex items-center gap-[16px] font-arcifom transition-colors duration-500 ${
            isHeroTop ? 'text-[#F6EBD7]' : 'text-[#590516]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar en el catálogo"
            className={`flex h-[42px] cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[12px] text-[14px] font-medium leading-none transition-colors ${
              isHeroTop
                ? 'bg-[#590516]/60 text-[#F6EBD7] hover:bg-[#A73668]'
                : 'bg-[#E89BBD]/30 text-[#590516] hover:bg-[#E89BBD]/60'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-4-4" />
            </svg>
            <span className="hidden md:inline">Buscar</span>
          </button>

          <div
            className={`hidden items-center gap-[14px] transition-opacity duration-500 xl:flex ${
              isHeroTop ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            {(
              [
                { id: 'vestuario', label: 'Vestuario' },
                { id: 'calzado', label: 'Calzado' },
                { id: 'textiles', label: 'Textiles' },
                { id: 'accesorios', label: 'Accesorios' },
              ] as const
            ).map((cat) => {
              const active =
                currentPage === 'categorias' && activeCategoryFilter === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onNavigate('categorias', cat.id)}
                  className={`cursor-pointer rounded-[10px] px-[10px] py-[6px] text-[14px] font-medium leading-none transition-colors ${
                    active
                      ? 'bg-[#A73668] text-[#FFFABB]'
                      : 'text-[#590516] hover:bg-[#E89BBD]/35'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Centro: Título "moda austral" (Tipografía Oficial Arcifom - Página 1 del Manual) que baja al hacer scroll */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          className={`font-arcifom absolute left-1/2 flex -translate-x-1/2 cursor-pointer items-center gap-[8px] whitespace-nowrap leading-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:gap-[10px] ${
            isHeroTop
              ? 'translate-y-[26vh] scale-[2.1] text-[20px] font-normal tracking-[0.01em] text-[#E89BBD] sm:translate-y-[29vh] sm:scale-[3.6] sm:text-[24px] lg:scale-[4.8]'
              : 'translate-y-0 scale-100 text-[17px] font-medium text-[#590516] sm:text-[21px]'
          }`}
        >
          {isHeroTop ? (
            <span className="lowercase text-[#E89BBD]">moda austral</span>
          ) : (
            <ModaAustralLogo showWordmark={true} size="sm" />
          )}
        </button>

        {/* Derecha: Botón "Consultar" SIEMPRE Visible + Menú Principal */}
        <div className="z-10 flex items-center gap-[10px] sm:gap-[14px]">
          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className={`font-arcifom flex h-[42px] cursor-pointer items-center gap-[6px] rounded-[12px] px-[14px] text-[14px] font-medium leading-none transition-colors sm:px-[18px] sm:text-[15px] ${
              currentPage === 'consulta'
                ? 'bg-[#590516] text-[#FFFABB]'
                : isHeroTop
                  ? 'bg-[#FFFABB] text-[#590516] hover:bg-[#E89BBD]'
                  : 'bg-[#A73668] text-[#FFFABB] hover:bg-[#590516]'
            }`}
          >
            <span>Consultar</span>
            {selectedReference && (
              <span className="rounded-full bg-[#590516] px-[7px] py-[2px] text-[11px] text-[#FFFABB]">
                1
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú principal"
            className={`font-arcifom group flex h-[42px] cursor-pointer items-center justify-center gap-[8px] rounded-[12px] px-[12px] text-[14px] font-medium leading-none transition-colors ${
              isHeroTop
                ? 'bg-[#590516]/60 text-[#F6EBD7] hover:bg-[#A73668]'
                : 'bg-[#E89BBD]/30 text-[#590516] hover:bg-[#E89BBD]/60'
            }`}
          >
            <span className="flex flex-col items-end gap-[5px]">
              <span
                className={`block h-[2.5px] w-[20px] rounded-full transition-transform duration-300 group-hover:translate-x-[2px] ${
                  isHeroTop ? 'bg-[#F6EBD7]' : 'bg-[#590516]'
                }`}
              />
              <span
                className={`block h-[2.5px] w-[20px] rounded-full transition-transform duration-300 group-hover:-translate-x-[2px] ${
                  isHeroTop ? 'bg-[#F6EBD7]' : 'bg-[#590516]'
                }`}
              />
              <span
                className={`block h-[2.5px] w-[14px] rounded-full transition-all duration-300 group-hover:w-[20px] ${
                  isHeroTop ? 'bg-[#E89BBD]' : 'bg-[#A73668]'
                }`}
              />
            </span>
            <span className="hidden sm:inline">Menú</span>
          </button>
        </div>
      </div>
    </header>
  );
}
