<script setup lang="ts">
const client = useSupabaseClient();

definePageMeta({
  title: "Register",
  description: "Register to your account",
  layout: "auth",
});

import type { FormError, FormSubmitEvent } from "#ui/types";

const state = reactive({
  email: undefined,
  password: undefined,
  first_name: undefined,
  last_name: undefined,
  user_type: "customer",
});

const validate = (state: any): FormError[] => {
  const errors = [];
  if (!state.email) errors.push({ path: "email", message: "Required" });
  if (!state.password) errors.push({ path: "password", message: "Required" });
  if (!state.first_name)
    errors.push({ path: "first_name", message: "Required" });
  if (!state.last_name) errors.push({ path: "last_name", message: "Required" });

  return errors;
};

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);

  try {
    const { error } = await client.auth.signUp({
      email: event.data.email,
      password: event.data.password,
      options: {
        data: {
          first_name: event.data.first_name,
          last_name: event.data.last_name,
          user_type: event.data.user_type,
        },
      },
    });
    if (error) throw error;
    navigateTo("/auth/confirm");
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <UContainer class="flex justify-center items-center h-screen max-w-lg">
      <div class="w-full flex flex-col gap-y-4">
        <div class="w-full flex justify-center mb-4">
          <Logo />
        </div>
        <UCard :ui="{ body: { base: 'grid grid-cols-1' } }">
          <UForm
            :validate="validate"
            :state="state"
            class="space-y-4"
            @submit="onSubmit"
          >
            <UFormGroup label="Email" name="email">
              <UInput
                v-model="state.email"
                size="xl"
                icon="i-ph-envelope"
                placeholder="example@opticgenius.ca"
              />
            </UFormGroup>

            <UFormGroup label="Password" name="password">
              <UInput
                v-model="state.password"
                type="password"
                placeholder="************"
                size="xl"
                icon="i-ph-lock-key"
              />
            </UFormGroup>

            <UFormGroup label="First Name" name="first_name">
              <UInput v-model="state.first_name" size="xl" />
            </UFormGroup>

            <UFormGroup label="Last Name" name="last_name">
              <UInput v-model="state.last_name" size="xl" />
            </UFormGroup>

            <UFormGroup label="Are you a professional?" name="user_type">
              <USelect
                v-model="state.user_type"
                icon="i-ph-address-book"
                size="xl"
                :options="['customer', 'professional']"
              />
            </UFormGroup>

            <UButton
              label="Login to your account"
              size="xl"
              color="black"
              block
              type="submit"
            >
              Register
            </UButton>
          </UForm>
        </UCard>
      </div>
    </UContainer>
  </div>
</template>
