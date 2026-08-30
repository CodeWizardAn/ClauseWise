import Link from "next/link";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClass = size === "sm" ? " logo-sm" : size === "lg" ? " logo-lg" : "";

  return (
    <Link className={`logo${sizeClass}`} href="/">
      <span className="logo-mark" aria-label="ClauseWise Logo">
        <svg
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Dark Charcoal / Slate Gradient for 'C' */}
            <linearGradient id="cg-c-grad" x1="6" y1="6" x2="38" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            {/* Glowing Warm Orange Gradient for 'G' */}
            <linearGradient id="cg-g-grad" x1="14" y1="12" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="50%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>

            {/* Ambient Glow */}
            <filter id="cg-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#F97316" floodOpacity="0.3" />
            </filter>
          </defs>

          {/* Letter 'C' - Bold modern structural arc */}
          <path
            d="M 32 10.5 C 26 5.5 12 6.5 8.5 17 C 5.5 26 12 36.5 25 36.5 C 28.5 36.5 31.5 35 33.5 33"
            stroke="url(#cg-c-grad)"
            strokeWidth="4.2"
            strokeLinecap="round"
          />

          {/* Letter 'G' - Overlapping interlocking inner curve with legal crossbar */}
          <path
            d="M 23 14 C 18 13.5 14 17 14 22 C 14 27.5 18.5 30.5 24 30.5 C 29.5 30.5 34 27 34 21.5 V 21 H 23.5"
            stroke="url(#cg-g-grad)"
            strokeWidth="3.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#cg-glow)"
          />

          {/* Focal Precision Emblem Dot */}
          <circle
            cx="32"
            cy="10.5"
            r="2.6"
            fill="#F97316"
          />
        </svg>
      </span>
      <span className="logo-word">
        Clause<span className="accent">Wise</span>
      </span>
    </Link>
  );
}
