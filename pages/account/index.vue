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

/**
 * Define the locale and the $t function
 * @type {import("vue-i18n").Locale}
 * @type {import("vue-i18n").Translate}
 */
const { locale } = useI18n();

useHead({
  title: "Account - Optic Genius",
  ogTitle: "Account - Optic Genius",
  ogDescription: "Manage your account settings and set e-mail preferences.",
  twitterDescription:
    "Manage your account settings and set e-mail preferences.",
});

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
    <div
      v-if="
        profileData.data.first_name !== null &&
        profileData.data.first_name !== undefined
      "
    >
      <div class="md:py-24">
        <h2 class="text-2xl font-bold tracking-tight">
          {{ $t("account.hello") }}, {{ profileData.first_name }}
        </h2>
        <p class="text-black mt-1.5 mb-2">
          {{ $t("account.accountHeadingMessage") }}
        </p>
        <UBadge
          :label="profileData.data.user_type"
          class="capitalize"
          color="primary"
          variant="subtle"
        />
      </div>
      <main>
        <div
          class="grid grid-cols-1 md:grid-cols-3 space-y-8 space-x-0 md:space-x-8 md:space-y-0"
        >
          <UCard>
            <template #header>
              <h3 class="text-xl font-bold tracking-tight">
                {{ $t("account.profile") }}
              </h3>
            </template>

            <div class="grid grid-cols-2">
              <div>
                <p class="text-black font-bold">
                  {{ $t("account.user.firstName") }}
                </p>
                <p class="text-black">{{ profileData.data.first_name }}</p>
              </div>
              <div>
                <p class="text-black font-bold">
                  {{ $t("account.user.lastName") }}
                </p>
                <p class="text-black">{{ profileData.data.last_name }}</p>
              </div>
              <div>
                <p class="text-black font-bold">
                  {{ $t("account.user.email") }}
                </p>
                <p class="text-black">{{ user.email }}</p>
              </div>
            </div>
          </UCard>
          <UCard class="mb-12">
            <template #header>
              <h3 class="text-xl font-bold tracking-tight">
                {{ $t("account.preferences") }}
              </h3>
            </template>
            <div class="grid grid-cols-2">
              <div>
                <p class="text-black font-bold">
                  {{ $t("base.city") }}
                </p>
                <p class="text-black">
                  {{ profileData.city ? profileData.city : "Not set" }}
                </p>
              </div>
              <div>
                <p class="text-black font-bold">
                  {{ $t("base.borough") }}
                </p>
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
              <h3 class="text-xl font-bold tracking-tight">
                {{ $t("account.language") }}
              </h3>
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
