import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { data: cities } = await client.from("cities").select("*");

  return { cities };
});
