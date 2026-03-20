import { CategoryCard } from "@/components/public/category-card";
import { BRAND_NAME, CATEGORY_META } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="panel bg-gradient-to-br from-black/70 to-brand-panel p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.3em] text-brand-muted">Catálogo de Rifas</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-wide md:text-5xl">{BRAND_NAME}</h1>
        <p className="mt-4 max-w-2xl text-brand-muted">
          Coleção exclusiva de Funkos em uma experiência premium dark fantasy. Explore as três rifas e escolha seu item direto no WhatsApp.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {Object.entries(CATEGORY_META).map(([slug, meta]) => (
          <CategoryCard key={slug} slug={slug} label={meta.label} description={meta.description} theme={meta.theme} />
        ))}
      </section>
    </div>
  );
}
