/**
 * Radiktor Logo — geometric low-poly microphone with amber accents.
 * SVG inline for crisp rendering at any size and theme-aware colors.
 */
interface LogoProps {
  size?: number;
  className?: string;
}

export default function Logo({ size = 28, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circle border */}
      <circle cx="50" cy="50" r="46" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.7" />
      
      {/* Microphone head — dark geometric */}
      <polygon points="45,22 50,18 55,22 55,42 45,42" fill="hsl(0,0%,12%)" />
      <polygon points="55,22 58,26 58,38 55,42" fill="hsl(33,78%,54%)" />
      <polygon points="45,22 42,26 42,38 45,42" fill="hsl(0,0%,18%)" />
      
      {/* Microphone head top facets */}
      <polygon points="45,22 50,18 50,24 45,26" fill="hsl(0,0%,20%)" />
      <polygon points="55,22 50,18 50,24 55,26" fill="hsl(0,0%,15%)" />
      
      {/* Stand / neck */}
      <rect x="48" y="42" width="4" height="10" fill="hsl(0,0%,15%)" />
      
      {/* Base arms — geometric Y shape */}
      <polygon points="48,52 42,60 38,58 46,50" fill="hsl(0,0%,14%)" />
      <polygon points="52,52 58,60 62,58 54,50" fill="hsl(0,0%,14%)" />
      
      {/* Base platform */}
      <polygon points="42,60 50,64 58,60 50,58" fill="hsl(0,0%,12%)" />
      
      {/* Amber accent highlights */}
      <polygon points="38,58 42,60 40,63" fill="hsl(33,78%,54%)" />
      <polygon points="62,58 58,60 60,63" fill="hsl(33,78%,54%)" />
      <polygon points="57,24 58,30 56,28" fill="hsl(38,90%,55%)" opacity="0.8" />
    </svg>
  );
}
