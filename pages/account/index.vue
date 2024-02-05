<script setup>
/**
 * Define Supabase client and user
 * @type {import("@supabase/supabase-js").SupabaseClient}
 * @type {import("@supabase/supabase-js").Session | null}
 *
 */
const client = useSupabaseClient();
const user = useSupabaseUser();
const profileData = await useProfile();

console.log(profileData);

/**
 * Define the locale and the $t function
 * @type {import("vue-i18n").Locale}
 * @type {import("vue-i18n").Translate}
 */
const { locale } = useI18n();

/**
 * Define the signOut function
 * @type {Function}
 */
const signOut = async () => {
  const { error } = await client.auth.signOut();
  if (error) console.log(error);
  else return navigateTo("/");
};
</script>

<template>
  <div>
    <Header />
    <div
      v-if="
        profileData.data.first_name !== null &&
        profileData.data.first_name !== undefined
      "
    >
      <div class="border-b py-16 md:py-24 px-8 md:px-24">
        <h2 class="text-2xl font-bold tracking-tight">
          Hello, {{ profileData.first_name }}
        </h2>
        <p class="text-black mt-1.5 mb-2">
          Manage your account settings and set e-mail preferences.
        </p>
        <UBadge
          :label="profileData.data.user_type"
          class="capitalize"
          color="primary"
          variant="subtle"
        />
      </div>
      <main class="container mx-auto px-6 md:max-w-7xl mt-12">
        <div
          class="grid grid-cols-1 md:grid-cols-3 space-y-8 space-x-0 md:space-x-8 md:space-y-0"
        >
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold tracking-tight">Profile</h3>
            </template>

            <div class="grid grid-cols-2">
              <div>
                <p class="text-black font-bold">First name</p>
                <p class="text-black">{{ profileData.data.first_name }}</p>
              </div>
              <div>
                <p class="text-black font-bold">Last name</p>
                <p class="text-black">{{ profileData.data.last_name }}</p>
              </div>
              <div>
                <p class="text-black font-bold">Email</p>
                <p class="text-black">{{ user.email }}</p>
              </div>
            </div>
          </UCard>
          <UCard class="mb-12">
            <template #header>
              <h3 class="text-xl font-bold tracking-tight">Preferences</h3>
            </template>
            <div class="grid grid-cols-2">
              <div>
                <p class="text-black font-bold">City</p>
                <p class="text-black">
                  {{ profileData.city ? profileData.city : "Not set" }}
                </p>
              </div>
              <div>
                <p class="text-black font-bold">Borough</p>
                <p class="text-black">
                  {{
                    profileData.data.borough
                      ? profileData.data.borough
                      : "Not set"
                  }}
                </p>
              </div>
            </div>
          </UCard>
          <UCard class="mb-12">
            <template #header>
              <h3 class="text-xl font-bold tracking-tight">Language</h3>
            </template>

            <form>
              <USelect v-model="locale" :options="['en', 'fr', 'es']" />
            </form>
          </UCard>
        </div>
        <div class="flex flex-col w-48 mb-12 mt-8">
          <p class="text-sm">You want to leave us? 😢</p>
          <UButton
            label="Sign out"
            icon="i-ph-person-simple-run"
            color="white"
            variant="solid"
            @click="signOut"
          />
        </div>
      </main>
    </div>
    <div v-else>
      <div>
        <AccountOnboarding />
      </div>
    </div>
  </div>
</template>
