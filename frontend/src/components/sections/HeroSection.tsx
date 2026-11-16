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
 * Página de Inicio — Basada estrictamente en el Manual de Identidad Visual de Moda Austral:
 * - Portada (Pág. 1 y 19): Fondo ma-03.jpg con "moda austral" en tipografía Arcifom y color Rosa pastel (#E89BBD).
 * - Propuesta de valor y Personalidad de marca (Pág. 4 y 6): Etiquetas gráficas en Mantequilla (#FFFABB),
 *   Fucsia (#A73668), Burdeo (#590516) y Beige (#F6EBD7).
 * - Botones de interacción redondeados (rounded-[14px]) con tipografía oficial Arcifom y acceso directo a Consultas.
 */
export function HeroSection({
  onNavigate,
  onSelectGarment,
}: HeroSectionProps) {
  const featuredGarments = GARMENT_CATALOG.filter((item) => item.featured).slice(0, 4);

  return (
    <div className="w-screen bg-[#F6EBD7]">
      {/* 1. Portada Oficial Manual de Identidad Visual (Pág. 1) */}
      <section className="relative flex min-h-screen w-screen flex-col justify-between overflow-hidden bg-[#590516] px-[24px] pt-[96px] pb-[64px] sm:px-[56px] sm:pb-[80px]">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={EXCLUSIVE_SECTION_IMAGES.heroBanner}
            alt="Interior de tienda Moda Austral en Lenca y Puerto Montt"
            className="animate-hero-zoom h-full w-full object-cover opacity-65 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#590516]/65 via-[#590516]/35 to-[#590516]/90" />
        </div>

        {/* Espacio superior para el título "moda austral" en Arcifom que baja desde el Navbar */}
        <div className="relative z-10 pt-[84px]" aria-hidden="true" />

        {/* Bloque Inferior de Portada — Tipografía Arcifom y Botones del Manual de Identidad Visual */}
        <div className="relative z-10 mx-auto flex w-full max-w-[820px] flex-col items-center gap-[18px] text-center animate-fade-up">
          <span className="font-arcifom inline-block rounded-[10px] bg-[#A73668] px-[16px] py-[7px] text-[14px] font-medium tracking-[0.03em] text-[#FFFABB]">
            Catálogo Digital · Lenca y Puerto Montt
          </span>

          <p className="font-arcifom max-w-[640px] text-[18px] sm:text-[22px] font-normal leading-[1.4] text-[#F6EBD7]">
            Vestuario, calzado, textiles y accesorios reutilizados a precios accesibles con atención cercana.
          </p>

          {/* Botones de Interacción con el Estilo Gráfico del Manual (Pág. 6 y 11) */}
          <div className="mt-[10px] flex flex-wrap items-center justify-center gap-[16px]">
            <button
              type="button"
              onClick={() => onNavigate('categorias', 'all')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] bg-[#E89BBD] px-[28px] py-[16px] text-[16px] font-medium leading-none text-[#590516] transition-colors duration-200 hover:bg-[#FFFABB]"
            >
              Ver Catálogo
            </button>

            <button
              type="button"
              onClick={() => onNavigate('consulta')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] bg-[#FFFABB] px-[28px] py-[16px] text-[16px] font-medium leading-none text-[#590516] transition-colors duration-200 hover:bg-[#E89BBD]"
            >
              Consultar Disponibilidad
            </button>

            <button
              type="button"
              onClick={() => onNavigate('como-comprar')}
              className="font-arcifom inline-flex cursor-pointer items-center justify-center rounded-[14px] border-2 border-[#F6EBD7] bg-[#590516]/50 px-[24px] py-[14px] text-[15px] font-medium leading-none text-[#F6EBD7] transition-colors duration-200 hover:bg-[#A73668] hover:border-[#A73668]"
            >
              Cómo Comprar
            </button>
          </div>
        </div>
      </section>

      {/* 2. Propuesta de Valor y Personalidad de Marca (Páginas 4 y 6 del Manual de Identidad Visual) */}
      <section className="w-full bg-[#E89BBD]/30 px-[24px] py-[56px] sm:px-[56px] sm:py-[72px]">
        <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-[36px] lg:grid-cols-12">
          <div className="flex flex-col gap-[14px] lg:col-span-7">
            <div className="border-l-2 border-[#A73668] pl-[16px]">
              <h2 className="font-arcifom text-[28px] sm:text-[36px] font-medium leading-[1.1] text-[#A73668]">
                Propuesta <span className="font-normal text-[#590516]/80">de valor</span>
              </h2>
            </div>
            <p className="text-[17px] sm:text-[18px] leading-[1.6] text-[#590516]">
              <strong>Moda Austral</strong> ofrece la oportunidad de encontrar vestuario, calzado y textiles reutilizados a precios accesibles, combinando variedad de piezas únicas con una atención cercana en <strong>Lenca y Puerto Montt</strong>.
            </p>
          </div>

          {/* Etiquetas Gráficas Oficiales de Personalidad de Marca (Página 6 del Manual) */}
          <div className="flex flex-wrap items-center justify-center gap-[12px] lg:col-span-5 lg:justify-end">
            <span className="font-arcifom -rotate-2 rounded-[12px] bg-[#FFFABB] px-[22px] py-[12px] text-[16px] font-medium text-[#A73668]">
              Cercana
            </span>
            <span className="font-arcifom rotate-1 rounded-[12px] bg-[#A73668] px-[22px] py-[12px] text-[16px] font-medium text-[#F6EBD7]">
              Transparente
            </span>
            <span className="font-arcifom -rotate-1 rounded-[12px] bg-[#590516] px-[22px] py-[12px] text-[16px] font-medium text-[#F6EBD7]">
              Práctica
            </span>
            <span className="font-arcifom rotate-2 rounded-[12px] border border-[#A73668]/30 bg-[#F6EBD7] px-[22px] py-[12px] text-[16px] font-medium text-[#A73668]">
              Confiable
            </span>
          </div>
        </div>
      </section>

      {/* 3. Las 4 Categorías del Catálogo + Banner Moda Circular */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[80px] sm:px-[56px] sm:py-[104px]">
        <div className="mb-[48px] flex flex-col items-center justify-between gap-[16px] text-center sm:mb-[60px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
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

        {/* Grilla 2x2 de las 4 Categorías con botones estilo Manual de Identidad */}
        <div className="grid grid-cols-1 gap-[28px] sm:gap-[36px] md:grid-cols-2">
          {CATEGORIES_DATA.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('categorias', cat.id)}
              className="group relative flex aspect-[4/5] w-full cursor-pointer flex-col items-center justify-end overflow-hidden rounded-[18px] bg-[#590516] p-[32px] text-center sm:p-[48px]"
            >
              <img
                src={cat.imageUrl}
                alt={cat.imageAlt}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#590516]/92 via-[#590516]/25 to-transparent" />
              <div className="relative z-10 flex flex-col items-center gap-[14px]">
                <span className="font-arcifom rounded-[10px] bg-[#A73668] px-[14px] py-[5px] text-[13px] font-medium text-[#FFFABB]">
                  {cat.badgeText}
                </span>
                <h3 className="type-heading text-[#F6EBD7]">{cat.title}</h3>
                <span className="font-arcifom inline-flex items-center justify-center rounded-[12px] bg-[#FFFABB] px-[20px] py-[10px] text-[14px] font-medium text-[#590516] transition-colors group-hover:bg-[#E89BBD]">
                  Explorar categoría →
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Banner Editorial: Moda Circular */}
        <div
          onClick={() => onNavigate('moda-circular')}
          className="group relative mt-[28px] flex min-h-[320px] w-full cursor-pointer flex-col items-center justify-end overflow-hidden rounded-[18px] bg-[#A73668] p-[36px] text-center sm:mt-[36px] sm:min-h-[400px] sm:p-[56px]"
        >
          <img
            src={EXCLUSIVE_SECTION_IMAGES.circularBanner}
            alt="Moda Circular Moda Austral"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#590516]/95 via-[#590516]/45 to-transparent" />
          <div className="relative z-10 flex max-w-[640px] flex-col items-center gap-[14px]">
            <span className="font-arcifom inline-block rounded-[10px] bg-[#A73668] px-[14px] py-[5px] text-[13px] font-medium text-[#FFFABB]">
              Identidad Reutilizable · Sur de Chile
            </span>
            <h3 className="type-heading text-[#F6EBD7]">Moda Circular</h3>
            <p className="text-[16px] leading-[1.55] text-[#F6EBD7]/95">
              Ropa seleccionada con segunda vida y enfoque sustentable. Revisa qué puedes encontrar antes de visitar o escribirnos.
            </p>
            <span className="font-arcifom mt-[6px] inline-flex items-center justify-center rounded-[12px] bg-[#E89BBD] px-[22px] py-[12px] text-[15px] font-medium text-[#590516] transition-colors group-hover:bg-[#FFFABB]">
              Conocer Moda Circular →
            </span>
          </div>
        </div>
      </section>

      {/* 4. Muestra del Catálogo Referencial */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[96px]">
        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        <div className="mb-[48px] flex flex-col items-center justify-between gap-[20px] text-center sm:mb-[60px] sm:flex-row sm:items-end sm:text-left">
          <div className="flex flex-col gap-[8px]">
            <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
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
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[14px] bg-[#590516]">
                <img
                  src={garment.primaryImage}
                  alt={garment.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-[12px] left-[12px] rounded-[8px] bg-[#590516]/90 px-[12px] py-[5px]">
                  <span className="font-arcifom text-[12px] font-medium text-[#FFFABB]">
                    {garment.branch}
                  </span>
                </div>
              </div>

              <div className="mt-[20px] flex flex-col gap-[8px] sm:mt-[24px]">
                <span className="font-arcifom text-[13px] font-medium text-[#A73668]">
                  {garment.categoryLabel}
                </span>
                <h3 className="font-arcifom text-[16px] font-medium leading-[1.35] text-[#590516] group-hover:underline sm:text-[17px]">
                  {garment.name}
                </h3>
                <div className="flex items-center justify-between pt-[4px]">
                  <span className="text-[13px] font-medium text-[#802348]">
                    {garment.availabilityNote}
                  </span>
                  <span className="font-arcifom rounded-[8px] bg-[#E89BBD]/40 px-[10px] py-[4px] text-[13px] font-medium text-[#590516] group-hover:bg-[#A73668] group-hover:text-[#FFFABB]">
                    Ver ficha →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 5. Barra de Accesos Rápidos (Consultas, Cómo Comprar y Sucursales) */}
      <section className="mx-auto max-w-[1440px] px-[24px] py-[72px] sm:px-[56px] sm:py-[96px]">
        <SectionDivider className="mb-[56px] sm:mb-[72px]" />

        <div className="grid grid-cols-1 gap-[36px] md:grid-cols-3 md:gap-[32px]">
          <div className="flex flex-col items-center justify-between gap-[18px] border-b border-dashed border-[#E89BBD] pb-[28px] text-center md:items-start md:border-b-0 md:pb-0 md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
                Atención Cercana
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Consultar Disponibilidad
              </h3>
              <p className="text-[15px] text-[#802348]">
                Pregunta por tallas o prendas directamente en nuestro WhatsApp.
              </p>
            </div>
            <PillButton onClick={() => onNavigate('consulta')}>
              Ir a Consultas →
            </PillButton>
          </div>

          <div className="flex flex-col items-center justify-between gap-[18px] border-b border-dashed border-[#E89BBD] pb-[28px] text-center md:items-start md:border-b-0 md:pb-0 md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
                Paso a Paso
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Cómo Comprar
              </h3>
              <p className="text-[15px] text-[#802348]">
                Revisa cómo elegir tu referencia y coordinar tu visita.
              </p>
            </div>
            <GhostButton onClick={() => onNavigate('como-comprar')}>
              Ver Guía de Compra
            </GhostButton>
          </div>

          <div className="flex flex-col items-center justify-between gap-[18px] text-center md:items-start md:text-left">
            <div className="flex flex-col gap-[6px]">
              <span className="font-arcifom text-[14px] font-medium text-[#A73668]">
                Lenca y Puerto Montt
              </span>
              <h3 className="type-heading-sm text-[#590516]">
                Nuestras Sucursales
              </h3>
              <p className="text-[15px] text-[#802348]">
                Conoce nuestras ubicaciones, horarios y mapa de llegada.
              </p>
            </div>
            <GhostButton onClick={() => onNavigate('sucursales')}>
              Ver Sucursales
            </GhostButton>
          </div>
        </div>
      </section>
    </div>
  );
}
