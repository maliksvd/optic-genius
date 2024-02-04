export const useProfile = async () => {
  const client = useSupabaseClient();
  const user = useSupabaseUser();
  const id = ref(user.value?.id);
  const { data: profileData, error } = await client
    .from("users_production")
    .select("*")
    .eq("id", id.value as string)
    .single();
};
