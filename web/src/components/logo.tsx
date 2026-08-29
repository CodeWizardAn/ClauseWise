import Link from "next/link";

export function Logo({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <Link className={`logo${size === "lg" ? " logo-lg" : ""}`} href="/">
      <span className="logo-mark">
        <svg
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"
          strokeLinecap="round" strokeLinejoin="round"
          style={{ color: "var(--cw-accent-dark)" }} aria-hidden="true"
        >
          <path d="M14.5 2.75H6.75A1.75 1.75 0 0 0 5 4.5v15a1.75 1.75 0 0 0 1.75 1.75h10.5A1.75 1.75 0 0 0 19 19.5V7.25z" />
          <path d="M14.25 2.75v3.5a1.5 1.5 0 0 0 1.5 1.5h3.25" />
          <path d="M8.5 12.25h7" stroke="var(--cw-accent)" strokeWidth="2.6" />
          <path d="M8.5 16h4" />
        </svg>
      </span>
      <span className="logo-word">
        Clause<span className="accent">Wise</span>
      </span>
    </Link>
  );
}
