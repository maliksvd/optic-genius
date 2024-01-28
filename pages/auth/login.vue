<template>
  <div>
    <Header />
    <form
      class="flex-col items-center space-y-4 md:max-w-xs mx-auto h-screen mt-48 px-6"
      @submit.prevent="handleLogin"
    >
      <div>
        <h2 class="text-lg font-semibold">Sign in</h2>
        <p class="mb-6">via magic link with your email below.</p>
        <div class="mb-8">
          <Input type="email" placeholder="Your email" v-model="email" />
        </div>
        <Button
          type="submit"
          :value="loading ? 'Loading' : 'Send magic link'"
          :disabled="loading"
          :loading="loading"
        >
          <Icon name="i-ph:magic-wand-fill" class="mr-2" />
          Send magic link
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

useHead({
  title: "Sign in - Optic Genius",
  meta: [
    {
      name: "description",
      content: "Sign in to your account",
    },
  ],
});

definePageMeta({
  middleware: "auth-logged",
});

const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");

const handleLogin = async () => {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signInWithOtp({
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
