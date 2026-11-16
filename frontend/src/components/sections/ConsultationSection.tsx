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
  PillButton,
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

const WIZARD_STEPS = [
  { step: 1, label: 'Categoría' },
  { step: 2, label: 'Sucursal' },
  { step: 3, label: 'Prenda / Talla' },
  { step: 4, label: 'Enviar Mensaje' },
] as const;

/**
 * Apartado "Tu Consulta" — Asistente Interactivo Paso a Paso (Wizard 1 de 4)
 * - Muestra UN solo paso a la vez con aire generoso, avanzando automáticamente al responder
 *   y permitiendo retroceder libremente a cualquier paso anterior.
 * - Accesible para adultos mayores: tipografía clara (Acumin Light 18px-21px + Arcifom),
 *   botones amplios (>=60px) y cero tarjetas anidadas ("cards-within-cards").
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
  // Si el usuario viene directo desde una prenda específica, arranca en el Paso 1 para confirmar o pasar rápido
  const [currentStep, setCurrentStep] = useState<number>(1);

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

  const goToStep = (stepNumber: number) => {
    setCurrentStep(stepNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePickCategory = (catId: CategoryId) => {
    onChangeCategory(catId);
    goToStep(2);
  };

  const handlePickBranch = (branch: BranchId) => {
    onChangeBranch(branch);
    goToStep(3);
  };

  const whatsappUrl = `https://wa.me/${STORE_CONTACT.whatsappNumber}?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="min-h-screen w-screen bg-[#F6EBD7] px-[24px] pt-[128px] pb-[112px] sm:px-[56px] sm:pt-[152px] sm:pb-[140px] animate-fade-in">
      <div className="mx-auto max-w-[960px]">
        {/* Encabezado limpio */}
        <div className="flex flex-wrap items-end justify-between gap-[20px] pb-[36px] sm:pb-[44px]">
          <div className="flex flex-col gap-[10px]">
            <span className="font-arcifom text-[15px] sm:text-[16px] font-medium text-[#A73668]">
              WhatsApp Directo · {STORE_CONTACT.whatsappDisplay}
            </span>
            <h1 className="type-heading text-[#590516]">Tu Consulta</h1>
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

        <SectionDivider />

        {/* Indicador de Progreso Clickeable (Permite saltar a pasos ya avanzados) */}
        <nav
          aria-label="Progreso de consulta"
          className="flex flex-wrap items-center justify-between gap-[16px] py-[28px] sm:py-[36px]"
        >
          <div className="flex flex-wrap items-center gap-[10px] sm:gap-[16px]">
            {WIZARD_STEPS.map((item) => {
              const isCurrent = currentStep === item.step;
              const isCompleted = currentStep > item.step;
              const canJump = item.step <= currentStep;

              return (
                <button
                  key={item.step}
                  type="button"
                  disabled={!canJump}
                  onClick={() => canJump && goToStep(item.step)}
                  className={`font-arcifom inline-flex items-center gap-[8px] rounded-[12px] px-[14px] py-[9px] text-[15px] sm:text-[16px] font-medium transition-colors ${
                    isCurrent
                      ? 'bg-[#590516] text-[#FFFABB]'
                      : isCompleted
                        ? 'cursor-pointer bg-[#E89BBD]/45 text-[#590516] hover:bg-[#E89BBD]/75'
                        : 'cursor-default text-[#802348]/50'
                  }`}
                >
                  <span>0{item.step}</span>
                  <span className="hidden sm:inline">· {item.label}</span>
                  {isCompleted && <span aria-hidden="true">✓</span>}
                </button>
              );
            })}
          </div>

          <span className="font-acumin text-[15px] sm:text-[16px] font-light text-[#802348]">
            Paso {currentStep} de 4
          </span>
        </nav>

        <SectionDivider />

        {/* Contenido Exclusivo del Paso Activo — Amplio whitespace editorial */}
        <div className="py-[48px] sm:py-[72px]">
          {/* ==================== PASO 1: CATEGORÍA ==================== */}
          {currentStep === 1 && (
            <div key="step-1" className="flex flex-col gap-[36px] animate-fade-in">
              <div className="flex flex-col gap-[14px]">
                <span className="font-arcifom text-[15px] font-medium uppercase tracking-wider text-[#A73668]">
                  Paso 01 de 04
                </span>
                <h2 className="font-arcifom text-[28px] sm:text-[36px] font-medium leading-[1.15] text-[#590516]">
                  ¿Qué categoría te interesa consultar?
                </h2>
                <p className="font-acumin max-w-[640px] text-[18px] sm:text-[20px] font-light leading-[1.6] text-[#802348]">
                  Toca una de las siguientes opciones para avanzar automáticamente al Paso 2.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 sm:gap-[22px]">
                {CATEGORIES_DATA.map((cat) => {
                  const active = cat.id === selectedCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => handlePickCategory(cat.id)}
                      className={`font-arcifom flex min-h-[72px] cursor-pointer items-center justify-between rounded-[14px] border-2 px-[26px] py-[20px] text-left text-[19px] sm:text-[21px] font-medium leading-tight transition-colors ${
                        active
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB] hover:bg-[#A73668] hover:border-[#A73668]'
                          : 'border-[#590516] bg-transparent text-[#590516] hover:bg-[#E89BBD]/40'
                      }`}
                    >
                      <span>{cat.title}</span>
                      <span className="text-[20px]" aria-hidden="true">
                        {active ? '✓ →' : '→'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-[16px] pt-[12px]">
                <PillButton
                  onClick={() => goToStep(2)}
                  className="min-h-[58px] px-[28px] text-[17px]"
                >
                  Continuar con {activeCategoryObj.title} →
                </PillButton>
              </div>
            </div>
          )}

          {/* ==================== PASO 2: SUCURSAL ==================== */}
          {currentStep === 2 && (
            <div key="step-2" className="flex flex-col gap-[36px] animate-fade-in">
              <div className="flex flex-col gap-[14px]">
                <span className="font-arcifom text-[15px] font-medium uppercase tracking-wider text-[#A73668]">
                  Paso 02 de 04 · Elegiste {activeCategoryObj.title}
                </span>
                <h2 className="font-arcifom text-[28px] sm:text-[36px] font-medium leading-[1.15] text-[#590516]">
                  ¿En qué sucursal deseas consultar?
                </h2>
                <p className="font-acumin max-w-[640px] text-[18px] sm:text-[20px] font-light leading-[1.6] text-[#802348]">
                  Selecciona la tienda de tu preferencia para avanzar al siguiente paso.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-3 sm:gap-[22px]">
                {BRANCH_OPTIONS.map((branchOption) => {
                  const isSelected = selectedBranch === branchOption;
                  return (
                    <button
                      key={branchOption}
                      type="button"
                      onClick={() => handlePickBranch(branchOption)}
                      className={`font-arcifom flex min-h-[72px] cursor-pointer items-center justify-between rounded-[14px] border-2 px-[24px] py-[20px] text-left text-[19px] sm:text-[20px] font-medium leading-tight transition-colors ${
                        isSelected
                          ? 'border-[#590516] bg-[#590516] text-[#FFFABB] hover:bg-[#A73668] hover:border-[#A73668]'
                          : 'border-[#590516] bg-transparent text-[#590516] hover:bg-[#E89BBD]/40'
                      }`}
                    >
                      <span>{branchOption}</span>
                      <span className="text-[20px]" aria-hidden="true">
                        {isSelected ? '✓ →' : '→'}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-[16px] pt-[12px]">
                <GhostButton
                  onClick={() => goToStep(1)}
                  className="min-h-[58px] px-[24px] text-[17px]"
                >
                  ← Retroceder al Paso 1
                </GhostButton>

                <PillButton
                  onClick={() => goToStep(3)}
                  className="min-h-[58px] px-[28px] text-[17px]"
                >
                  Continuar al Paso 3 →
                </PillButton>
              </div>
            </div>
          )}

          {/* ==================== PASO 3: PRENDA O TALLA (OPCIONAL) ==================== */}
          {currentStep === 3 && (
            <div key="step-3" className="flex flex-col gap-[36px] animate-fade-in">
              <div className="flex flex-col gap-[14px]">
                <span className="font-arcifom text-[15px] font-medium uppercase tracking-wider text-[#A73668]">
                  Paso 03 de 04 · Opcional ({activeCategoryObj.title} · {selectedBranch})
                </span>
                <label
                  htmlFor="input-referencia"
                  className="font-arcifom text-[28px] sm:text-[36px] font-medium leading-[1.15] text-[#590516]"
                >
                  ¿Buscas alguna prenda o talla en especial?
                </label>
                <p className="font-acumin max-w-[660px] text-[18px] sm:text-[20px] font-light leading-[1.6] text-[#802348]">
                  Si buscas algo concreto escríbelo aquí (ejemplo: <em>Camisa talla L</em> o <em>Botín 38</em>). Si no, puedes avanzar directo al último paso.
                </p>
              </div>

              <div className="flex flex-col gap-[16px]">
                <input
                  id="input-referencia"
                  type="text"
                  autoFocus
                  value={selectedReference}
                  onChange={(e) => onChangeReference(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      goToStep(4);
                    }
                  }}
                  placeholder="Ej: Camisa de verano talla L / Botín cuero número 38..."
                  className="font-acumin w-full rounded-none border-0 border-b-2 border-[#590516] bg-transparent py-[20px] text-[20px] sm:text-[23px] font-light text-[#590516] placeholder:text-[#802348]/55 focus:border-[#A73668] focus:outline-none"
                />

                {selectedReference && (
                  <div>
                    <button
                      type="button"
                      onClick={() => onChangeReference('')}
                      className="font-arcifom cursor-pointer text-[16px] font-medium text-[#A73668] underline"
                    >
                      Borrar texto escrito
                    </button>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-[16px] pt-[12px]">
                <GhostButton
                  onClick={() => goToStep(2)}
                  className="min-h-[58px] px-[24px] text-[17px]"
                >
                  ← Retroceder al Paso 2
                </GhostButton>

                <PillButton
                  onClick={() => goToStep(4)}
                  className="min-h-[60px] px-[30px] text-[18px]"
                >
                  {selectedReference.trim()
                    ? 'Siguiente: Ver mi Mensaje →'
                    : 'Continuar al Paso 4 →'}
                </PillButton>
              </div>
            </div>
          )}

          {/* ==================== PASO 4: MENSAJE LISTO Y WHATSAPP ==================== */}
          {currentStep === 4 && (
            <div key="step-4" className="flex flex-col gap-[36px] animate-fade-in">
              <div className="flex flex-col gap-[14px]">
                <span className="font-arcifom text-[15px] font-medium uppercase tracking-wider text-[#A73668]">
                  Paso 04 de 04 · Listo para enviar
                </span>
                <h2 className="font-arcifom text-[28px] sm:text-[36px] font-medium leading-[1.15] text-[#590516]">
                  Revisa y envía tu consulta por WhatsApp
                </h2>
                <p className="font-acumin max-w-[680px] text-[18px] sm:text-[20px] font-light leading-[1.6] text-[#802348]">
                  Tu mensaje ya quedó preparado con tus respuestas. Puedes modificarlo si deseas antes de tocar el botón de WhatsApp.
                </p>
              </div>

              {/* Resumen claro con enlaces para corregir cualquier paso anterior */}
              <div className="flex flex-wrap items-center gap-[16px] border-y border-dashed border-[#E89BBD] py-[18px] font-acumin text-[17px] font-light text-[#590516]">
                <span>
                  <strong className="font-medium">Categoría:</strong>{' '}
                  <button
                    type="button"
                    onClick={() => goToStep(1)}
                    className="font-arcifom cursor-pointer text-[#A73668] underline"
                  >
                    {activeCategoryObj.title}
                  </button>
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  <strong className="font-medium">Sucursal:</strong>{' '}
                  <button
                    type="button"
                    onClick={() => goToStep(2)}
                    className="font-arcifom cursor-pointer text-[#A73668] underline"
                  >
                    {selectedBranch}
                  </button>
                </span>
                {selectedReference.trim() && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      <strong className="font-medium">Detalle:</strong>{' '}
                      <button
                        type="button"
                        onClick={() => goToStep(3)}
                        className="font-arcifom cursor-pointer text-[#A73668] underline"
                      >
                        {selectedReference}
                      </button>
                    </span>
                  </>
                )}
              </div>

              <div className="flex flex-col gap-[14px]">
                <div className="flex flex-wrap items-center justify-between gap-[12px]">
                  <label
                    htmlFor="textarea-mensaje"
                    className="font-arcifom text-[18px] sm:text-[20px] font-medium text-[#590516]"
                  >
                    Mensaje a enviar:
                  </label>
                  <button
                    type="button"
                    onClick={handleResetMessage}
                    className="font-arcifom cursor-pointer text-[16px] font-medium text-[#A73668] underline"
                  >
                    Restaurar mensaje original
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
                  className="font-acumin w-full resize-y rounded-none border-0 border-b-2 border-[#590516] bg-transparent py-[18px] text-[20px] sm:text-[22px] font-light leading-[1.6] text-[#590516] focus:border-[#A73668] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-[18px] pt-[8px]">
                <GhostButton
                  onClick={() => goToStep(3)}
                  className="min-h-[60px] px-[24px] text-[17px]"
                >
                  ← Retroceder al Paso 3
                </GhostButton>

                <div className="flex flex-wrap items-center gap-[16px]">
                  <GhostButton
                    onClick={handleCopyMessage}
                    className="min-h-[60px] px-[26px] py-[16px] text-[17px] sm:text-[18px]"
                  >
                    {copied ? '✓ Mensaje Copiado' : 'Copiar Mensaje'}
                  </GhostButton>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-arcifom inline-flex min-h-[62px] items-center justify-center rounded-[14px] bg-[#590516] px-[32px] py-[18px] text-[18px] sm:text-[20px] font-medium leading-none text-[#FFFABB] transition-colors hover:bg-[#A73668]"
                  >
                    Enviar por WhatsApp ↗
                  </a>
                </div>
              </div>

              <p className="font-acumin text-[16px] sm:text-[17px] font-light leading-[1.55] text-[#802348]">
                La consulta no confirma reserva automática. La disponibilidad y condiciones de compra se confirman directamente con la tienda ({STORE_CONTACT.whatsappDisplay}).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
