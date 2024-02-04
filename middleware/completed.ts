export default defineNuxtRouteMiddleware(async (to, from) => {
  const user = useSupabaseUser();
  const profileData = await useProfile();

  console.log(profileData);

  if (!user.value) {
    navigateTo("/auth/login");
  } else {
    console.log("User is logged in");
    if (!profileData) {
      navigateTo("/auth/login");
    } else {
      if (profileData.value && profileData.value.first_name) {
        navigateTo("/account");
        console.log("User has completed onboarding");
      } else {
        console.log("User has not completed onboarding");
      }
    }
  }
});
