import { SignUp } from "@clerk/nextjs";

export const metadata = { title: "Sign Up — ClauseWise" };

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "var(--cw-surface-warm)" }}>
      <SignUp />
    </div>
  );
}
