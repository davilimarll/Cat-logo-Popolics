import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CategoryCard({
  slug,
  label,
  description,
  theme
}: {
  slug: string;
  label: string;
  description: string;
  theme: string;
}) {
  return (
    <article className={`panel overflow-hidden bg-gradient-to-br ${theme} p-6 shadow-ember`}>
      <h2 className="text-2xl font-semibold tracking-wide">{label}</h2>
      <p className="mt-3 text-sm text-brand-muted">{description}</p>
      <Link href={`/categoria/${slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-text">
        Ver coleção <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
