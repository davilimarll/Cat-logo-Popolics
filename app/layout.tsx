import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { BRAND_NAME, CATEGORY_META } from "@/lib/constants";

export const metadata: Metadata = {
  title: `${BRAND_NAME} | Catálogo de Rifas de Funkos`,
  description:
    "Catálogo premium de rifas de Funkos com visual dark fantasy. Escolha seu Funko e continue no WhatsApp.",
  openGraph: {
    title: `${BRAND_NAME} | Catálogo de Rifas de Funkos`,
    description: "Explore as rifas Dothraki, Dracarys e Iron Throne.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="border-b border-brand-border/70 bg-black/30">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-semibold tracking-widest text-brand-text">
              {BRAND_NAME}
            </Link>
            <nav className="flex gap-2 text-sm">
              {Object.entries(CATEGORY_META).map(([slug, meta]) => (
                <Link
                  key={slug}
                  href={`/categoria/${slug}`}
                  className="rounded-lg px-3 py-2 text-brand-muted transition hover:bg-brand-border/30 hover:text-brand-text"
                >
                  {meta.label}
                </Link>
              ))}
              <Link href="/login" className="btn-secondary text-xs">
                Admin
              </Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
