import { serverSupabaseClient } from "#supabase/server";

interface Borough {
  label: string;
  value: string;
  latitude: number;
  longitude: number;
}

interface City {
  city: string;
  boroughs: Borough[];
}

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);
  const query = getQuery(event);
  const city = query.city as string;

  const { data } = await client.from("boroughs").select("*").eq("city", city);

  const boroughs = (data as { boroughs: Borough[] }[])[0]?.boroughs;

  return { boroughs };
});
