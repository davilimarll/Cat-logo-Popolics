import { FunkoForm } from "@/components/admin/funko-form";

export default function NewFunkoPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Novo Funko</h1>
      <FunkoForm />
    </div>
  );
}
