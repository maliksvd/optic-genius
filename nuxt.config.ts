// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  modules: ['@nuxt/ui', 'nuxt-icon', '@nuxtjs/supabase'],

  colorMode: {
    preference: 'light'
  },

  supabase: {
    redirect: false,
  },
})
