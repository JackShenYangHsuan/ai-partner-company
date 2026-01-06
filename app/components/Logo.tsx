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
