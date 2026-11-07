import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { isSupabaseCloudConfigured } from "./client";

export async function createSupabaseServerClient() {
  if (!isSupabaseCloudConfigured()) {
    return null;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(
          cookiesToSet: {
            name: string;
            value: string;
            options?: Record<string, unknown>;
          }[]
        ) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options as Parameters<typeof cookieStore.set>[2])
            );
          } catch {
            // Ignorado quando chamado de um Server Component de leitura
          }
        },
      },
    }
  );
}
