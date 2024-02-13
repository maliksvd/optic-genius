import { _light } from "#tailwind-config/theme/fontWeight";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@pinia/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/supabase",
  ],

  ui: {
    global: true,
    icons: ["ph", "simple-icons", "logos", "line-md"],
  },

  colorMode: {
    preference: "light",
  },

  supabase: {
    redirect: false,
  },

  i18n: {
    locales: [
      {
        code: "en",
        iso: "en-US",
        name: "English",
      },
      {
        code: "fr",
        iso: "fr-FR",
        name: "Français",
      },
      {
        code: "es",
        iso: "es-ES",
        name: "Español",
      },
    ],
    detectBrowserLanguage: false,
    defaultLocale: "en",
    strategy: "prefix_except_default",
    vueI18n: "./i18n.config.ts", // if you are using custom path, default
  },
});
