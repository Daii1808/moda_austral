import { useState, useEffect } from 'react';
import type {
  BranchId,
  CategoryFilter,
  CategoryId,
  PageRoute,
} from '@/types/product';
import { CATEGORIES_DATA } from '@/data/products';
import {
  GhostButton,
  SectionDivider,
  UnderlineInput,
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
 * Dedicated Tu Consulta Page — Spacious, uncluttered WhatsApp inquiry builder
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
        : `en sucursal ${branch}`;
    const refPhrase = refText.trim()
      ? ` (Ref: ${refText.trim()})`
      : '';
    return `Hola, me interesa ${catTitle.toLowerCase()}${refPhrase} ${branchPhrase}. Quiero consultar disponibilidad.`;
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
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(customMessage)}`;

  return (
    <div className="min-h-screen w-screen bg-walnut-shadow px-[24px] pt-[124px] pb-[96px] sm:px-[56px] sm:pt-[144px] sm:pb-[120px] animate-fade-in">
      <div className="mx-auto max-w-[1440px]">
        <div className="mb-[40px] flex flex-wrap items-end justify-between gap-[16px] sm:mb-[52px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[11px] font-medium uppercase text-ember-accent">
              WHATSAPP DIRECTO
            </span>
            <h1 className="type-heading text-warm-cream">TU CONSULTA</h1>
          </div>
          <UnderlineLink
            href="#categorias"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('categorias', 'all');
            }}
          >
            ← VOLVER A CATEGORÍAS
          </UnderlineLink>
        </div>

        <SectionDivider className="mb-[52px] sm:mb-[68px]" />

        <div className="grid grid-cols-1 items-start gap-[48px] lg:grid-cols-12 lg:gap-[64px]">
          {/* Left: Category & Branch Selection */}
          <div className="flex flex-col gap-[36px] lg:col-span-5">
            {/* 01. Categoría */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[11px] font-medium uppercase text-driftwood">
                01 · CATEGORÍA
              </span>
              <div className="flex flex-wrap gap-[10px]">
                {CATEGORIES_DATA.map((cat) => {
                  const active = cat.id === selectedCategory;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => onChangeCategory(cat.id)}
                      className={`cursor-pointer rounded-[22.5px] border px-[18px] py-[8px] text-[12px] font-medium uppercase leading-none transition-colors ${
                        active
                          ? 'border-[#510f18] bg-[#510f18] text-[#f5ecda]'
                          : 'border-[#510f18] bg-transparent text-[#510f18] hover:bg-[#de9fbd]/25'
                      }`}
                    >
                      {cat.title}
                    </button>
                  );
                })}
              </div>
            </div>

            <SectionDivider />

            {/* 02. Sucursal */}
            <div className="flex flex-col gap-[16px]">
              <span className="text-[11px] font-medium uppercase text-driftwood">
                02 · SUCURSAL
              </span>
              <div className="flex flex-wrap gap-[10px]">
                {BRANCH_OPTIONS.map((branchOption) => {
                  const isSelected = selectedBranch === branchOption;
                  return (
                    <button
                      key={branchOption}
                      type="button"
                      onClick={() => onChangeBranch(branchOption)}
                      className={`cursor-pointer rounded-[22.5px] border px-[18px] py-[8px] text-[12px] font-medium uppercase leading-none transition-colors ${
                        isSelected
                          ? 'border-[#510f18] bg-[#510f18] text-[#f5ecda]'
                          : 'border-[#510f18] bg-transparent text-[#510f18] hover:bg-[#de9fbd]/25'
                      }`}
                    >
                      {branchOption.toUpperCase()}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Reference & Editable Message */}
          <div className="flex flex-col gap-[36px] lg:col-span-7">
            {/* 03. Referencia */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="input-referencia"
                  className="text-[12px] font-medium uppercase text-warm-cream"
                >
                  03 · PRENDA O REFERENCIA (OPCIONAL)
                </label>
                <span className="text-[10px] font-medium uppercase text-ember-accent">
                  EDITABLE ✎
                </span>
              </div>

              <UnderlineInput
                id="input-referencia"
                type="text"
                value={selectedReference}
                onChange={(e) => onChangeReference(e.target.value)}
                placeholder="EJ: REF. LEN-0042 — POLERÓN BORDADO..."
                className="py-[10px] text-[14px]"
                inlineAction={
                  selectedReference ? (
                    <button
                      type="button"
                      onClick={() => onChangeReference('')}
                      className="cursor-pointer text-[10px] font-medium uppercase text-warm-cream"
                    >
                      LIMPIAR
                    </button>
                  ) : undefined
                }
              />
            </div>

            {/* 04. Mensaje */}
            <div className="flex flex-col gap-[12px]">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="textarea-mensaje"
                  className="text-[12px] font-medium uppercase text-warm-cream"
                >
                  04 · TU MENSAJE
                </label>
                <button
                  type="button"
                  onClick={handleResetMessage}
                  className="cursor-pointer text-[10px] font-medium uppercase text-ember-accent underline"
                >
                  RESTAURAR
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
                className="w-full resize-y rounded-none border-0 border-b border-warm-cream bg-transparent py-[10px] text-[16px] leading-[1.55] text-warm-cream focus:outline-none"
              />
            </div>

            {/* Primary Action */}
            <div className="flex flex-col items-start gap-[18px] pt-[12px]">
              <div className="flex flex-wrap items-center gap-[16px]">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-[36px] bg-[#510f18] px-[26px] py-[15px] text-[12px] font-medium uppercase leading-none text-[#f5ecda] transition-colors hover:bg-[#9b4067]"
                >
                  CONTINUAR A WHATSAPP ↗
                </a>

                <GhostButton onClick={handleCopyMessage}>
                  {copied ? '✓ COPIADO' : 'COPIAR MENSAJE'}
                </GhostButton>
              </div>

              <span className="text-[11px] font-medium uppercase text-driftwood">
                LA CONSULTA NO CONFIRMA RESERVA AUTOMÁTICA.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
