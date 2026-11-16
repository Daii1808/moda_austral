import { useState, useEffect } from 'react';
import type { CategoryFilter, PageRoute } from '@/types/product';
import { ModaAustralLogo, ModaAustralWordmarkSvg } from '@/components/ui';

interface NavbarProps {
  currentPage: PageRoute;
  activeCategoryFilter: CategoryFilter;
  selectedReference: string;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
  onOpenMenu: () => void;
  onOpenSearch: () => void;
}

/**
 * Header Oficial Moda Austral con Animación de Scrolleo Fluida (Sin Temblor)
 * - Utiliza el vector exacto de "Nombre moda austral.svg" (ModaAustralWordmarkSvg) tanto en el centro del
 *   banner de inicio como arriba en el header al hacer scroll.
 * - En lugar de escalar texto HTML con scale() (que hacía temblar las letras), anima el ancho vectorial (width)
 *   y translate-y del SVG para un movimiento fluido y 100% nítido.
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
      className={`fixed top-0 left-0 z-40 w-full transition-colors duration-500 ${
        isHeroTop
          ? 'border-b border-transparent bg-gradient-to-b from-black/30 to-transparent py-[6px]'
          : 'border-b border-dashed border-[#E89BBD] bg-[#F6EBD7]/98 py-0 backdrop-blur-md'
      }`}
    >
      <div className="relative flex h-[68px] w-full items-center justify-between px-[14px] sm:h-[74px] sm:px-[31px] lg:px-[45px]">
        {/* Izquierda: Buscador + Enlaces de Categorías en Escritorio */}
        <div
          className={`z-10 flex items-center gap-[16px] font-arcifom transition-colors duration-300 ${
            isHeroTop ? 'text-[#F6EBD7]' : 'text-[#590516]'
          }`}
        >
          <button
            type="button"
            onClick={onOpenSearch}
            aria-label="Buscar en el catálogo"
            className="flex h-[40px] cursor-pointer items-center justify-start gap-[8px] text-[14px] font-medium leading-none transition-opacity hover:opacity-75"
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
            className={`hidden items-center gap-[18px] transition-opacity duration-300 xl:flex ${
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
                  className={`cursor-pointer pb-[2px] text-[14px] font-medium leading-none transition-colors ${
                    active
                      ? 'border-b border-dashed border-[#A73668] text-[#A73668]'
                      : 'border-b border-transparent text-[#590516]/85 hover:border-[#590516] hover:text-[#590516]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Centro: SVG Oficial "Nombre moda austral.svg" con animación de scrolleo desde el centro del Hero al Header */}
        <button
          type="button"
          onClick={() => onNavigate('inicio')}
          aria-label="Ir al inicio de Moda Austral"
          className={`pointer-events-auto absolute left-1/2 flex -translate-x-1/2 cursor-pointer items-center justify-center gap-[10px] transition-[transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isHeroTop
              ? 'translate-y-[31vh] sm:translate-y-[33vh]'
              : 'translate-y-0'
          }`}
        >
          <span
            className={`transition-opacity duration-500 ${
              isHeroTop ? 'hidden w-0 opacity-0' : 'inline-flex opacity-100'
            }`}
          >
            <ModaAustralLogo showWordmark={false} size="sm" />
          </span>

          <ModaAustralWordmarkSvg
            fill={isHeroTop ? '#e89bbd' : '#590516'}
            className={`h-auto transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isHeroTop
                ? 'w-[78vw] max-w-[760px]'
                : 'w-[128px] sm:w-[154px]'
            }`}
          />
        </button>

        {/* Derecha: Botón "Consultar" Visible + Menú Principal */}
        <div className="z-10 flex items-center gap-[10px] sm:gap-[16px]">
          <button
            type="button"
            onClick={() => onNavigate('consulta')}
            className={`font-arcifom flex h-[38px] cursor-pointer items-center gap-[6px] rounded-[14px] px-[14px] text-[13px] font-medium leading-none transition-colors sm:px-[18px] sm:text-[14px] ${
              currentPage === 'consulta'
                ? 'bg-[#590516] text-[#FFFABB]'
                : isHeroTop
                  ? 'bg-[#E89BBD] text-[#590516] hover:bg-[#FFFABB]'
                  : 'bg-[#A73668] text-[#FFFABB] hover:bg-[#590516]'
            }`}
          >
            <span>Consultar</span>
            {selectedReference && (
              <span className="rounded-full bg-[#590516] px-[6px] py-[2px] text-[10px] text-[#FFFABB]">
                1
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Abrir menú principal"
            className={`font-arcifom group flex h-[38px] w-[38px] cursor-pointer items-center justify-end gap-[8px] text-[14px] font-medium leading-none sm:w-auto ${
              isHeroTop ? 'text-[#F6EBD7]' : 'text-[#590516]'
            }`}
          >
            <span className="flex flex-col items-end gap-[5px]">
              <span
                className={`block h-[2px] w-[20px] rounded-full transition-transform duration-300 group-hover:translate-x-[2px] ${
                  isHeroTop ? 'bg-[#F6EBD7]' : 'bg-[#590516]'
                }`}
              />
              <span
                className={`block h-[2px] w-[20px] rounded-full transition-transform duration-300 group-hover:-translate-x-[2px] ${
                  isHeroTop ? 'bg-[#F6EBD7]' : 'bg-[#590516]'
                }`}
              />
              <span
                className={`block h-[2px] w-[14px] rounded-full transition-all duration-300 group-hover:w-[20px] ${
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
