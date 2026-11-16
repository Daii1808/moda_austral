import type { CategoryFilter, GarmentItem, PageRoute } from '@/types/product';
import {
  CATEGORIES_DATA,
  EXCLUSIVE_SECTION_IMAGES,
  GARMENT_CATALOG,
} from '@/data/products';
import { GhostButton, PillButton, SectionDivider, UnderlineLink } from '@/components/ui';

interface HeroSectionProps {
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
  onSelectGarment: (garment: GarmentItem) => void;
}

/**
 * Página de Inicio — Portada con viñeta en negro atenuada, título vectorial "moda austral"
 * que sube al header al hacer scroll, cuerpos en Acumin Variable Concept Light y cero tarjetas anidadas.
 */
export function HeroSection({
  onNavigate,
  onSelectGarment,
}: HeroSectionProps) {
  const featuredGarments = GARMENT_CATALOG.filter((item) => item.featured).slice(0, 4);

  return (
    <div className="w-screen bg-[#F6EBD7]">
      {/* 1. Portada Oficial Manual de Identidad Visual: Viñeta negra suave y atenuada */}
      <section className="relative flex min-h-screen w-screen flex-col justify-between overflow-hidden bg-black px-[24px] pt-[96px] pb-[64px] sm:px-[56px] sm:pb-[80px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={EXCLUSIVE_SECTION_IMAGES.heroBanner}
            alt="Interior de tienda Moda Austral en Lenca y Puerto Montt"
            className="h-full w-full object-cover"
          />
          {/* Viñeta en negro muy suave y atenuada para que la foto respire como en el Manual */}
          <div className="absolute inset-0 bg-black/18" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.34)_100%)]" />
        </div>

        {/* Espacio superior para el SVG "moda austral" centrado que sube al header al hacer scroll */}
        <div className="relative z-10 pt-[84px]" aria-hidden="true" />

        {/* Bloque Inferior de Portada */}
        <div className="relative z-10 mx-auto flex w-full max-w-[760px] flex-col items-center gap-[16px] text-center">
          <p className="font-acumin max-w-[600px] text-[17px] sm:text-[20px] font-light leading-[1.45] text-[#F6EBD7]">
            Catálogo Digital · Vestuario, calzado, textiles y accesorios reutilizados en Lenca y Puerto Montt
          </p>

          <div className="mt-[12px] flex flex-wrap items-center justify-center gap-[16px]">
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'all')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] bg-[#E89BBD] px-[28px] py-[15px] text-[15px] font-medium leading-none text-[#590516] transition-colors duration-200 hover:bg-[#FFFABB]"
            >
              Ver Catálogo
            </button>

            <button
              type="button"
              onClick={() => onNavigate('consulta')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] bg-[#FFFABB] px-[28px] py-[15px] text-[15px] font-medium leading-none text-[#590516] transition-colors duration-200 hover:bg-[#E89BBD]"
            >
              Consultar Disponibilidad
            </button>

            <button
              type="button"
              onClick={() => onNavigate('como-comprar')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] border border-[#F6EBD7] bg-black/25 px-[24px] py-[14px] text-[15px] font-medium leading-none text-[#F6EBD7] transition-colors duration-200 hover:bg-[#A73668] hover:border-[#A73668]"
            >
              Cómo Comprar
            </button>
          </div>
        </div>
      </section>

      {/* 2. Las 4 Categorías del Catálogo + Banner Moda Circular (Sin tarjetas anidadas) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[80px] sm:px-[56px] sm:py-[112px]">
        <div className="mb-[48px] flex flex-col items-center justify-between gap-[16px] text-center sm:mb-[64px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="font-arcifom text-[13px] font-medium uppercase tracking-wider text-[#A73668]">
              Guía de Categorías
            </span>
            <h2 className="type-heading text-[#590516]">Catálogo por Categoría</h2>
          </div>
          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
          >
            Ver todo el catálogo →
          </UnderlineLink>
        </div>

        <div className="grid grid-cols-1 gap-[28px] sm:gap-[36px] md:grid-cols-2">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('categorias', cat.id)}
              className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-black p-[32px] text-center sm:p-[48px]"
            >
              <img
                src={cat.imageUrl}
                alt={cat.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-[12px]">
                <span className="font-acumin text-[13px] font-light tracking-wider text-[#FFFABB]">
                  {cat.badgeText}
                </span>
                <h3 className="type-heading text-[#F6EBD7]">{cat.title}</h3>
                <span className="font-arcifom border-b border-[#F6EBD7] pb-[4px] text-[14px] font-medium text-[#F6EBD7]">
                  Explorar categoría →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Editorial: Moda Circular */}
        <div
          onClick={() => onNavigate('moda-circular')}
          className="group relative mt-[28px] flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-end overflow-hidden bg-black p-[36px] text-center sm:mt-[36px] sm:min-h-[400px] sm:p-[56px]"
        >
          <img
            src={EXCLUSIVE_SECTION_IMAGES.circularBanner}
            alt="Moda Circular Moda Austral"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-[14px]">
            <span className="font-acumin text-[13px] font-light tracking-wider text-[#FFFABB]">
              Identidad Reutilizable · Sur de Chile
            </span>
            <h3 className="type-heading text-[#F6EBD7]">Moda Circular</h3>
            <p className="font-acumin text-[16px] font-light leading-[1.55] text-[#F6EBD7]/95">
              Ropa seleccionada con segunda vida y enfoque sustentable. Revisa qué puedes encontrar antes de visitar o escribirnos.
            </p>
            <span className="font-arcifom mt-[4px] border-b border-[#F6EBD7] pb-[4px] text-[14px] font-medium text-[#F6EBD7]">
              Conocer Moda Circular →
            </span>
          </div>
        </div>
      </section>

      {/* 3. Muestra del Catálogo Referencial (Sin tarjetas anidadas) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[96px]">
        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        <div className="mb-[48px] flex flex-col items-center justify-between gap-[20px] text-center sm:mb-[60px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="font-arcifom text-[13px] font-medium uppercase tracking-wider text-[#A73668]">
              Ejemplos Referenciales · Sin Stock Garantizado
            </span>
            <h2 className="type-heading text-[#590516]">
              Muestra del Catálogo
            </h2>
          </div>
          <GhostButton onClick={() => onNavigate('categorias', 'all')}>
            Ver Catálogo Completo
          </GhostButton>
        </div>

        <div className="grid grid-cols-1 gap-x-[24px] gap-y-[52px] sm:grid-cols-2 sm:gap-x-[32px] sm:gap-y-[68px] lg:grid-cols-4">
          {featuredGarments.map((garment) => (
            <article
              key={garment.id}
              onClick={() => onSelectGarment(garment)}
              className="group flex cursor-pointer flex-col"
            >
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#590516]">
                <img
                  src={garment.primaryImage}
                  alt={garment.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-[12px] left-[12px] bg-[#590516]/90 px-[10px] py-[4px]">
                  <span className="font-acumin text-[11px] font-light uppercase text-[#FFFABB]">
                    {garment.branch}
                  </span>
                </div>
              </div>

              <div className="mt-[20px] flex flex-col gap-[8px] sm:mt-[24px]">
                <span className="font-acumin text-[12px] font-light uppercase text-[#A73668]">
                  {garment.categoryLabel}
                </span>
                <h3 className="font-arcifom text-[16px] font-medium leading-[1.35] text-[#590516] group-hover:underline sm:text-[17px]">
                  {garment.name}
                </h3>
                <div className="flex items-center justify-between pt-[4px]">
                  <span className="font-acumin text-[13px] font-light text-[#802348]">
                    {garment.availabilityNote}
                  </span>
                  <span className="font-arcifom text-[13px] font-medium text-[#590516] group-hover:text-[#A73668]">
                    Ver ficha →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Barra de Accesos Rápidos (Consultas, Cómo Comprar y Sucursales) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[96px]">
        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        <div className="grid grid-cols-1 gap-[36px] md:grid-cols-3 md:gap-[32px]">
          <div className="flex flex-col items-center justify-between gap-[18px] border-b border-dashed border-[#E89BBD] pb-[28px] text-center md:items-start md:border-b-0 md:pb-0 md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[13px] font-medium uppercase text-[#A73668]">
                Atención Cercana
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Consultar Disponibilidad
              </h3>
              <p className="font-acumin text-[16px] font-light text-[#802348]">
                Pregunta por tallas o prendas directamente en nuestro WhatsApp.
              </p>
            </div>
            <PillButton onClick={() => onNavigate('consulta')}>
              Ir a Consultas →
            </PillButton>
          </div>

          <div className="flex flex-col items-center justify-between gap-[18px] border-b border-dashed border-[#E89BBD] pb-[28px] text-center md:items-start md:border-b-0 md:pb-0 md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[13px] font-medium uppercase text-[#A73668]">
                Paso a Paso
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Cómo Comprar
              </h3>
              <p className="font-acumin text-[16px] font-light text-[#802348]">
                Revisa cómo elegir tu referencia y coordinar tu visita.
              </p>
            </div>
            <GhostButton onClick={() => onNavigate('como-comprar')}>
              Cómo Comprar
            </GhostButton>
          </div>

          <div className="flex flex-col items-center justify-between gap-[18px] text-center md:items-start md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[13px] font-medium uppercase text-[#A73668]">
                Lenca y Puerto Montt
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Sucursales
              </h3>
              <p className="font-acumin text-[16px] font-light text-[#802348]">
                Conoce nuestras ubicaciones, horarios y mapa de llegada.
              </p>
            </div>
            <GhostButton onClick={() => onNavigate('sucursales')}>
              Sucursales
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}
