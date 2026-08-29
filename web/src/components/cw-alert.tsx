import { Icon, type IconName } from "@/components/icon-sprite";

type Tone = "error" | "warning" | "info" | "success";
const ICON: Record<Tone, IconName> = { error: "risk", warning: "risk", info: "info", success: "shield" };

export function Alert({
  tone = "info", title, children, actions,
}: { tone?: Tone; title: string; children?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <div className={`alert alert-${tone}`} role={tone === "error" ? "alert" : "status"}>
      <Icon name={ICON[tone]} className="alert-icon" />
      <div style={{ minWidth: 0, flex: 1 }}>
        <b>{title}</b>
        {children && <p>{children}</p>}
        {actions && <div className="alert-actions">{actions}</div>}
      </div>
    </div>
  );
}
