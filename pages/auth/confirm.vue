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
  <UContainer class="flex justify-center items-center h-screen max-w-lg">
    <div class="w-full flex flex-col gap-y-4">
      <div class="w-full flex justify-center mb-4">
        <Logo />
      </div>
      <UCard :ui="{ body: { base: 'grid grid-cols-1' } }">
        <div class="flex flex-col justify-center items-center">
          <UIcon
            name="i-ph-check-square-offset-duotone"
            class="h-12 w-12 mb-6"
          />
          <h1 class="text-lg font-semibold">Email Confirmation</h1>
          <p class="mb-6 text-base text-center px-8 mt-2">
            Thank you for sign in! Please check your email to confirm your
            account.
          </p>
          <NuxtLink to="/auth/login">
            <UButton
              label="Go back to login"
              size="md"
              color="white"
              variant="solid"
              icon="i-ph-arrow-left-bold"
            />
          </NuxtLink>
        </div>
      </UCard>
    </div>
  </UContainer>
</template>
