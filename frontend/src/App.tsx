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

export function App() {
  const [currentPage, setCurrentPage] = useState<PageRoute>('inicio');
  const [activeCategoryFilter, setActiveCategoryFilter] =
    useState<CategoryFilter>('all');
  const [selectedGarment, setSelectedGarment] = useState<GarmentItem>(
    GARMENT_CATALOG[0],
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Interactive Consultation State (Frame 08_Preparar_Consulta 1)
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

  // Sync with browser back/forward navigation
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

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
