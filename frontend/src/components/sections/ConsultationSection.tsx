import { useState, useEffect } from 'react';
import type {
  BranchId,
  CategoryFilter,
  CategoryId,
  PageRoute,
} from '@/types/product';
import { CATEGORIES_DATA, STORE_CONTACT } from '@/data/products';
import {
  GhostButton,
  SectionDivider,
  UnderlineLink,
} from '@/components/ui';

interface ConsultationSectionProps {
  selectedCategory: CategoryId;
  selectedBranch: BranchId;
  selectedReference: string;
  onChangeCategory: (category: CategoryId) => void;
  onChangeBranch: (branch: BranchId) => void;
  onChangeReference: (ref: string) => void;
  onNavigate: (page: PageRoute, category?: CategoryFilter) => void;
}

const BRANCH_OPTIONS: BranchId[] = ['Lenca', 'Puerto Montt', 'Por definir'];

/**
 * Apartado "Tu Consulta" — Accesible para Adultos Mayores (textos de 18px a 22px),
 * cuerpos en Acumin Variable Concept Light, botones en Arcifom y CERO tarjetas anidadas ("cards-within-cards").
 */
export function ConsultationSection({
  selectedCategory,
  selectedBranch,
  selectedReference,
  onChangeCategory,
  onChangeBranch,
  onChangeReference,
  onNavigate,
}: ConsultationSectionProps) {
  const activeCategoryObj =
    CATEGORIES_DATA.find((c) => c.id === selectedCategory) ?? CATEGORIES_DATA[0];

  const buildDefaultMessage = (
    catTitle: string,
    branch: BranchId,
    refText: string,
  ) => {
    const branchPhrase =
      branch === 'Por definir'
        ? 'en Lenca o Puerto Montt'
        : `en la sucursal de ${branch}`;
    const refPhrase = refText.trim()
      ? ` (${refText.trim()})`
      : '';
    return `Hola Moda Austral, me interesa consultar por ${catTitle.toLowerCase()}${refPhrase} ${branchPhrase}. ¿Tienen disponibilidad?`;
  };

  const [customMessage, setCustomMessage] = useState<string>(() =>
    buildDefaultMessage(activeCategoryObj.title, selectedBranch, selectedReference),
  );
  const [isMessageEdited, setIsMessageEdited] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isMessageEdited) {
      setCustomMessage(
        buildDefaultMessage(
          activeCategoryObj.title,
          selectedBranch,
          selectedReference,
        ),
      );
    }
  }, [activeCategoryObj.title, selectedBranch, selectedReference, isMessageEdited]);

  const handleResetMessage = () => {
    setIsMessageEdited(false);
    setCustomMessage(
      buildDefaultMessage(
        activeCategoryObj.title,
        selectedBranch,
        selectedReference,
      ),
    );
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(customMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const whatsappUrl = `https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="min-h-screen w-screen bg-[#F6EBD7] px-[20px] pt-[116px] pb-[96px] sm:px-[56px] sm:pt-[140px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1280px]">
        {/* Encabezado amplio y claro */}
        <div className="mb-[36px] flex flex-wrap items-end justify-between gap-[20px] sm:mb-[48px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-arcifom text-[15px] sm:text-[16px] font-medium text-[#A73668]">
              WhatsApp Directo · {STORE_CONTACT.whatsappDisplay}
            </span>
            <h1 className="type-heading text-[#590516]">Tu Consulta</h1>
            <p className="font-acumin max-w-[740px] text-[18px] sm:text-[20px] font-light leading-[1.55] text-[#590516]">
              Selecciona la categoría y sucursal que buscas para preparar tu mensaje de WhatsApp.
            </p>
          </div>

          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
            className="text-[16px] sm:text-[17px]"
          >
            ← Volver al Catálogo
          </UnderlineLink>
        </div>

        <SectionDivider className="mb-[44px] sm:mb-[56px]" />

        <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-12 lg:gap-[64px]">
          {/* Columna Izquierda: Paso 01 (Categoría) y Paso 02 (Sucursal) */}
          <div className="flex flex-col gap-[40px] lg:col-span-5">
            {/* 01 · CATEGORÍA */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]">
                01 · ¿Qué categoría te interesa?
              </h2>
              <p className="font-acumin text-[17px] font-light leading-[1.5] text-[#802348]">
                Toca un botón para elegir la categoría:
              </p>

              <div className="flex flex-wrap gap-[12px]">
                {CATEGORIES_DATA.map((cat) => {
                  const active = cat.id === selectedCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onChangeCategory(cat.id)}
                      className={`font-arcifom inline-flex min-h-[58px] cursor-pointer items-center gap-[10px] rounded-[14px] border-2 px-[22px] py-[14px] text-[17px] sm:text-[18px] font-medium leading-none transition-colors ${
                        active
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                          : 'border-[#590516] bg-transparent text-[#590516] hover:bg-[#E89BBD]/35'
                      }`}
                    >
                      <span>{cat.title}</span>
                      {active && <span aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>

            <SectionDivider />

            {/* 02 · SUCURSAL */}
            <div className="flex flex-col gap-[16px]">
              <h2 className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]">
                02 · ¿En qué sucursal deseas consultar?
              </h2>
              <p className="font-acumin text-[17px] font-light leading-[1.5] text-[#802348]">
                Elige la tienda más cercana o selecciona "Por definir":
              </p>

              <div className="flex flex-wrap gap-[12px]">
                {BRANCH_OPTIONS.map((branchOption) => {
                  const isSelected = selectedBranch === branchOption;
                  return (
                    <button
                      key={branchOption}
                      type="button"
                      onClick={() => onChangeBranch(branchOption)}
                      className={`font-arcifom inline-flex min-h-[58px] cursor-pointer items-center gap-[10px] rounded-[14px] border-2 px-[22px] py-[14px] text-[17px] sm:text-[18px] font-medium leading-none transition-colors ${
                        isSelected
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                          : 'border-[#590516] bg-transparent text-[#590516] hover:bg-[#E89BBD]/35'
                      }`}
                    >
                      <span>{branchOption}</span>
                      {isSelected && <span aria-hidden="true">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Paso 03 (Referencia) y Paso 04 (Mensaje + Botón WhatsApp) */}
          <div className="flex flex-col gap-[40px] lg:col-span-7">
            {/* 03 · REFERENCIA OPCIONAL */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <label
                  htmlFor="input-referencia"
                  className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]"
                >
                  03 · Prenda o Talla que buscas (Opcional)
                </label>

                {selectedReference && (
                  <button
                    type="button"
                    onClick={() => onChangeReference('')}
                    className="font-arcifom cursor-pointer text-[15px] font-medium text-[#A73668] underline"
                  >
                    Limpiar texto
                  </button>
                )}
              </div>

              <input
                id="input-referencia"
                type="text"
                value={selectedReference}
                onChange={(e) => onChangeReference(e.target.value)}
                placeholder="Ej: Camisa de verano talla L / Botín cuero..."
                className="font-acumin w-full rounded-none border-0 border-b-2 border-[#590516] bg-transparent py-[14px] text-[19px] sm:text-[21px] font-light text-[#590516] placeholder:text-[#802348]/60 focus:border-[#A73668] focus:outline-none"
              />
            </div>

            {/* 04 · MENSAJE */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <label
                  htmlFor="textarea-mensaje"
                  className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]"
                >
                  04 · Tu Mensaje (Puedes editarlo si deseas)
                </label>

                <button
                  type="button"
                  onClick={handleResetMessage}
                  className="font-arcifom cursor-pointer text-[15px] font-medium text-[#A73668] underline"
                >
                  Restaurar mensaje
                </button>
              </div>

              <textarea
                id="textarea-mensaje"
                rows={3}
                value={customMessage}
                onChange={(e) => {
                  setIsMessageEdited(true);
                  setCustomMessage(e.target.value);
                }}
                className="font-acumin w-full resize-y rounded-none border-0 border-b-2 border-[#590516] bg-transparent py-[14px] text-[19px] sm:text-[21px] font-light leading-[1.6] text-[#590516] focus:border-[#A73668] focus:outline-none"
              />
            </div>

            {/* Botones de Acción Principales */}
            <div className="flex flex-col items-start gap-[18px] pt-[8px]">
              <div className="flex flex-wrap items-center gap-[16px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-arcifom inline-flex min-h-[60px] items-center justify-center rounded-[14px] bg-[#590516] px-[30px] py-[16px] text-[18px] sm:text-[20px] font-medium leading-none text-[#FFFABB] transition-colors hover:bg-[#A73668]"
                >
                  Continuar a WhatsApp ↗
                </a>

                <GhostButton
                  onClick={handleCopyMessage}
                  className="min-h-[60px] px-[26px] py-[16px] text-[17px] sm:text-[18px]"
                >
                  {copied ? '✓ Mensaje Copiado' : 'Copiar Mensaje'}
                </GhostButton>
              </div>

              <p className="font-acumin text-[16px] sm:text-[17px] font-light leading-[1.5] text-[#802348]">
                La consulta no confirma reserva automática. La disponibilidad se confirma directamente con la tienda ({STORE_CONTACT.whatsappDisplay}).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
