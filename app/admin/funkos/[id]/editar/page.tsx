import { notFound } from "next/navigation";
import { FunkoForm } from "@/components/admin/funko-form";
import { createClient } from "@/lib/supabase/server";

export default async function EditFunkoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("funkos").select("*").eq("id", id).single();

  if (!data) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Editar Funko</h1>
      <FunkoForm funko={data} />
    </div>
  );
}
