// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },

  modules: ['@nuxt/ui', 'nuxt-icon', '@nuxtjs/supabase'],

  colorMode: {
    preference: 'light'
  },

  supabase: {
    redirect: false,
  },
})
