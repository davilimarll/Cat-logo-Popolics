"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <form onSubmit={onSubmit} className="panel mx-auto w-full max-w-md space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Acesso administrativo</h1>
      <p className="text-sm text-brand-muted">Entre com seu e-mail e senha do Supabase Auth.</p>
      <input
        type="email"
        required
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2"
      />
      <input
        type="password"
        required
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full rounded-xl border border-brand-border bg-black/40 px-4 py-2"
      />
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button disabled={loading} className="btn-primary w-full disabled:opacity-50">
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
