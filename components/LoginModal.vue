<script lang="ts" setup>
const isOpen = ref(false)

const supabase = useSupabaseClient()
const email = ref('')

const signInWithOtp = async () => {
  const { error } = await supabase.auth.signInWithOtp({
    email: email.value,
    options: {
      emailRedirectTo: 'http://localhost:3000/confirm',
    }
  })
  if (error) console.log(error)
}

</script>

<template>
  <div>
    <UButton label="Login with Email" @click="isOpen = true"
      class="py-2 px-5 bg-black border border-transparent rounded-full text-sm font-medium text-white" />

    <UModal v-model="isOpen" prevent-close>
      <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
              Login with Email
            </h3>
            <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
              @click="isOpen = false" />
          </div>
        </template>

        <p class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
          Please enter your email address to sign in.
        </p>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400 mb-8">
          We will send you a one-time code to sign in.
        </p>

        <UInput v-model="email" type="email" placeholder="Email" icon="ph:book-open-text" />

        <template #footer>
          <div class="flex justify-end">
            <UButton class="bg-black" @click="signInWithOtp">
              Sign In with E-Mail
            </UButton>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<style>
</style>
