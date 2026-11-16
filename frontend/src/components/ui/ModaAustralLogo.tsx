interface ModaAustralLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
}

/**
 * Identificador Oficial "MA" + Wordmark "Moda Austral" (Manual de Identidad Visual p. 8, 9 y 10)
 * - Isotipo entrelazado con esquinas redondeadas y degradado Fucsia (#A73668) a Burdeo (#590516).
 * - Wordmark en tipografía oficial Arcifom: "Moda" en Burdeo (#590516) + "Austral" en Fucsia (#A73668).
 */
export function ModaAustralLogo({
  className = '',
  showWordmark = true,
  size = 'md',
  variant = 'default',
}: ModaAustralLogoProps) {
  const dimensions =
    size === 'sm'
      ? 'h-[30px] w-[34px]'
      : size === 'lg'
        ? 'h-[50px] w-[58px]'
        : 'h-[36px] w-[42px]';

  return (
    <span className={`inline-flex items-center gap-[10px] font-arcifom ${className}`}>
      <svg
        viewBox="0 0 128 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${dimensions} shrink-0`}
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="maLogoLeft" x1="12" y1="10" x2="72" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A73668" />
            <stop offset="100%" stopColor="#590516" />
          </linearGradient>
          <linearGradient id="maLogoRight" x1="48" y1="10" x2="116" y2="104" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A73668" />
            <stop offset="55%" stopColor="#590516" />
            <stop offset="100%" stopColor="#3D020E" />
          </linearGradient>
        </defs>
        {/* Trazo izquierdo y V central con terminación redondeada (Manual p. 8-9) */}
        <path
          d="M14 96V20C14 13.4 19.4 8 26 8H30C34.5 8 38.6 10.5 40.6 14.5L64 60L75 38L85 58L71.4 84.5C69.4 88.4 65.4 90.8 61 90.8C56.6 90.8 52.6 88.4 50.6 84.5L34 52V96C34 101.5 29.5 106 24 106H22C17.6 106 14 101.5 14 96Z"
          fill="url(#maLogoLeft)"
        />
        {/* Diagonal ascendente de la A entrelazada */}
        <path
          d="M32 86L42 66L51 83L42.2 100.2C40.3 103.8 36.6 106 32.5 106H24L32 86Z"
          fill="#A73668"
          fillOpacity="0.9"
        />
        {/* Ápice derecho y pilar derecho en Burdeo profundo */}
        <path
          d="M52 44L65.4 14.5C67.4 10.5 71.5 8 76 8H79C83.5 8 87.6 10.5 89.6 14.5L114 64V20C114 13.4 108.6 8 102 8H100C95.5 8 91.4 10.5 89.4 14.5L83 28L93 48V96C93 101.5 97.5 106 103 106H104C109.5 106 114 101.5 114 96V20"
          fill="url(#maLogoRight)"
        />
      </svg>

      {showWordmark && (
        <span className="inline-flex items-baseline gap-[5px] font-arcifom text-[19px] sm:text-[21px] font-medium leading-none tracking-[0.01em]">
          <span className={variant === 'light' ? 'text-[#F6EBD7]' : 'text-[#590516]'}>
            Moda
          </span>
          <span className={variant === 'light' ? 'text-[#E89BBD]' : 'text-[#A73668]'}>
            Austral
          </span>
        </span>
      )}
    </span>
  );
}
