<script lang="ts" setup>
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";

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

const breakpoints = useBreakpoints(breakpointsTailwind);

const mobile = breakpoints.smaller("md");
const desktop = breakpoints.greaterOrEqual("md");

const navigationOpen = ref(false);

const toggleNavigation = () => {
  navigationOpen.value = !navigationOpen.value;
};

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
  {
    label: "About",
    icon: "i-ph-envelope",
    to: localePath("/about"),
  },
]);
</script>
<template>
  <div class="flex items-start justify-between">
    <div v-if="mobile">
      <div class="fixed bottom-0 bg-white border-t py-2 px-4 w-full">
        <UPopover :popper="{ placement: 'top-start' }">
          <UButton
            color="white"
            variant="solid"
            size="lg"
            label="Navigation"
            icon="i-ph-list"
            @click="toggleNavigation"
            :ui="{ rounded: 'rounded-full' }"
            class="md:hidden"
          />

          <template #panel>
            <div class="p-2">
              <UVerticalNavigation
                :links="itemsNavigation"
                :ui="{ size: 'text-base' }"
              />
            </div>
          </template>
        </UPopover>
      </div>
    </div>
    <div v-else>
      <Header />
    </div>
    <main
      class="container mx-auto grid w-full h-full md:pl-[280px] px-8 md:px-0"
    >
      <slot />
    </main>
  </div>
</template>
