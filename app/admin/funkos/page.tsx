import Link from "next/link";
import { CATEGORY_META, CATEGORIES } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { StatusBadge } from "@/components/admin/status-badge";

export default async function AdminFunkosPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; categoria?: string }>;
}) {
  const { q = "", categoria = "" } = await searchParams;
  const supabase = await createClient();

  let query = supabase.from("funkos").select("*").order("created_at", { ascending: false });
  if (q) query = query.ilike("nome", `%${q}%`);
  if (categoria && CATEGORIES.includes(categoria as (typeof CATEGORIES)[number])) {
    query = query.eq("categoria", categoria);
  }

  const { data } = await query;

  return (
    <div className="space-y-4">
      <form className="panel grid gap-3 p-4 sm:grid-cols-[1fr_220px_auto]">
        <input
          name="q"
          defaultValue={q}
          placeholder="Buscar por nome"
          className="rounded-xl border border-brand-border bg-black/40 px-4 py-2"
        />
        <select name="categoria" defaultValue={categoria} className="rounded-xl border border-brand-border bg-black/40 px-4 py-2">
          <option value="">Todas categorias</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_META[cat].label}
            </option>
          ))}
        </select>
        <button className="btn-secondary">Filtrar</button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-brand-border">
        <table className="min-w-full divide-y divide-brand-border text-sm">
          <thead className="bg-black/40">
            <tr>
              <th className="px-4 py-3 text-left">Nome</th>
              <th className="px-4 py-3 text-left">Categoria</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {data?.length ? (
              data.map((funko) => (
                <tr key={funko.id} className="border-t border-brand-border/60">
                  <td className="px-4 py-3">{funko.nome}</td>
                  <td className="px-4 py-3">{funko.categoria}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={funko.status} />
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/funkos/${funko.id}/editar`} className="btn-secondary text-xs">
                      Editar
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-6 text-brand-muted" colSpan={4}>
                  Nenhum Funko cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
