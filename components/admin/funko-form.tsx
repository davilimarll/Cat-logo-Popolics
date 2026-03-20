"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { CATEGORIES, CATEGORY_META, FUNKO_STATUSES } from "@/lib/constants";
import type { Funko } from "@/lib/types";
import { createFunko, deleteFunko, updateFunko } from "@/app/admin/funkos/actions";

export function FunkoForm({ funko }: { funko?: Funko }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const action = (formData: FormData) => {
    startTransition(async () => {
      try {
        if (funko) {
          await updateFunko(funko.id, formData);
          setSuccess("Funko atualizado com sucesso.");
        } else {
          await createFunko(formData);
          setSuccess("Funko criado com sucesso.");
        }
        setError("");
        router.push("/admin/funkos");
        router.refresh();
      } catch (err) {
        setSuccess("");
        setError(err instanceof Error ? err.message : "Erro inesperado");
      }
    });
  };

  const remove = () => {
    if (!funko) return;
    startTransition(async () => {
      try {
        await deleteFunko(funko.id);
        router.push("/admin/funkos");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao excluir");
      }
    });
  };

  return (
    <form action={action} className="panel space-y-4 p-6">
      <div>
        <label className="mb-1 block text-sm">Nome</label>
        <input name="nome" defaultValue={funko?.nome} required className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm">Slug (opcional)</label>
        <input name="slug" defaultValue={funko?.slug ?? ""} className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm">Categoria</label>
          <select name="categoria" defaultValue={funko?.categoria ?? "dothraki"} className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2">
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_META[cat].label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-sm">Status</label>
          <select name="status" defaultValue={funko?.status ?? "disponível"} className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2">
            {FUNKO_STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="mb-1 block text-sm">Descrição (opcional)</label>
        <textarea name="descricao" defaultValue={funko?.descricao ?? ""} rows={4} className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2" />
      </div>
      <div>
        <label className="mb-1 block text-sm">Imagem</label>
        <input name="imagem" type="file" accept="image/*" className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2" />
        {funko?.image_url && <img src={funko.image_url} alt={funko.nome} className="mt-3 h-32 rounded-xl object-cover" />}
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-emerald-400">{success}</p>}
      <div className="flex flex-wrap gap-2">
        <button disabled={isPending} className="btn-primary disabled:opacity-50">
          {isPending ? "Salvando..." : funko ? "Salvar alterações" : "Criar Funko"}
        </button>
        {funko && (
          <button type="button" onClick={remove} className="btn-secondary text-red-300" disabled={isPending}>
            Excluir
          </button>
        )}
      </div>
    </form>
  );
}
