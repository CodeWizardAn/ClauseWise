import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollBlur } from "@/components/scroll-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { GlossaryView } from "@/components/glossary/glossary-view";

export const metadata = {
  title: "Legal Glossary & Contract Clause Dictionary — ClauseWise",
  description:
    "Plain-language definitions and risk explanations for common terms in Indian rental agreements, loan documents, and employment contracts.",
};

export default function GlossaryPage() {
  return (
    <>
      <ScrollProgress className="scroll-progress" />
      <ScrollBlur />
      <SiteHeader />

      <main id="content" style={{ minHeight: "80vh", paddingTop: "96px" }}>
        <GlossaryView />
      </main>

      <SiteFooter />
    </>
  );
}
