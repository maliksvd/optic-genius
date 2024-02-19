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
  <div class="flex h-screen pt-4 max-layout-width relative">
    <div
      class="mx-2 pt-2 flex flex-col transition-all duration-300 ease-in-out sm:w-[250px] pr-0 sm:pr-2 hidden sm:flex"
    >
      <Header v-if="!isMobile" />
    </div>

    <MobileNavigation v-if="isMobile" />

    <main
      style="stagger: 1"
      data-animate
      class="bg-white mx-4 md:mx-0 px-8 main-container flex flex-col flex-1 rounded-t-2xl overflow-hidden shadow-md border border-inherit"
    >
      <div
        class="flex flex-col gap-4 px-4 mt-4 custom-overflow overflow-y-auto h-full"
      >
        <slot />
      </div>
    </main>
  </div>
</template>
