<script setup lang="ts">
const user = useSupabaseUser();

definePageMeta({
  title: "Email Confirmation",
  description: "Email confirmation",
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
    <UIcon name="i-ph-check-square-offset-duotone" class="h-16 w-16 mb-6" />
    <h1 class="text-xl md:text-2xl font-semibold">Email Confirmation</h1>
    <p class="mb-6 text-base md:text-lg text-center mt-2">
      Thank you for sign in! Please check your email to confirm your account.
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
