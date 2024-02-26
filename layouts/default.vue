<script lang="ts" setup>
/**
 * Import from VueUse and Tailwind the breakpoints
 * @see https://vueuse.org/core/useBreakpoints
 * @see https://tailwindcss.com/docs/breakpoints
 *
 */
const { isMobile } = useBasicLayout();

watch(isMobile, (value) => {
  if (value) {
    console.log("Mobile");
  } else {
    console.log("Desktop");
  }
});

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
  <div>
    <div
      class="bg-white dark:bg-gray-900 ring-1 ring-inset ring-gray-300 dark:ring-gray-700 px-8 transition-all duration-300 ease-in-out"
    >
      <Header />
    </div>

    <main
      style="stagger: 1"
      data-animate
      class="bg-white dark:bg-gray-900 md:m-12 py-16 px-8 rounded-md overflow-hidden min-h-screen"
    >
      <slot />
    </main>
  </div>
</template>
