<script setup lang="ts">
const client = useSupabaseClient();
const user = useSupabaseUser();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await client.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    navigateTo("/auth/confirm");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};
</script>
<template>
  <div>
    <UContainer class="flex justify-center items-center h-screen max-w-sm">
      <div class="w-full flex flex-col gap-y-4">
        <h1 class="text-center font-bold">Welcome back!</h1>
        <p class="text-center text-sm">Please sign in to your account</p>
        <UCard :ui="{ body: { base: 'grid grid-cols-1' } }">
          <form @submit.prevent="handleLogin" class="space-y-4">
            <UInput
              v-model="email"
              type="email"
              size="lg"
              placeholder="Enter your email"
              icon="i-ph-envelope"
            />
            <UButton
              label="Send a magic link"
              icon="i-ph-magic-wand"
              size="lg"
              color="black"
              block
              type="submit"
              :value="loading ? 'Loading' : 'Send magic link'"
              :disabled="loading"
              :loading="loading"
            />
          </form>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
