// Hand-drawn SVG decorative elements for quirky, playful aesthetic

export function SquigglyUnderline({ color = "#C4704F", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      className={`absolute -bottom-2 left-0 w-full h-3 ${className}`}
      viewBox="0 0 200 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2 6 Q 20 2, 40 6 T 80 6 T 120 6 T 160 6 T 198 6"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Star({ color = "#F4D35E", size = 24, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2L14.5 9H22L16 13.5L18.5 21L12 16.5L5.5 21L8 13.5L2 9H9.5L12 2Z" />
    </svg>
  );
}

export function Sparkle({ color = "#7AB8D9", size = 20, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 0L13.5 10.5L24 12L13.5 13.5L12 24L10.5 13.5L0 12L10.5 10.5L12 0Z" />
    </svg>
  );
}

export function Scribble({ color = "#E07B5C", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="60"
      height="30"
      viewBox="0 0 60 30"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 15 C 10 5, 20 25, 30 15 S 50 5, 58 15"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Arrow({ color = "#8BAF8B", className = "", direction = "right" }: { color?: string; className?: string; direction?: "right" | "left" | "up" | "down" }) {
  const rotation = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <svg
      width="40"
      height="24"
      viewBox="0 0 40 24"
      fill="none"
      className={className}
      style={{ transform: `rotate(${rotation[direction]}deg)` }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 12 C 8 12, 20 8, 28 12 M28 12 L 22 6 M28 12 L 22 18"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function Circle({ color = "#B8A9C9", size = 40, className = "", filled = false }: { color?: string; size?: number; className?: string; filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill={filled ? color : "none"}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse
        cx="20"
        cy="20"
        rx="17"
        ry="16"
        stroke={color}
        strokeWidth="2.5"
        transform="rotate(-5 20 20)"
      />
    </svg>
  );
}

export function Heart({ color = "#E8B4B8", size = 24, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

export function WavyLine({ color = "#C4704F", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      className={`w-full h-6 ${className}`}
      viewBox="0 0 400 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 12 Q 25 4, 50 12 T 100 12 T 150 12 T 200 12 T 250 12 T 300 12 T 350 12 T 400 12"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Zigzag({ color = "#F4D35E", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="80"
      height="20"
      viewBox="0 0 80 20"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2 18 L 12 2 L 22 18 L 32 2 L 42 18 L 52 2 L 62 18 L 72 2 L 78 12"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function CloudDoodle({ color = "#7AB8D9", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="60"
      height="36"
      viewBox="0 0 60 36"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 28 C 5 28, 5 18, 12 15 C 8 8, 20 2, 28 8 C 35 2, 50 5, 48 15 C 58 18, 55 28, 45 28 Z"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Swirl({ color = "#E07B5C", size = 40, className = "" }: { color?: string; size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 20 C 20 15, 25 10, 30 15 C 35 20, 30 30, 20 28 C 10 26, 8 18, 15 12 C 22 6, 35 10, 35 22"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export function Underline({ color = "#C4704F", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      className={`w-full h-2 ${className}`}
      viewBox="0 0 100 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M2 4 C 20 2, 40 6, 60 4 C 80 2, 95 5, 98 4"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

// Icons for the 3-step process
export function EmbedIcon({ color = "#7AB8D9", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn style people together */}
      <circle cx="18" cy="16" r="6" stroke={color} strokeWidth="2.5" fill="none" />
      <circle cx="30" cy="16" r="6" stroke={color} strokeWidth="2.5" fill="none" />
      <path
        d="M6 40 C 6 30, 14 26, 24 26 C 34 26, 42 30, 42 40"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M14 22 L 14 26 M 34 22 L 34 26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IdentifyIcon({ color = "#F4D35E", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn magnifying glass */}
      <circle cx="20" cy="20" r="12" stroke={color} strokeWidth="2.5" fill="none" />
      <path
        d="M30 30 L 42 42"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 20 L 24 20 M 20 16 L 20 24"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BuildIcon({ color = "#8BAF8B", className = "" }: { color?: string; className?: string }) {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Hand-drawn tools/building */}
      <path
        d="M10 38 L 10 18 L 24 8 L 38 18 L 38 38"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect x="18" y="26" width="12" height="12" stroke={color} strokeWidth="2.5" fill="none" rx="1" />
      <path
        d="M24 8 L 24 2 M 22 4 L 26 4"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// Floating decorative element container
export function FloatingDoodles({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <Star color="#F4D35E" size={32} className="absolute top-[10%] left-[5%] animate-wiggle" />
      <Sparkle color="#7AB8D9" size={24} className="absolute top-[20%] right-[10%] animate-bounce-soft" />
      <Circle color="#B8A9C9" size={30} className="absolute bottom-[30%] left-[8%] animate-sway" />
      <Heart color="#E8B4B8" size={20} className="absolute top-[40%] right-[5%] animate-float" />
      <Scribble color="#E07B5C" className="absolute bottom-[20%] right-[15%] animate-wiggle" />
      <Star color="#8BAF8B" size={20} className="absolute bottom-[10%] left-[20%] animate-bounce-soft" />
    </div>
  );
}
