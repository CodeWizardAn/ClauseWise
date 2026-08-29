"use client";
import { useEffect, useState } from "react";
import { Icon, type IconName } from "@/components/icon-sprite";

export type ToastTone = "info" | "success" | "error";
type Item = { id: number; text: string; tone: ToastTone };

let seq = 0;
const listeners = new Set<(t: Item) => void>();

/** Fire a toast from anywhere: toast("Analysis deleted", "success") */
export function toast(text: string, tone: ToastTone = "info") {
  const item = { id: ++seq, text, tone };
  listeners.forEach((l) => l(item));
}

const ICON: Record<ToastTone, IconName> = { info: "info", success: "check", error: "risk" };

export function Toaster() {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const add = (t: Item) => {
      setItems((cur) => [...cur, t]);
      setTimeout(() => setItems((cur) => cur.filter((x) => x.id !== t.id)), 3600);
    };
    listeners.add(add);
    return () => { listeners.delete(add); };
  }, []);

  if (!items.length) return null;
  return (
    <div className="toaster" role="region" aria-label="Notifications">
      {items.map((t) => (
        <div className={`toast toast-${t.tone}`} key={t.id} role="status">
          <Icon name={ICON[t.tone]} className="toast-icon" />
          <span>{t.text}</span>
          <button className="toast-x" aria-label="Dismiss"
            onClick={() => setItems((cur) => cur.filter((x) => x.id !== t.id))}>
            <Icon name="close" />
          </button>
        </div>
      ))}
    </div>
  );
}
