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
const $t = useI18n().t;

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

const accountTabs = [
  {
    key: "profile",
    label: "Profile",
    description: $t("account.profileDescription"),
  },
  {
    key: "preferences",
    label: "Preferences",
    description: $t("account.preferencesDescription"),
  },
];
</script>

<template>
  <div class="mt-6 md:mt-24">
    <div
      v-if="
        profileData.data.first_name !== null &&
        profileData.data.first_name !== undefined
      "
      class="flex flex-col md:flex-row space-x-0 space-y-6 md:space-y-0 md:space-x-6"
    >
      <UCard class="w-full md:w-2/4">
        <UAvatar
          :alt="profileData?.data.first_name"
          size="xl"
          :ui="{ wrapper: 'border shadow-sm' }"
        />

        <h2 class="mt-6 text-xl font-bold tracking-tight">
          {{ $t("account.hello") }}, {{ profileData?.data.first_name }}
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
      </UCard>
      <UCard class="w-full">
        <UTabs :items="accountTabs" class="w-full">
          <template #item="{ item }">
            <div v-if="item.key === 'profile'">
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
            </div>
            <div v-else-if="item.key === 'preferences'">
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
            </div>
          </template>
        </UTabs>
        <div class="flex w-full justify-end items-center mb-12 mt-8">
          <div class="flex flex-col justify-end">
            <UButton
              label="Sign out"
              icon="i-ph-person-simple-run"
              color="white"
              variant="solid"
              @click="signOut"
            />
          </div>
        </div>
      </UCard>
    </div>
    <div v-else>
      <div>
        <AccountOnboarding />
      </div>
    </div>
  </div>
</template>
