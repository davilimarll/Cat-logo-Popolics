import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const [{ count: total }, { count: disponiveis }] = await Promise.all([
    supabase.from("funkos").select("*", { count: "exact", head: true }),
    supabase.from("funkos").select("*", { count: "exact", head: true }).eq("status", "disponível")
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <article className="panel p-6">
        <p className="text-sm text-brand-muted">Total de Funkos</p>
        <p className="mt-2 text-3xl font-semibold">{total ?? 0}</p>
      </article>
      <article className="panel p-6">
        <p className="text-sm text-brand-muted">Disponíveis</p>
        <p className="mt-2 text-3xl font-semibold">{disponiveis ?? 0}</p>
      </article>
      <article className="panel p-6">
        <p className="text-sm text-brand-muted">Atalho</p>
        <Link href="/admin/funkos/novo" className="btn-primary mt-2">
          Cadastrar novo Funko
        </Link>
      </article>
    </div>
  );
}
