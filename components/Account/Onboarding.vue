<script lang="ts" setup>
import type { FormError, FormSubmitEvent } from "#ui/types";

const client = useSupabaseClient();
const user = useSupabaseUser();
const profileData = useProfile();

/**
 * Define the locale and the $t function
 * @type {import("vue-i18n").Locale}
 * @type {import("vue-i18n").Translate}
 */
const { locale } = useI18n();

const state = reactive({
  first_name: undefined as string | undefined,
  last_name: undefined as string | undefined,
  user_type: undefined as string | undefined,
});

const userTypeItems = [
  { label: "Customer", value: "customer" },
  { label: "Optician", value: "optician" },
  { label: "Optometrist", value: "optometrist" },
  { label: "Ophthalmologist", value: "ophthalmologist" },
];

const id = ref<string | undefined>(user.value?.id);

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data);

  try {
    const { data, error } = await client
      .from("users_production")
      .update(
        {
          first_name: state.first_name,
          last_name: state.last_name,
          user_type: state.user_type,
        },
        { returning: "minimal" }
      )
      .eq("id", id.value as string)
      .select("*");
  } catch (error) {
    console.log(error);
  } finally {
    navigateTo("/account");
  }
}
</script>

<template>
  <div class="flex flex-col justify-center items-center mt-24 px-8">
    <UIcon name="i-ph-flag-checkered" class="h-16 w-16 mb-6" />
    <h1 class="text-xl md:text-2xl font-semibold">Onboarding</h1>
    <p class="mb-6 text-base md:text-lg text-center mt-4">
      To continue, you need to fill the fields below to complete your profile.
    </p>
    <UForm :state="state" class="space-y-4" @submit="onSubmit">
      <div class="flex items-center space-x-6">
        <UFormGroup label="First Name" name="first_name">
          <UInput v-model="state.first_name" size="lg" />
        </UFormGroup>
        <UFormGroup label="Last Name" name="last_name">
          <UInput v-model="state.last_name" size="lg" />
        </UFormGroup>
      </div>
      <UFormGroup label="What type of person you are?" name="user_type">
        <USelect v-model="state.user_type" size="lg" :options="userTypeItems" />
      </UFormGroup>

      <UButton
        type="submit"
        color="black"
        size="lg"
        block
        icon="i-ph-paper-plane-tilt"
      >
        Finish your profile
      </UButton>
    </UForm>
    <div class="mt-4">
      <UButton color="black" variant="ghost" size="sm" @click="signOut">
        {{ $t("base.signOut") }}
      </UButton>
    </div>
  </div>
</template>

<style></style>
