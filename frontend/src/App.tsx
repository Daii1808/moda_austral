import { useState, useCallback, useEffect } from 'react';
import type {
  BranchId,
  CategoryFilter,
  CategoryId,
  GarmentItem,
  PageRoute,
} from '@/types/product';
import { GARMENT_CATALOG } from '@/data/products';
import { Navbar } from '@/components/layout/Navbar';
import { MenuDrawer } from '@/components/layout/MenuDrawer';
import { SearchOverlay } from '@/components/layout/SearchOverlay';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { CategoriesSection } from '@/components/sections/CategoriesSection';
import { ProductDetailSection } from '@/components/sections/ProductDetailSection';
import { CircularFashionSection } from '@/components/sections/CircularFashionSection';
import { HowToBuySection } from '@/components/sections/HowToBuySection';
import { BranchesSection } from '@/components/sections/BranchesSection';
import { FaqSection } from '@/components/sections/FaqSection';
import { ConsultationSection } from '@/components/sections/ConsultationSection';

const VALID_PAGES: PageRoute[] = [
  'inicio',
  'categorias',
  'prenda',
  'moda-circular',
  'como-comprar',
  'sucursales',
  'preguntas-frecuentes',
  'consulta',
];

const PAGE_SEO: Record<PageRoute, { title: string; description: string }> = {
  inicio: {
    title: 'Moda Austral — Catálogo Digital de Moda Circular en Lenca y Puerto Montt',
    description:
      'Moda Austral ofrece vestuario, calzado, textiles a crochet y accesorios reutilizados a precios accesibles en Lenca y Puerto Montt. Explora el catálogo digital y consulta disponibilidad por WhatsApp.',
  },
  categorias: {
    title: 'Catálogo por Categorías — Moda Austral (Vestuario, Calzado, Textiles y Accesorios)',
    description:
      'Explora nuestro catálogo referencial de vestuario de verano, jeans, calzado en cuero, cárdigans tejidos a crochet, mochilas, perfumería y accesorios en Lenca y Puerto Montt.',
  },
  prenda: {
    title: 'Ficha Referencial de Producto — Moda Austral',
    description:
      'Revisa los detalles de talla, estado y sucursal de referencia en Moda Austral y consulta disponibilidad directa por WhatsApp.',
  },
  'moda-circular': {
    title: 'Moda Circular y Reutilización — Moda Austral',
    description:
      'Conoce nuestra propuesta de moda circular en Lenca y Puerto Montt: prendas seleccionadas con segunda vida, precios accesibles y atención cercana.',
  },
  'como-comprar': {
    title: 'Cómo Comprar en 4 Pasos — Moda Austral',
    description:
      'Aprende cómo explorar el catálogo digital de Moda Austral, elegir tu prenda de referencia y confirmar disponibilidad por WhatsApp en Lenca o Puerto Montt.',
  },
  sucursales: {
    title: 'Sucursales en Lenca y Puerto Montt — Moda Austral',
    description:
      'Direcciones, horarios de atención y ubicación en mapa de nuestras tiendas Moda Austral en Lenca (Carretera Austral) y Puerto Montt.',
  },
  'preguntas-frecuentes': {
    title: 'Preguntas Frecuentes — Moda Austral',
    description:
      'Resuelve tus dudas sobre stock de prendas únicas, consultas por WhatsApp, categorías disponibles y sucursales de Moda Austral.',
  },
  consulta: {
    title: 'Consultar Disponibilidad por WhatsApp — Moda Austral',
    description:
      'Prepara y envía tu consulta de disponibilidad a Moda Austral (+56 9 4470 4389) eligiendo categoría, sucursal (Lenca o Puerto Montt) y prenda de interés.',
  },
};

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('inicio');
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<CategoryFilter>('all');
  const [selectedGarment, setSelectedGarment] = useState<GarmentItem>(
    GARMENT_CATALOG[0],
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Estado interactivo de Consultas
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryId>('vestuario');
  const [selectedBranch, setSelectedBranch] = useState<BranchId>('Lenca');
  const [selectedReference, setSelectedReference] = useState<string>('');

  const handleNavigate = useCallback(
    (page: PageRoute, category?: CategoryFilter) => {
      setCurrentPage(page);
      if (category !== undefined) {
        setActiveCategoryFilter(category);
      }
      window.history.pushState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  const handleSelectGarment = useCallback((garment: GarmentItem) => {
    setSelectedGarment(garment);
    setCurrentPage('prenda');
    window.history.pushState(null, '', `#prenda`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectCategoryForInquiry = useCallback(
    (category: CategoryId, sampleRef?: string) => {
      setSelectedCategory(category);
      if (sampleRef !== undefined) {
        setSelectedReference(sampleRef);
      }
      setCurrentPage('consulta');
      window.history.pushState(null, '', `#consulta`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  const handleInquireGarment = useCallback(
    (
      category: CategoryId,
      refString: string,
      branch: 'Lenca' | 'Puerto Montt',
    ) => {
      setSelectedCategory(category);
      setSelectedReference(refString);
      setSelectedBranch(branch);
      setCurrentPage('consulta');
      window.history.pushState(null, '', `#consulta`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    [],
  );

  const handleSelectBranchForInquiry = useCallback((branch: BranchId) => {
    setSelectedBranch(branch);
    setCurrentPage('consulta');
    window.history.pushState(null, '', `#consulta`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Sincronización con botón Atrás/Adelante del navegador
  useEffect(() => {
    const syncFromHash = () => {
      const rawHash = window.location.hash.replace('#', '') as PageRoute;
      if (VALID_PAGES.includes(rawHash)) {
        setCurrentPage(rawHash);
      }
    };
    syncFromHash();
    window.addEventListener('popstate', syncFromHash);
    return () => window.removeEventListener('popstate', syncFromHash);
  }, []);

  // Actualización dinámica de título y metadescripción SEO por vista
  useEffect(() => {
    const seo = PAGE_SEO[currentPage] ?? PAGE_SEO.inicio;
    document.title = seo.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', seo.description);
    }
  }, [currentPage]);

  return (
    <div className="min-h-screen w-screen bg-walnut-shadow text-warm-cream">
      <Navbar
        currentPage={currentPage}
        activeCategoryFilter={activeCategoryFilter}
        selectedReference={selectedReference}
        onNavigate={handleNavigate}
        onOpenMenu={() => setIsMenuOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <MenuDrawer
        isOpen={isMenuOpen}
        currentPage={currentPage}
        activeCategoryFilter={activeCategoryFilter}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectGarment={handleSelectGarment}
        onNavigate={handleNavigate}
      />

      <main className="min-h-screen">
        {currentPage === 'inicio' && (
          <HeroSection
            onNavigate={handleNavigate}
            onSelectGarment={handleSelectGarment}
          />
        )}

        {currentPage === 'categorias' && (
          <CategoriesSection
            activeCategoryFilter={activeCategoryFilter}
            onChangeCategoryFilter={setActiveCategoryFilter}
            onSelectGarment={handleSelectGarment}
            onSelectCategoryForInquiry={handleSelectCategoryForInquiry}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'prenda' && (
          <ProductDetailSection
            garment={selectedGarment}
            onSelectGarment={handleSelectGarment}
            onInquireGarment={handleInquireGarment}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'moda-circular' && (
          <CircularFashionSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'como-comprar' && (
          <HowToBuySection onNavigate={handleNavigate} />
        )}

        {currentPage === 'sucursales' && (
          <BranchesSection
            onSelectBranchForInquiry={handleSelectBranchForInquiry}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'preguntas-frecuentes' && (
          <FaqSection onNavigate={handleNavigate} />
        )}

        {currentPage === 'consulta' && (
          <ConsultationSection
            selectedCategory={selectedCategory}
            selectedBranch={selectedBranch}
            selectedReference={selectedReference}
            onChangeCategory={setSelectedCategory}
            onChangeBranch={setSelectedBranch}
            onChangeReference={setSelectedReference}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Botón Flotante de Consulta Directa — Siempre visible y accesible cuando no se está en la vista de Consulta */}
      {currentPage !== 'consulta' && (
        <div className="fixed right-[18px] bottom-[20px] z-30 sm:right-[32px] sm:bottom-[28px]">
          <button
            type="button"
            onClick={() => handleNavigate('consulta')}
            aria-label="Ir a apartado de consultas por WhatsApp"
            className="font-arcifom flex cursor-pointer items-center gap-[10px] rounded-[14px] border-2 border-[#FFFABB] bg-[#590516] px-[20px] py-[14px] text-[15px] sm:text-[16px] font-medium text-[#FFFABB] transition-colors duration-200 hover:bg-[#A73668]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
            <span>¿Dudas o stock? Consultar</span>
          </button>
        </div>
      )}

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
