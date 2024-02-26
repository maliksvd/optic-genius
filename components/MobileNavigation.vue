<script lang="ts" setup>
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

const itemsNavigation = ref([
  {
    label: "Find a Cities",
    to: localePath("/search/cities"),
  },
  {
    label: "Services",
    to: localePath("/search/services"),
  },
  {
    label: "Education",
    to: localePath("/education"),
  },
]);

const isNavigationModalOpen = ref(false);
</script>
<template>
  <div>
    <UButton
      icon="i-solar-hamburger-menu-linear"
      size="xl"
      color="white"
      @click="isNavigationModalOpen = true"
    />
    <UModal v-model="isNavigationModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h3 class="font-semibold">Navigation</h3>
        </template>
        <div class="p-4">
          <UVerticalNavigation
            :links="itemsNavigation"
            :ui="{
              base: 'flex text-base',
              after:
                'after:absolute after:bottom-0 after:inset-x-2.5 after:hidden after:h-[2px] after:mt-2',
            }"
          />
        </div>
        <template #footer>
          <div class="flex items-center justify-between2">
            <div class="w-full">
              <h4 class="font-semibold mb-2">Settings</h4>
              <DarkMode />
            </div>
            <div class="w-full">
              <h4 class="font-semibold mb-2">Language</h4>
              <LanguageSwitcher :locales="getLocales" />
            </div>
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
