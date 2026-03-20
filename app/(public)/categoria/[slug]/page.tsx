import { notFound } from "next/navigation";
import { EmptyState } from "@/components/public/empty-state";
import { FunkoCard } from "@/components/public/funko-card";
import { CATEGORY_META, CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!CATEGORIES.includes(slug as (typeof CATEGORIES)[number])) {
    notFound();
  }

  const supabase = await createClient();
  const { data } = await supabase
    .from("funkos")
    .select("*")
    .eq("categoria", slug)
    .eq("status", "disponível")
    .order("created_at", { ascending: false });

  const meta = CATEGORY_META[slug as keyof typeof CATEGORY_META];

  return (
    <div className="space-y-6">
      <header className={`panel bg-gradient-to-r ${meta.theme} p-6`}>
        <h1 className="text-3xl font-semibold">{meta.label}</h1>
        <p className="mt-2 text-sm text-brand-muted">{meta.description}</p>
      </header>

      {!data?.length ? (
        <EmptyState
          title="Nenhum Funko disponível agora"
          description="Esta rifa ainda não tem itens publicados. Volte em breve para ver as novidades do catálogo."
        />
      ) : (
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((funko) => (
            <FunkoCard key={funko.id} funko={funko} />
          ))}
        </section>
      )}
    </div>
  );
}
