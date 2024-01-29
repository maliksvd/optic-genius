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
        <Button variant="primary" @click="updateProfileData">Update</Button>
        <Button variant="destructive" @click="signOut">Sign out</Button>
      </div>

      <div class="my-12">
        <h2 class="text-2xl font-bold tracking-tight">Language</h2>
        <p class="text-black">Select your preferred language for the site.</p>
        <form>
          <select v-model="locale">
            <option value="en">en</option>
            <option value="fr">fr</option>
            <option value="es">es</option>
          </select>
          <p>{{ $t("welcome") }}</p>
          <p>{{ $t("yes") }}</p>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup>
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const client = useSupabaseClient();
const user = useSupabaseUser();
const { locale } = useI18n();

const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) console.log(error);
};

const id = computed(() => user.value.id);

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

const updateProfileData = async () => {
  try {
    const { error } = await client
      .from("users_production")
      .update(
        {
          first_name: profileData.value.first_name,
          last_name: profileData.value.last_name,
          age: profileData.value.age,
          phone_number: profileData.value.phone_number,
        },
        { returning: "minimal" }
      )
      .eq("id", id.value);
    if (error) throw error;
  } catch (error) {
    console.log(error);
  }
};
</script>
