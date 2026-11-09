interface ModaAustralLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

/**
 * Exact intertwined "MA" Monogram Logo from Page 15 (Canva Prototype) & Page 17 of the PDF.
 * Interlaces Deep Burgundy (#510f18) "M" with Berry (#9b4067) / Rose (#de9fbd) "A".
 */
export function ModaAustralLogo({
  className = '',
  showWordmark = true,
  size = 'md',
}: ModaAustralLogoProps) {
  const dimensions =
    size === 'sm'
      ? 'h-[28px] w-[32px]'
      : size === 'lg'
        ? 'h-[48px] w-[56px]'
        : 'h-[34px] w-[40px]';

  return (
    <span className={`inline-flex items-center gap-[10px] ${className}`}>
      <svg
        viewBox="0 0 120 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} shrink-0`}
        aria-hidden="true"
      >
        {/* Left and Right Pillars + Center V of the "M" in Deep Burgundy (#510f18) */}
        <path
          d="M10 92V8H28L60 64L92 8H110V92H92V38L66 82H54L28 38V92H10Z"
          fill="#510f18"
        />
        {/* Interlaced "A" Apex in Berry (#9b4067) & Rose (#de9fbd) */}
        <path
          d="M28 92L60 12L92 92H75L60 52L45 92H28Z"
          fill="#9b4067"
          fillOpacity="0.92"
        />
        <path
          d="M42 68H78L83 80H37L42 68Z"
          fill="#de9fbd"
        />
      </svg>
      {showWordmark && (
        <span className="font-medium uppercase leading-none tracking-normal text-[#510f18]">
          MODA AUSTRAL
        </span>
      )}
    </span>
  );
}
