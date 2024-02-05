<script setup>
/**
 * Get locale and locales from i18n module
 * @see https://i18n.nuxtjs.org/
 */
const { locale, locales } = useI18n();

const getLocales = () => {
  return locales.value.map((locale) => ({
    label: locale.name,
    value: locale.code,
  }));
};
const localePath = useLocalePath();

/**
 * Get user from supabase module
 * @returns {User}
 * @see https://supabase.nuxtjs.org/authentication
 *
 */
const user = useSupabaseUser();
</script>

<template>
  <div>
    <div class="border-b flex justify-between items-center h-16">
      <div class="container mx-auto px-6 md:max-w-7xl">
        <div class="flex items-center space-x-8 justify-between">
          <div id="left-side" class="flex items-center space-x-4">
            <div class="inline-flex items-center justify-center p-0 rounded-md">
              <svg
                class="h-7 lg:h-8 w-auto mr-2"
                viewBox="0 0 65 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M32.0833 0C49.803 0 64.1667 14.3637 64.1667 32.0833C64.1667 49.803 49.803 64.1667 32.0833 64.1667C14.3637 64.1667 0 49.803 0 32.0833C0 14.3637 14.3637 0 32.0833 0ZM32.0833 6.41667C25.2761 6.41667 18.7477 9.12083 13.9343 13.9343C9.12083 18.7477 6.41667 25.2761 6.41667 32.0833C6.41667 38.8906 9.12083 45.419 13.9343 50.2324C18.7477 55.0458 25.2761 57.75 32.0833 57.75C38.8906 57.75 45.419 55.0458 50.2324 50.2324C55.0458 45.419 57.75 38.8906 57.75 32.0833C57.75 25.2761 55.0458 18.7477 50.2324 13.9343C45.419 9.12083 38.8906 6.41667 32.0833 6.41667ZM32.0833 16.0417C35.4604 16.0429 38.7509 17.11 41.4861 19.0907C44.2212 21.0714 46.2616 23.8648 47.3164 27.0729C48.3711 30.281 48.3866 33.7401 47.3605 36.9575C46.3344 40.1749 44.3191 42.9864 41.6017 44.9915C38.8843 46.9965 35.6035 48.0929 32.2266 48.1243C28.8497 48.1557 25.549 47.1207 22.7948 45.1665C20.0405 43.2124 17.9732 40.4389 16.8874 37.2412C15.8016 34.0435 15.7526 30.5846 16.7475 27.3575C17.498 29.0345 18.8017 30.4029 20.4405 31.2336C22.0792 32.0644 23.9536 32.3071 25.7499 31.9212C27.5462 31.5352 29.1555 30.544 30.3084 29.1135C31.4613 27.6829 32.0879 25.8998 32.0833 24.0625C32.0838 22.5176 31.638 21.0054 30.7996 19.7078C29.9613 18.4101 28.766 17.3822 27.3575 16.7475C28.8888 16.2781 30.4817 16.0402 32.0833 16.0417Z"
                  fill="#151618"
                ></path>
              </svg>
              <NuxtLink :to="localePath('/')">
                <h1 class="font-semibold text-lg mr-2">Optic Genius</h1>
              </NuxtLink>
              <UBadge color="primary" variant="subtle">Alpha</UBadge>
            </div>
            <div class="hidden md:block">
              <ul class="list-none flex">
                <li>
                  <UButton color="black" variant="link">
                    <NuxtLink :to="localePath('/')">
                      {{ $t("findService") }}
                    </NuxtLink>
                  </UButton>
                </li>
                <li>
                  <UButton color="black" variant="link">
                    <NuxtLink :to="localePath('/cities')">
                      {{ $t("base.cities") }}
                    </NuxtLink>
                  </UButton>
                </li>
                <li>
                  <UButton color="black" variant="link">
                    <NuxtLink :to="localePath('/')">
                      {{ $t("base.about") }}
                    </NuxtLink>
                  </UButton>
                </li>
                <li>
                  <UButton color="black" variant="link">
                    <NuxtLink :to="localePath('/')">
                      {{ $t("base.contact") }}
                    </NuxtLink>
                  </UButton>
                </li>
              </ul>
            </div>
          </div>
          <div class="flex items-center space-x-2">
            <NuxtLink :to="user ? localePath('/account') : '/auth/login'">
              <Icon name="ph:user-circle-duotone" class="w-5 h-5 mr-1.5" />
              <!-- Dynamically update text based on client-side state -->
              {{ !user ? $t("base.signIn") : $t("base.myAccount") }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
