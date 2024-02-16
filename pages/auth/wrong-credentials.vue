<script lang="ts" setup>
const user = useSupabaseUser();

definePageMeta({
  title: "Wrong Credentials",
  description: "Wrong Credentials",
  layout: "auth",
});

watch(
  user,
  () => {
    if (user.value) {
      return navigateTo("/account");
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen px-8">
    <UIcon name="i-ph-smiley-sad" class="h-16 w-16 mb-6" />
    <h1 class="text-xl md:text-2xl font-semibold">Wrong Combinaison</h1>
    <p class="mb-6 text-base md:text-lg text-center mt-2">
      The email or password you entered is incorrect. Please try again.
    </p>
    <NuxtLink to="/auth/login">
      <UButton
        label="Go back to login"
        size="lg"
        color="white"
        variant="solid"
        icon="i-ph-arrow-left-bold"
      />
    </NuxtLink>
  </div>
</template>
