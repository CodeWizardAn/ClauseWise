import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ScrollBlur } from "@/components/scroll-blur";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { CompareScreen } from "@/components/compare/compare-screen";

export const metadata = {
  title: "Document Version Comparison & Diff — ClauseWise",
  description:
    "Compare two drafts of an Indian rental, loan, or employment agreement side-by-side to detect newly added risk clauses and altered numbers.",
};

export default function ComparePage() {
  return (
    <>
      <ScrollProgress className="scroll-progress" />
      <ScrollBlur />
      <SiteHeader />

      <main id="content" style={{ minHeight: "80vh", paddingTop: "96px" }}>
        <CompareScreen />
      </main>

      <SiteFooter />
    </>
  );
}
