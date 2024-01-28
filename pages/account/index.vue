<template>
  <div>
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-12">
      <div class="space-y-0.5">
        <h2 class="text-2xl font-bold tracking-tight">Account</h2>
        <p class="text-black">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>

      <div>
        <div class="flex items-center space-x-12">
          <Input
          type="text"
          placeholder="First name"
          class="mt-4"
          disabled
          v-model="user.email"
        />
        <Input
          type="text"
          placeholder="Phone number"
          class="mt-4"
          v-model="profileData.phone_number"
        />
        </div>
        <Input
          type="text"
          placeholder="First name"
          class="mt-4"
          v-model="profileData.first_name"
        />
        <Input
          type="text"
          placeholder="Last name"
          class="mt-4"
          v-model="profileData.last_name"
        />
        <Input
          type="number"
          placeholder="Age"
          class="mt-4"
          v-model="profileData.age"
        />
      </div>

      <div class="my-12">
        <Button variant="destructive" @click="user.signOut()">Sign out</Button>
      </div>

      {{ profileData }}
    </main>
  </div>
</template>

<script lang="ts" setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

useHead({
  title: "My account - Optic Genius",
  description: "Manage your account settings and set e-mail preferences.",
});

definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient();
const user = useSupabaseUser();

const id = computed(() => user.value?.id);

const { data: profileData } = await useAsyncData(
  "users_production",
  async () => {
    const { data } = await client
      .from("users_production")
      .select()
      .eq("id", id.value)
      .single();

    return data;
  }
);

console.log(profileData);
</script>

<style></style>
