// ClauseWise icon system.
// Rule: the glyph is ink; the single orange element is what ClauseWise found
// in your document. --cw-icon-accent collapses it to currentColor on
// coloured surfaces so nothing disappears.
export function IconSprite() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }} aria-hidden="true">
      <symbol id="i-doc" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6.25 3.5h7.5l4.25 4.25V20A1.5 1.5 0 0 1 16.5 21.5h-10A1.5 1.5 0 0 1 5 20V5A1.5 1.5 0 0 1 6.5 3.5Z"/><path d="M13.5 3.6v3.4a1 1 0 0 0 1 1h3.4"/><path d="M8 17.2h4.5"/></g><rect x="7.6" y="11.4" width="7.2" height="2.3" rx="1.15" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-ask" viewBox="0 0 24 24"><path d="M20.5 15.25A1.75 1.75 0 0 1 18.75 17H8.4L4 20.6V5.75A1.75 1.75 0 0 1 5.75 4h13A1.75 1.75 0 0 1 20.5 5.75Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="8.6" cy="10.4" r="1.15" fill="currentColor"/><circle cx="12.25" cy="10.4" r="1.15" fill="var(--cw-icon-accent,var(--cw-accent))"/><circle cx="15.9" cy="10.4" r="1.15" fill="currentColor"/></symbol>
      <symbol id="i-plain" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M4 6.5h16"/><path d="M4 17.5h9.5"/></g><rect x="4" y="10.85" width="12" height="2.3" rx="1.15" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-risk" viewBox="0 0 24 24"><path d="M10.92 4.02 2.4 18.9a1.25 1.25 0 0 0 1.08 1.87h17.04a1.25 1.25 0 0 0 1.08-1.87L13.08 4.02a1.25 1.25 0 0 0-2.16 0Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><rect x="11" y="9.4" width="2" height="5.1" rx="1" fill="var(--cw-icon-accent,var(--cw-accent))"/><circle cx="12" cy="17.4" r="1.15" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-compare" viewBox="0 0 24 24"><path d="M3.4 8.6h14.2M13.9 4.9l3.7 3.7-3.7 3.7" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.6 15.4H6.4M10.1 19.1 6.4 15.4l3.7-3.7" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-book" viewBox="0 0 24 24"><path d="M4.6 5.4A2.4 2.4 0 0 1 7 3h11.4a1 1 0 0 1 1 1v14.2a1 1 0 0 1-1 1H7a2.4 2.4 0 0 0-2.4 2.4Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M12.4 3v8.2l2.5-1.9 2.5 1.9V3Z" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-translate" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3.25 6.1h7.4M6.95 6.1V4.3"/><path d="M9.2 6.1c0 3.5-2.3 6.4-5.95 7.7"/><path d="M5.1 9.9c.95 1.85 2.5 3.15 4.6 3.85"/></g><path d="M12.9 20.6l3.5-8.6 3.5 8.6M14.35 17.3h4.1" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-upload" viewBox="0 0 24 24"><path d="M4.25 15.4v3.35A1.75 1.75 0 0 0 6 20.5h12a1.75 1.75 0 0 0 1.75-1.75V15.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 15.6V3.9M7.9 7.9 12 3.8l4.1 4.1" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-home" viewBox="0 0 24 24"><path d="M3.6 10.7 12 3.6l8.4 7.1v9.05A1.75 1.75 0 0 1 18.65 21.5H5.35A1.75 1.75 0 0 1 3.6 19.75Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9.9 21.5v-6.2a.9.9 0 0 1 .9-.9h2.4a.9.9 0 0 1 .9.9v6.2Z" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-loan" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3.2" width="13" height="17.6" rx="2"/><path d="M7.4 8h6.2M7.4 11.6h4"/></g><circle cx="17" cy="16.6" r="4.2" fill="var(--cw-icon-accent,var(--cw-accent))" stroke="#FFFCF8" strokeWidth="1.6"/></symbol>
      <symbol id="i-tos" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="4.4" y="3.4" width="15.2" height="17.2" rx="2"/><path d="M8 8.2h8M8 11.7h5"/></g><path d="M8 16.35l2.05 2.05 4.25-4.25" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-work" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"><rect x="3.4" y="6.9" width="17.2" height="13.7" rx="2"/><path d="M8.9 6.9V5.4A1.5 1.5 0 0 1 10.4 3.9h3.2a1.5 1.5 0 0 1 1.5 1.5v1.5"/></g><rect x="8.4" y="12.55" width="7.2" height="2.3" rx="1.15" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-govt" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3.6" y="3.2" width="14.8" height="17.6" rx="2"/><path d="M7 7.6h8M7 11h5"/></g><circle cx="16.4" cy="16.4" r="4.4" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="2"/><circle cx="16.4" cy="16.4" r="1.5" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-shield" viewBox="0 0 24 24"><path d="M12 3.1 5.2 5.6v5.85c0 4.5 2.9 7.65 6.8 8.75 3.9-1.1 6.8-4.25 6.8-8.75V5.6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M9.15 11.85 11.3 14l4.05-4.15" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-trash" viewBox="0 0 24 24"><path d="M6.3 8.4l.85 11.05A1.6 1.6 0 0 0 8.75 21h6.5a1.6 1.6 0 0 0 1.6-1.55L17.7 8.4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><rect x="3.6" y="5.9" width="16.8" height="2.5" rx="1.25" fill="var(--cw-icon-accent,var(--cw-accent))"/><path d="M9.6 5.9V4.6A1.4 1.4 0 0 1 11 3.2h2a1.4 1.4 0 0 1 1.4 1.4v1.3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></symbol>
      <symbol id="i-notrain" viewBox="0 0 24 24"><path d="M3.2 12s3.6-6 8.8-6 8.8 6 8.8 6-3.6 6-8.8 6-8.8-6-8.8-6Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><circle cx="12" cy="12" r="2.5" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M4.6 19.4 19.4 4.6" fill="none" stroke="var(--cw-icon-accent,var(--cw-accent))" strokeWidth="2.2" strokeLinecap="round"/></symbol>
      <symbol id="i-spark" viewBox="0 0 24 24"><path d="M10.4 2.2c.55 4.05 2.75 6.25 6.8 6.8-4.05.55-6.25 2.75-6.8 6.8-.55-4.05-2.75-6.25-6.8-6.8 4.05-.55 6.25-2.75 6.8-6.8Z" fill="var(--cw-icon-accent,var(--cw-accent))"/><path d="M18 14.4c.3 2.05 1.4 3.15 3.45 3.45-2.05.3-3.15 1.4-3.45 3.45-.3-2.05-1.4-3.15-3.45-3.45 2.05-.3 3.15-1.4 3.45-3.45Z" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M4.5 12h14M12.8 6.3 18.5 12l-5.7 5.7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-chev" viewBox="0 0 24 24"><path d="M6.5 9.75 12 15.25l5.5-5.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-globe" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2"/><path d="M12 3.4a13.4 13.4 0 0 1 0 17.2 13.4 13.4 0 0 1 0-17.2Z"/></g></symbol>
      <symbol id="i-menu" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></symbol>
      <symbol id="i-close" viewBox="0 0 24 24"><path d="M6.6 6.6l10.8 10.8M17.4 6.6 6.6 17.4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round"/></symbol>
      <symbol id="i-play" viewBox="0 0 24 24"><path d="M8 5.6v12.8L18.4 12Z" fill="var(--cw-icon-accent,var(--cw-accent))"/></symbol>
      <symbol id="i-check" viewBox="0 0 24 24"><path d="M5.2 12.6 9.6 17l9.2-9.6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></symbol>
      <symbol id="i-search" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><circle cx="10.9" cy="10.9" r="6.6"/><path d="M15.7 15.7 20.4 20.4"/></g></symbol>
      <symbol id="i-info" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="8.6"/><path d="M12 11.2v5M12 8.1h.01"/></g></symbol>
      <symbol id="i-ext" viewBox="0 0 24 24"><path d="M7.4 16.6 16.6 7.4M9.6 7.4h7v7" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></symbol>
    </svg>
  );
}

export type IconName =
  | "doc"
  | "ask"
  | "plain"
  | "risk"
  | "compare"
  | "book"
  | "translate"
  | "upload"
  | "home"
  | "loan"
  | "tos"
  | "work"
  | "govt"
  | "shield"
  | "trash"
  | "notrain"
  | "spark"
  | "arrow"
  | "chev"
  | "globe"
  | "menu"
  | "close"
  | "play"
  | "check"
  | "search"
  | "info"
  | "ext";

export function Icon({
  name,
  className,
  ...rest
}: { name: IconName; className?: string } & React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} {...rest}>
      <use href={`#i-${name}`} />
    </svg>
  );
}
