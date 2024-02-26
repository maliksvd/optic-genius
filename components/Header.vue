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
    to: localePath("/"),
  },
  {
    label: "Find a service",
    to: localePath("/search/services"),
  },
  {
    label: "Cities",
    to: localePath("/search/cities"),
  },
  {
    label: "Education",
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
            base: 'hidden md:flex',
            after:
              'after:absolute after:bottom-0 after:inset-x-2.5 after:hidden after:h-[2px] after:mt-2',
          }"
        />
      </div>
      <div class="px-2 py-2">
        <UButton
          label="Ask an appointment"
          icon="i-solar-calendar-search-bold"
          size="lg"
          color="black"
          to="/search/cities"
        />
      </div>
    </div>
  </div>
</template>
