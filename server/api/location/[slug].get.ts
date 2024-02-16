import { serverSupabaseClient } from '#supabase/server'

export default defineEventHandler(async (event) => {
  const client = await serverSupabaseClient(event)

  const { slug } = event.context.params as { city: string };

  if (slug !== undefined) {

    const { data:location } = await client
      .from('locations_prod')
      .select('*')
      .eq('slug', slug)
      .single()

    return location;
  } else {
    // Gérer le cas où 'city' est undefined
    return { location: [] }
  }
})
