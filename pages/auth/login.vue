<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

definePageMeta({
  title: "Login",
  description: "Login to your account",
  layout: "auth",
});

watchEffect(() => {
  if (user.value) {
    return navigateTo("/account");
  }
});

const loading = ref(false);
const email = ref("");
const password = ref("");

const signIn = async () => {
  try {
    loading.value = true;
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    navigateTo("/account");
  } catch (error) {
    navigateTo("/auth/wrong-credentials");
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <UContainer class="flex justify-center items-center h-screen max-w-sm">
      <div class="w-full flex flex-col gap-y-4">
        <div class="w-full flex justify-center mb-4">
          <Logo />
        </div>
        <UCard :ui="{ body: { base: 'grid grid-cols-1' } }">
          <form @submit.prevent="signIn" class="space-y-4">
            <UInput
              v-model="email"
              type="email"
              size="xl"
              placeholder="Enter your email"
              icon="i-ph-envelope"
            />
            <UInput
              v-model="password"
              type="password"
              size="xl"
              placeholder="Enter your password"
              icon="i-ph-lock-key"
            />
            <UButton
              label="Login to your account"
              size="xl"
              color="black"
              block
              type="submit"
              :value="loading ? 'Loading' : 'Login'"
              :disabled="loading"
              :loading="loading"
            />
          </form>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
