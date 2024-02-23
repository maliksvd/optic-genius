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

const itemsNavigation = ref([
  {
    label: "Home",
    icon: "i-ph-house-simple",
    to: localePath("/"),
  },
  {
    label: "Find a service",
    icon: "i-ph-hand-heart",
    to: localePath("/search/services"),
  },
  {
    label: "Cities",
    icon: "i-ph-map-trifold",
    to: localePath("/search/cities"),
  },
  {
    label: "Education",
    icon: "i-ph-book-bookmark",
    to: localePath("/education"),
  },
]);
</script>

<template>
  <div>
    <div class="flex items-center justify-between w-full py-2">
      <Logo class="px-2 py-4" />
      <div>
        <UHorizontalNavigation
          :links="itemsNavigation"
          :ui="{
            after:
              'after:absolute after:bottom-0 after:inset-x-2.5 after:hidden after:h-[2px] after:mt-2',
          }"
        />
      </div>
      <div class="px-2 py-2">
        <div v-if="user">
          <UButton
            color="white"
            variant="solid"
            size="lg"
            block
            class="shadow-sm"
          >
            <NuxtLink :to="localePath('/account')" class="flex items-center">
              <Icon
                name="ph:user-circle-duotone"
                class="w-5 h-5 mr-0 md:mr-1.5"
              />
              <span class="hidden md:block">
                {{
                  user.user_metadata.first_name && user.user_metadata.last_name
                    ? user.user_metadata.first_name +
                      " " +
                      user.user_metadata.last_name
                    : user.email
                }}</span
              >
            </NuxtLink>
          </UButton>
        </div>
        <div v-else>
          <div class="flex items-center space-x-2 justify-between">
            <UButton color="white" variant="solid" size="lg">
              <NuxtLink :to="localePath('/auth/login')">
                <Icon name="ph:user-circle-duotone" class="w-5 h-5 mr-1.5" />
                {{ $t("base.signIn") }}
              </NuxtLink>
            </UButton>
            <UButton color="black" variant="solid" size="lg">
              <NuxtLink :to="localePath('/auth/register')">
                <Icon name="ph:plus-circle-duotone" class="w-5 h-5 mr-1.5" />
                {{ $t("base.signUp") }}
              </NuxtLink>
            </UButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
