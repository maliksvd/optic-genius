export const useProfile = async () => {
  /**
   * Fetches the user's profile data from the database
   * @returns {Object} user - The user's data from supabase auth
   * @returns {Object} profileData - The user's profile data from the database
   * @returns {Object} error - The error object
   * @returns {Object} id - The user's id
   *
   */
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const id = ref(user.value?.id);
  const { data: data, error } = await client
    .from("users_production")
    .select("*")
    .eq("id", id.value as string)
    .single();

  return { data, error, id };
};
