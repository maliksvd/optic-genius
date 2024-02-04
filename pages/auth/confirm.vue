<script setup lang="ts">
const user = useSupabaseUser();
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
  <div class="flex flex-col justify-center items-center h-96">
    <UIcon name="i-ph-check-square-offset-duotone" class="h-16 w-16 mb-6" />
    <h1 class="text-xl md:text-2xl font-semibold">Email Confirmation</h1>
    <p class="mb-6 text-base md:text-lg">
      Thank you for sign in! Please check your email to confirm your account.
    </p>
    <NuxtLink to="/auth/login">
      <UButton
        label="Go back to login"
        size="xl"
        color="white"
        variant="solid"
        icon="i-ph-arrow-left-bold"
      />
    </NuxtLink>
  </div>
</template>
