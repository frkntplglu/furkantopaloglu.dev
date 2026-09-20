import { profile } from "@/data/profile";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-4xl px-6 py-6 font-mono text-xs text-muted-foreground">
        © {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  );
}
