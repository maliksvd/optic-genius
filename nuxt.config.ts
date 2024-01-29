// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: [
    "@nuxtjs/tailwindcss",
    "shadcn-nuxt",
    "@nuxtjs/i18n",
    "nuxt-icon",
    "@nuxtjs/supabase",
  ],

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
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
