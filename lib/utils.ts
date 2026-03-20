import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function buildWhatsappMessage({
  categoria,
  nome,
  descricao,
  imageUrl
}: {
  categoria: string;
  nome: string;
  descricao?: string | null;
  imageUrl?: string | null;
}) {
  const lines = [
    "Olá! Escolhi este Funko da rifa Popolics Club.",
    `Categoria: ${categoria}`,
    `Funko: ${nome}`
  ];

  if (descricao?.trim()) {
    lines.push(`Descrição: ${descricao}`);
  }

  if (imageUrl?.trim()) {
    lines.push(`Imagem: ${imageUrl}`);
  }

  return lines.join("\n");
}
