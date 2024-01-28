<template>
  <div>
    <Header/>
    <form class="flex-col items-center space-y-4 md:max-w-xs mx-auto h-screen mt-48 px-6" @submit.prevent="handleLogin">
      <div>
        <h2 class="text-lg font-semibold">Sign in</h2>
        <p class="mb-6">via magic link with your email below.</p>
        <div>
          <Input type="email" placeholder="Your email" v-model="email" />
          <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p>
        </div>
        <Button 
          type="submit" :value="loading ? 'Loading' : 'Send magic link'" :disabled="loading" :loading="loading">
          Send magic link
        </Button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import { Input } from '@/components/ui/input'
import { UButton } from '@/components/ui/button'

const supabase = useSupabaseClient();

const loading = ref(false);
const email = ref("");
const errorMessage = ref("");

const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,4}\.[0-9]{1,4}\.[0-9]{1,4}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const handleLogin = async () => {
  if (!validateEmail(email.value)) {
    errorMessage.value = "Please enter a valid email address.";
    return;
  }

  try {
    loading.value = true;
    errorMessage.value = "";
    const { error } = await supabase.auth.signInWithOtp({
      email: email.value,
    });
    if (error) throw error;
    navigateTo("/auth/confirm");
  } catch (error) {
    errorMessage.value = error.message;
  } finally {
    loading.value = false;
  }
};
</script>

<style>
/* Add any custom styles if necessary */
</style>
