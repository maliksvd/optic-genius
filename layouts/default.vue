<script lang="ts" setup>
/**
 * Import from VueUse and Tailwind the breakpoints
 * @see https://vueuse.org/core/useBreakpoints
 * @see https://tailwindcss.com/docs/breakpoints
 *
 */
import { breakpointsTailwind, useBreakpoints } from "@vueuse/core";
import { useMediaQuery } from "@vueuse/core";

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
 * Define the breakpoints for mobile and desktop
 * @see https://vueuse.org/core/useBreakpoints
 * @returns {boolean} mobile
 * @returns {boolean} desktop
 */
const breakpoints = useBreakpoints(breakpointsTailwind);
const mobile = ref(useMediaQuery("(max-width: 768px)"));
const desktop = ref(!mobile.value);

watch(mobile, (value) => {
  desktop.value = !value;
});

watch(breakpoints, () => {
  mobile.value = breakpoints.value.sm;
});

/**
 * Define the itemsNavigation reactive variable
 * @returns {Array} itemsNavigation
 */
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
  <div id="wrapper">
    <div v-if="desktop" id="desktop">
      <Header />
    </div>
    <div v-else id="mobile">
      <MobileNavigation />
    </div>
    <main
      class="container mx-auto grid w-full h-full md:pl-[280px] px-8 md:px-0"
    >
      <slot />
    </main>
  </div>
</template>
