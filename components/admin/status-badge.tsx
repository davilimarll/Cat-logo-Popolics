import { FunkoStatus } from "@/lib/types";

const colorMap: Record<FunkoStatus, string> = {
  disponível: "bg-emerald-600/20 text-emerald-300",
  reservado: "bg-amber-600/20 text-amber-200",
  escolhido: "bg-blue-600/20 text-blue-200",
  indisponível: "bg-zinc-600/20 text-zinc-200"
};

export function StatusBadge({ status }: { status: FunkoStatus }) {
  return <span className={`rounded-full px-2 py-1 text-xs ${colorMap[status]}`}>{status}</span>;
}
