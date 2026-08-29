import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PersonaTabs } from "@/components/persona-tabs";
import { Icon } from "@/components/icon-sprite";
import { ScrollBlur } from "@/components/scroll-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";

import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { Showcase } from "@/components/sections/showcase";
import { DocTypes } from "@/components/sections/doctypes";
import { Multilingual } from "@/components/sections/multilingual";
import { Privacy } from "@/components/sections/privacy";
import { FinalCta } from "@/components/sections/finalcta";

/**
 * Public landing page.
 *
 * Marketing only — it reads no user data and calls no API. The signed-in app
 * lives at /dashboard and /analysis/[id], both of which re-check the session
 * server-side.
 */
export default function Home() {
  return (
    <>
      <ScrollProgress className="scroll-progress" />
      <ScrollBlur />
      <a className="skip-link" href="#content">
        Skip to content
      </a>
      <SiteHeader />

      <main id="content">
        <Hero />
        <Intro />
        <Showcase />
        <DocTypes />

        <section className="section">
          <div className="container">
            <div className="stack center tac g16" style={{ maxWidth: 700, margin: "0 auto" }}>
              <h2 className="h2 balance">
                Anyone who has to sign
                <br />
                something can use ClauseWise
              </h2>
              <p className="lead balance" style={{ maxWidth: "56ch" }}>
                From tenants and students to first-time borrowers and new employees — the same
                clause, explained for the person it affects.
              </p>
            </div>
            <PersonaTabs />
          </div>
        </section>

        <Multilingual />
        <Privacy />
        <FinalCta />
      </main>

      <SiteFooter />

      <a className="launcher" href="/dashboard" aria-label="Upload a document">
        <Icon name="upload" />
      </a>
    </>
  );
}
