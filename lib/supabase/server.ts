import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // Em Server Components, o Next pode bloquear mutação de cookies.
          // O Supabase recomenda ignorar essa etapa quando não houver permissão.
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              (cookieStore as { set?: (n: string, v: string, o?: Record<string, unknown>) => void }).set?.(
                name,
                value,
                options
              );
            });
          } catch {
            // Ignora em contextos somente leitura (ex.: render server-side).
          }
        }
      }
    }
  );
}
