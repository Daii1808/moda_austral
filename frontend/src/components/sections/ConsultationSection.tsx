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
 * Apartado "Tu Consulta" — Diseñado con Accesibilidad para Adultos Mayores y Estilo Gráfico Moda Austral
 * - Textos amplios y legibles (18px a 22px en etiquetas, botones e inputs).
 * - Botones grandes (mínimo 54px–60px de alto) con indicador claro de selección (✓) y alto contraste.
 * - Campos de texto con bordes claros y fondo luminoso para facilitar la lectura y edición.
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
          <div className="flex flex-col gap-[12px]">
            <span className="font-arcifom inline-flex w-fit items-center rounded-[10px] bg-[#A73668] px-[16px] py-[6px] text-[15px] sm:text-[16px] font-medium text-[#FFFABB]">
              Atención por WhatsApp · {STORE_CONTACT.whatsappDisplay}
            </span>
            <h1 className="type-heading text-[#590516]">Tu Consulta a la Tienda</h1>
            <p className="max-w-[740px] text-[18px] sm:text-[20px] leading-[1.55] text-[#590516]/90">
              Sigue estos 4 pasos sencillos para preparar tu mensaje. Al terminar, presiona el botón <strong>Enviar Consulta por WhatsApp</strong>.
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

        <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-12 lg:gap-[56px]">
          {/* Columna Izquierda: Paso 1 (Categoría) y Paso 2 (Sucursal) */}
          <div className="flex flex-col gap-[40px] lg:col-span-6">
            {/* PASO 1 · CATEGORÍA */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <span className="font-arcifom rounded-[10px] bg-[#590516] px-[14px] py-[6px] text-[15px] font-medium text-[#FFFABB]">
                  Paso 1
                </span>
                <h2 className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]">
                  ¿Qué categoría te interesa?
                </h2>
              </div>
              <p className="text-[17px] leading-[1.5] text-[#802348]">
                Toca una opción para seleccionarla:
              </p>

              <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
                {CATEGORIES_DATA.map((cat) => {
                  const active = cat.id === selectedCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onChangeCategory(cat.id)}
                      className={`font-arcifom flex min-h-[58px] cursor-pointer items-center justify-between rounded-[14px] border-2 px-[20px] py-[14px] text-left text-[17px] sm:text-[18px] font-medium transition-colors ${
                        active
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                          : 'border-[#A73668]/45 bg-[#FFFABB]/55 text-[#590516] hover:border-[#A73668] hover:bg-[#E89BBD]/40'
                      }`}
                    >
                      <span>{cat.title}</span>
                      <span className="text-[18px]" aria-hidden="true">
                        {active ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <SectionDivider />

            {/* PASO 2 · SUCURSAL */}
            <div className="flex flex-col gap-[16px]">
              <div className="flex items-center gap-[12px]">
                <span className="font-arcifom rounded-[10px] bg-[#590516] px-[14px] py-[6px] text-[15px] font-medium text-[#FFFABB]">
                  Paso 2
                </span>
                <h2 className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]">
                  ¿En qué sucursal deseas consultar?
                </h2>
              </div>
              <p className="text-[17px] leading-[1.5] text-[#802348]">
                Elige la tienda más cercana o selecciona "Por definir":
              </p>

              <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-3">
                {BRANCH_OPTIONS.map((branchOption) => {
                  const isSelected = selectedBranch === branchOption;
                  return (
                    <button
                      key={branchOption}
                      type="button"
                      onClick={() => onChangeBranch(branchOption)}
                      className={`font-arcifom flex min-h-[58px] cursor-pointer items-center justify-between rounded-[14px] border-2 px-[18px] py-[14px] text-left text-[17px] sm:text-[18px] font-medium transition-colors ${
                        isSelected
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB]'
                          : 'border-[#A73668]/45 bg-[#FFFABB]/55 text-[#590516] hover:border-[#A73668] hover:bg-[#E89BBD]/40'
                      }`}
                    >
                      <span>{branchOption}</span>
                      <span className="text-[18px]" aria-hidden="true">
                        {isSelected ? '✓' : ''}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Columna Derecha: Paso 3 (Prenda opcional) y Paso 4 (Mensaje + Botón WhatsApp) */}
          <div className="flex flex-col gap-[36px] lg:col-span-6">
            {/* PASO 3 · REFERENCIA OPCIONAL */}
            <div className="flex flex-col gap-[14px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <div className="flex items-center gap-[12px]">
                  <span className="font-arcifom rounded-[10px] bg-[#A73668] px-[14px] py-[6px] text-[15px] font-medium text-[#FFFABB]">
                    Paso 3
                  </span>
                  <label
                    htmlFor="input-referencia"
                    className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]"
                  >
                    Prenda o Talla que buscas (Opcional)
                  </label>
                </div>

                {selectedReference && (
                  <button
                    type="button"
                    onClick={() => onChangeReference('')}
                    className="font-arcifom cursor-pointer rounded-[10px] bg-[#E89BBD]/50 px-[14px] py-[6px] text-[15px] font-medium text-[#590516] hover:bg-[#E89BBD]"
                  >
                    Borrar texto ✕
                  </button>
                )}
              </div>

              <p className="text-[17px] leading-[1.5] text-[#802348]">
                Puedes escribir aquí el nombre de una prenda o tu talla (por ejemplo: <em>Camisa talla L</em> o <em>Botín número 38</em>):
              </p>

              <input
                id="input-referencia"
                type="text"
                value={selectedReference}
                onChange={(e) => onChangeReference(e.target.value)}
                placeholder="Ej: Camisa de verano talla L / Botín cuero..."
                className="w-full rounded-[14px] border-2 border-[#A73668] bg-white/85 px-[18px] py-[16px] text-[18px] sm:text-[20px] text-[#590516] placeholder:text-[#802348]/60 focus:border-[#590516] focus:outline-none"
              />
            </div>

            {/* PASO 4 · MENSAJE LISTO PARA ENVIAR */}
            <div className="flex flex-col gap-[14px]">
              <div className="flex flex-wrap items-center justify-between gap-[10px]">
                <div className="flex items-center gap-[12px]">
                  <span className="font-arcifom rounded-[10px] bg-[#A73668] px-[14px] py-[6px] text-[15px] font-medium text-[#FFFABB]">
                    Paso 4
                  </span>
                  <label
                    htmlFor="textarea-mensaje"
                    className="font-arcifom text-[20px] sm:text-[22px] font-medium text-[#590516]"
                  >
                    Revisa tu mensaje antes de enviar
                  </label>
                </div>

                <button
                  type="button"
                  onClick={handleResetMessage}
                  className="font-arcifom cursor-pointer rounded-[10px] border border-[#A73668] px-[14px] py-[6px] text-[15px] font-medium text-[#A73668] hover:bg-[#A73668] hover:text-[#FFFABB]"
                >
                  Restaurar mensaje original
                </button>
              </div>

              <p className="text-[17px] leading-[1.5] text-[#802348]">
                Este mensaje ya está listo. Si deseas agregar una pregunta adicional, puedes escribir dentro del recuadro:
              </p>

              <textarea
                id="textarea-mensaje"
                rows={4}
                value={customMessage}
                onChange={(e) => {
                  setIsMessageEdited(true);
                  setCustomMessage(e.target.value);
                }}
                className="w-full resize-y rounded-[14px] border-2 border-[#590516] bg-white/95 p-[18px] text-[19px] sm:text-[21px] leading-[1.6] text-[#590516] focus:border-[#A73668] focus:outline-none"
              />
            </div>

            {/* Botones de Acción Principales — Grandes y Claros para Adultos Mayores */}
            <div className="flex flex-col items-start gap-[20px] pt-[8px]">
              <div className="flex w-full flex-col gap-[16px] sm:flex-row sm:items-center">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-arcifom inline-flex min-h-[62px] flex-1 items-center justify-center rounded-[14px] bg-[#590516] px-[28px] py-[18px] text-center text-[18px] sm:text-[20px] font-medium leading-tight text-[#FFFABB] transition-colors hover:bg-[#A73668]"
                >
                  Enviar Consulta por WhatsApp ↗
                </a>

                <GhostButton
                  onClick={handleCopyMessage}
                  className="min-h-[62px] px-[26px] py-[18px] text-[17px] sm:text-[18px]"
                >
                  {copied ? '✓ Mensaje Copiado' : 'Copiar Mensaje'}
                </GhostButton>
              </div>

              <div className="w-full rounded-[14px] bg-[#FFFABB]/75 px-[20px] py-[16px] text-[16px] sm:text-[17px] leading-[1.5] text-[#590516]">
                <strong>Importante:</strong> Enviar la consulta abre el WhatsApp de la tienda ({STORE_CONTACT.whatsappDisplay}). La disponibilidad y reserva se confirman cuando el equipo te responda.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
