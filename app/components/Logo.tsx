// Rewire Logo - Conceptual illustration of connection/rewiring

export function RewireIcon({
  className = "",
  size = 40,
  color = "currentColor"
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background rounded square */}
      <rect
        x="0"
        y="0"
        width="40"
        height="40"
        rx="10"
        fill={color}
      />

      {/* Rewire concept: Two paths crossing - swapping connections */}
      <g fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
        {/* Top-left to bottom-right path */}
        <path d="M10 12 C 16 12, 20 20, 20 20 C 20 20, 24 28, 30 28" />

        {/* Bottom-left to top-right path */}
        <path d="M10 28 C 16 28, 20 20, 20 20 C 20 20, 24 12, 30 12" />

        {/* Connection nodes at endpoints */}
        <circle cx="10" cy="12" r="2.5" fill="white" stroke="none" />
        <circle cx="10" cy="28" r="2.5" fill="white" stroke="none" />
        <circle cx="30" cy="12" r="2.5" fill="white" stroke="none" />
        <circle cx="30" cy="28" r="2.5" fill="white" stroke="none" />
      </g>
    </svg>
  );
}

export function RewireLogo({
  className = "",
  iconSize = 36,
  showText = true,
  textColor = "#2D2A26",
  iconColor = "#2D2A26"
}: {
  className?: string;
  iconSize?: number;
  showText?: boolean;
  textColor?: string;
  iconColor?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <RewireIcon size={iconSize} color={iconColor} />
      {showText && (
        <span
          className="text-xl tracking-tight"
          style={{ color: textColor, fontFamily: "var(--font-display)", fontWeight: 800 }}
        >
          REWIRE
        </span>
      )}
    </div>
  );
}

// Alternative minimal icon - no background, just the wire illustration
export function RewireIconMinimal({
  className = "",
  size = 40,
  color = "currentColor"
}: {
  className?: string;
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Rewire concept: Two nodes connected by flowing wire */}
      <g fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round">
        {/* Left node */}
        <circle cx="6" cy="20" r="4" fill={color} stroke="none" />

        {/* Right node */}
        <circle cx="34" cy="20" r="4" fill={color} stroke="none" />

        {/* Flowing S-curve wire */}
        <path
          d="M10 20 C 15 20, 15 8, 20 8 C 25 8, 25 32, 30 32 C 32 32, 30 20, 30 20"
          strokeWidth="3"
        />
      </g>
    </svg>
  );
}

// Keep the old components for backwards compatibility
export function Logo({ className = "", size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer circle text path */}
      <defs>
        <path
          id="textCircleTop"
          d="M 100,100 m -70,0 a 70,70 0 1,1 140,0"
          fill="none"
        />
        <path
          id="textCircleBottom"
          d="M 100,100 m 70,0 a 70,70 0 1,1 -140,0"
          fill="none"
        />
      </defs>

      {/* Top text - "AI PARTNER" */}
      <text
        fill="currentColor"
        style={{
          fontSize: "14px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontWeight: 600,
          letterSpacing: "0.15em",
        }}
      >
        <textPath href="#textCircleTop" startOffset="50%" textAnchor="middle">
          AI PARTNER
        </textPath>
      </text>

      {/* Bottom text - "COMPANY" */}
      <text
        fill="currentColor"
        style={{
          fontSize: "14px",
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontWeight: 600,
          letterSpacing: "0.15em",
        }}
      >
        <textPath href="#textCircleBottom" startOffset="50%" textAnchor="middle">
          COMPANY
        </textPath>
      </text>

      {/* Small decorative dots */}
      <circle cx="30" cy="100" r="2" fill="currentColor" />
      <circle cx="170" cy="100" r="2" fill="currentColor" />

      {/* Globe icon in center */}
      <g transform="translate(100, 100)">
        {/* Outer globe circle */}
        <circle
          cx="0"
          cy="0"
          r="32"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Vertical ellipse (meridian) */}
        <ellipse
          cx="0"
          cy="0"
          rx="16"
          ry="32"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Horizontal line (equator) */}
        <line
          x1="-32"
          y1="0"
          x2="32"
          y2="0"
          stroke="currentColor"
          strokeWidth="1.5"
        />

        {/* Top latitude line */}
        <ellipse
          cx="0"
          cy="-14"
          rx="28"
          ry="8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />

        {/* Bottom latitude line */}
        <ellipse
          cx="0"
          cy="14"
          rx="28"
          ry="8"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />

        {/* Second vertical meridian */}
        <ellipse
          cx="0"
          cy="0"
          rx="28"
          ry="32"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
      </g>
    </svg>
  );
}

export function LogoMark({ className = "", size = 40 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Globe icon */}
      <g transform="translate(40, 40)">
        {/* Outer globe circle */}
        <circle
          cx="0"
          cy="0"
          r="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />

        {/* Vertical ellipse (meridian) */}
        <ellipse
          cx="0"
          cy="0"
          rx="16"
          ry="32"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />

        {/* Horizontal line (equator) */}
        <line
          x1="-32"
          y1="0"
          x2="32"
          y2="0"
          stroke="currentColor"
          strokeWidth="2"
        />

        {/* Top latitude line */}
        <ellipse
          cx="0"
          cy="-14"
          rx="28"
          ry="8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />

        {/* Bottom latitude line */}
        <ellipse
          cx="0"
          cy="14"
          rx="28"
          ry="8"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </svg>
  );
}
