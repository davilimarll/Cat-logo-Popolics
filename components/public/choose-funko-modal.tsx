"use client";

import { FormEvent, useMemo, useState } from "react";
import { ACCESS_CODE, WHATSAPP_NUMBER } from "@/lib/constants";
import { buildWhatsappMessage } from "@/lib/utils";
import type { Funko } from "@/lib/types";

export function ChooseFunkoModal({ funko }: { funko: Funko }) {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const whatsappUrl = useMemo(() => {
    const msg = buildWhatsappMessage({
      categoria: funko.categoria,
      nome: funko.nome,
      descricao: funko.descricao,
      imageUrl: funko.image_url
    });
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
  }, [funko]);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (code.trim().toLowerCase() !== ACCESS_CODE.toLowerCase()) {
      setError("Código inválido. Confira e tente novamente.");
      return;
    }
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn-primary w-full text-sm">
        Escolher este Funko
      </button>
      {open && (
        <div className="fixed inset-0 z-40 grid place-items-center bg-black/70 p-4">
          <div className="panel w-full max-w-md p-6">
            <h4 className="text-lg font-semibold">Confirmar escolha</h4>
            <p className="mt-2 text-sm text-brand-muted">Digite o código de acesso para seguir para o WhatsApp.</p>
            <form onSubmit={onSubmit} className="mt-5 space-y-4">
              <input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  setError("");
                }}
                placeholder="Código de acesso"
                className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2 outline-none ring-brand-fire/50 focus:ring"
              />
              {error && <p className="text-sm text-red-400">{error}</p>}
              <div className="flex gap-2">
                <button type="submit" className="btn-primary flex-1">
                  Ir para o WhatsApp
                </button>
                <button type="button" onClick={() => setOpen(false)} className="btn-secondary flex-1">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
