import Image from "next/image";
import type { Funko } from "@/lib/types";
import { ChooseFunkoModal } from "@/components/public/choose-funko-modal";

export function FunkoCard({ funko }: { funko: Funko }) {
  return (
    <article className="panel overflow-hidden">
      <div className="relative aspect-square w-full bg-black/30">
        {funko.image_url ? (
          <Image src={funko.image_url} alt={funko.nome} fill className="object-cover" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-brand-muted">Sem imagem</div>
        )}
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold">{funko.nome}</h3>
        <p className="text-xs uppercase tracking-wide text-brand-muted">{funko.categoria}</p>
        {funko.descricao && <p className="line-clamp-3 text-sm text-brand-muted">{funko.descricao}</p>}
        <ChooseFunkoModal funko={funko} />
      </div>
    </article>
  );
}
