import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event);

  const { city } = event.context.params as { city: string };
  const { borough } = getQuery(event);
  const { featured } = getQuery(event);
  const { limit } = getQuery(event);

  if (city !== undefined) {
    let query = client
      .from("locations_production")
      .select("*")
      .eq("city", city);

    if (borough !== undefined) {
      query = query.eq("borough", borough);
    } else if (featured !== undefined) {
      query = query.eq("featured", featured as NonNullable<boolean>);
    } else if (limit !== undefined) {
      query = query.limit(limit as NonNullable<number>);
    }

    const { data } = await query;

    return { locations: data };
  } else {
    // Gérer le cas où 'city' est undefined
    return { locations: [] && "city is undefined" };
  }
});
