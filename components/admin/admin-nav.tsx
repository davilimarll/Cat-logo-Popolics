"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/funkos", label: "Funkos" },
  { href: "/admin/funkos/novo", label: "Novo Funko" }
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 rounded-xl border border-brand-border bg-black/30 p-3">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={cn(
            "rounded-lg px-3 py-2 text-sm",
            pathname === link.href ? "bg-brand-fire/20 text-brand-text" : "text-brand-muted hover:bg-brand-border/20"
          )}
        >
          {link.label}
        </Link>
      ))}
      <button
        className="btn-secondary ml-auto text-xs"
        onClick={async () => {
          const supabase = createClient();
          await supabase.auth.signOut();
          router.push("/login");
          router.refresh();
        }}
      >
        Sair
      </button>
    </div>
  );
}
