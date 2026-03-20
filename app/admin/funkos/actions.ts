"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { CATEGORIES, FUNKO_STATUSES } from "@/lib/constants";
import { slugify } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  nome: z.string().min(2, "Nome deve ter ao menos 2 caracteres."),
  slug: z.string().optional(),
  categoria: z.enum(CATEGORIES),
  descricao: z.string().optional(),
  status: z.enum(FUNKO_STATUSES)
});

async function uploadImage(formData: FormData, existingImage?: string | null) {
  const file = formData.get("imagem") as File | null;
  if (!file || file.size === 0) return existingImage ?? null;

  const ext = file.name.split(".").pop() ?? "jpg";
  const path = `funkos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const bytes = await file.arrayBuffer();

  const supabase = await createClient();
  const { error } = await supabase.storage.from("funkos").upload(path, bytes, {
    upsert: false,
    contentType: file.type
  });

  if (error) {
    throw new Error(`Erro no upload da imagem: ${error.message}`);
  }

  const {
    data: { publicUrl }
  } = supabase.storage.from("funkos").getPublicUrl(path);

  return publicUrl;
}

export async function createFunko(formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Dados inválidos");
  }

  const supabase = await createClient();
  const image_url = await uploadImage(formData);

  const payload = {
    ...parsed.data,
    slug: parsed.data.slug?.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.nome),
    descricao: parsed.data.descricao?.trim() || null,
    image_url
  };

  const { error } = await supabase.from("funkos").insert(payload);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/funkos");
  revalidatePath(`/categoria/${parsed.data.categoria}`);
}

export async function updateFunko(id: string, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    throw new Error(parsed.error.issues[0]?.message ?? "Dados inválidos");
  }

  const supabase = await createClient();

  const { data: current } = await supabase.from("funkos").select("image_url").eq("id", id).single();
  const image_url = await uploadImage(formData, current?.image_url);

  const { error } = await supabase
    .from("funkos")
    .update({
      ...parsed.data,
      slug: parsed.data.slug?.trim() ? slugify(parsed.data.slug) : slugify(parsed.data.nome),
      descricao: parsed.data.descricao?.trim() || null,
      image_url,
      updated_at: new Date().toISOString()
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath("/admin/funkos");
  revalidatePath(`/categoria/${parsed.data.categoria}`);
}

export async function deleteFunko(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("funkos").delete().eq("id", id);
  if (error) throw new Error(error.message);

  revalidatePath("/admin/funkos");
}
