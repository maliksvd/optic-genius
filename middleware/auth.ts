export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser();
  if (!user.value && to.path !== "/auth/login") {
    return navigateTo("/auth/login");
  }
});
