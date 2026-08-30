"use client";

import { useEffect, useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";

import { Logo } from "@/components/logo";
import { CommandMenu } from "@/components/command-menu";
import { Icon, type IconName } from "@/components/icon-sprite";

/**
 * Signed-in app shell, ported from the design system.
 */
const NAV: { href: string; icon: IconName; label: string }[] = [
  { href: "/dashboard", icon: "home", label: "Dashboard" },
  { href: "/compare", icon: "compare", label: "Compare" },
  { href: "/glossary", icon: "book", label: "Glossary" },
];

/** Sidebar collapse is a display preference — no document data is stored. */
const RAIL_KEY = "cw:rail";

function readRail(): boolean {
  try {
    return localStorage.getItem(RAIL_KEY) === "1";
  } catch {
    return false;
  }
}

export function AppShell({
  active,
  crumb,
  actions,
  children,
  flush = false,
}: {
  active: string;
  crumb: React.ReactNode;
  actions?: React.ReactNode;
  children: React.ReactNode;
  flush?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    setCollapsed(readRail());
  }, []);

  function toggleRail() {
    setCollapsed((v) => {
      try {
        localStorage.setItem(RAIL_KEY, v ? "0" : "1");
      } catch {
        /* private mode — the preference just does not persist */
      }
      return !v;
    });
  }

  const name = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Your account";

  return (
    <div className={`app${collapsed ? " rail" : ""}`}>
      <aside className={`sidebar${open ? " open" : ""}`}>
        <div className="side-top">
          <Logo />
          <button
            className="rail-toggle btn btn-ghost btn-icon btn-sm"
            onClick={toggleRail}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!collapsed}
          >
            <Icon name="chev" />
          </button>
        </div>

        <nav className="side-nav">
          {NAV.map((n) => (
            <a
              key={n.label}
              className={`side-link${n.label === active ? " active" : ""}`}
              href={n.href}
              title={collapsed ? n.label : undefined}
              aria-current={n.label === active ? "page" : undefined}
            >
              <Icon name={n.icon} />
              <span className="side-label-text">{n.label}</span>
            </a>
          ))}
        </nav>

        <div className="side-foot">
          <a className="side-link" href="/" title="Back to the site">
            <Icon name="info" />
            <span className="side-label-text">About ClauseWise</span>
          </a>
          <div className="side-user">
            <UserButton />
            <span style={{ minWidth: 0 }}>
              <span
                className="h5"
                style={{
                  display: "block",
                  lineHeight: 1.25,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {name}
              </span>
              <span className="tiny" style={{ display: "block" }}>
                Analyses encrypted to this account
              </span>
            </span>
          </div>
        </div>
      </aside>

      <div className="main">
        <a className="skip-link" href="#content">
          Skip to content
        </a>
        <div className="topbar">
          <div className="crumb">
            <button
              className="btn btn-ghost btn-icon nav-toggle"
              aria-label="Menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name="menu" />
            </button>
            {crumb}
          </div>
          <div className="row g12">
            <button
              className="searchbar"
              onClick={() => window.dispatchEvent(new Event("cw:open-command"))}
              aria-label="Search your saved analyses"
            >
              <Icon name="search" />
              <span>Search analyses…</span>
              <span className="kbd">⌘K</span>
            </button>
            {actions}
          </div>
        </div>
        {flush ? children : (
          <main id="content" className="page">
            {children}
          </main>
        )}
      </div>

      {/* Searches the signed-in user's real saved analyses. */}
      <CommandMenu />
    </div>
  );
}
