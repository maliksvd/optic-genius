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

const isMobile = useBasicLayout();
</script>

<template>
  <div>
    <div class="flex items-center justify-between w-full py-2">
      <div class="block md:flex items-center space-x-4">
        <Logo class="px-2 py-4 w-full" />
        <UHorizontalNavigation
          :links="[
            { label: $t('findCity'), to: localePath('/search/cities') },
            { label: $t('services'), to: localePath('/search/services') },
            { label: $t('education'), to: localePath('/education') },
          ]"
          :ui="{
            base: 'hidden md:flex text-base',
            after:
              'after:absolute after:bottom-0 after:inset-x-2.5 after:hidden after:h-[2px] after:mt-2',
          }"
        />
      </div>
      <div class="items-center space-x-4 hidden md:flex">
        <DarkMode />
        <LanguageSwitcher :locales="getLocales" />
        <UButton
          :label="$t('askAppointment')"
          icon="i-solar-calendar-search-bold"
          size="xl"
          color="black"
          :to="localePath('/search/cities')"
        />
      </div>
      <div v-if="isMobile" class="md:hidden">
        <MobileNavigation />
      </div>
    </div>
  </div>
</template>
