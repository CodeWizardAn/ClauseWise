"use client";
import { useEffect, useState } from "react";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

/**
 * Fixed progressive-blur edges.
 *
 * Top    — content softens as it slides up under the floating nav. Hidden at
 *          scroll 0, where the nav is transparent over the hero and a blur
 *          strip would only smudge the headline.
 * Bottom — a shallow lift so content rises into view rather than butting the
 *          viewport edge. Fades out near the page end so the footer stays crisp.
 *
 * Blur levels are deliberately short (3 layers, max 5px). Each level is a
 * separate backdrop-filter; two always-on stacks get expensive on the
 * mid-range Android this product targets.
 */
export function ScrollBlur() {
  const [top, setTop] = useState(false);
  const [bottom, setBottom] = useState(true);

  useEffect(() => {
    const sync = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setTop(y > 40);
      setBottom(max - y > 260);
    };
    sync();
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  return (
    <>
      <div className={`edge-blur edge-blur-top${top ? " on" : ""}`} aria-hidden="true">
        <ProgressiveBlur position="top" height="100%" blurLevels={[0.5, 1.6, 4]} />
      </div>
      <div className={`edge-blur edge-blur-bottom${bottom ? " on" : ""}`} aria-hidden="true">
        <ProgressiveBlur position="bottom" height="100%" blurLevels={[0.5, 1.6, 4.5]} />
      </div>
    </>
  );
}
