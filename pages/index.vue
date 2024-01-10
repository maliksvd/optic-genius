<template>
  <div>
    <Header />
    <div class="border-b py-4">
      <div class="flex flex-nowrap space-x-5 overflow-x-scroll no-scrollbar w-full px-6 md:max-w-7xl mx-auto">
        <NuxtLink v-for="link in stickyLinks" :key="link.label" :to="link.href" class="flex justify-center items-center ">
          <Icon :name="link.icon" class="w-6 h-6 mr-2" />
          <span
            class="pl-0 md:pl-1 ml-1.5 text-sm whitespace-nowrap  flex-nowrap border-transparent text-gray-800 hover:border-gray-300 hover:text-gray-700 inline-flex items-center text-base">
            {{ link.label }}</span>
        </NuxtLink>
      </div>
    </div>
    <div class="w-full">
      <div class="relative mb-4">
        <div class="inset-0">
          <div class="absolute w-full h-96 bg-[#00252D">
            <img width="650" height="250" class="h-96 w-full object-cover relative bg-[#00252D]"
              src="https://images.pexels.com/photos/4687359/pexels-photo-4687359.jpeg">
          </div>
          <div class="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-500 to-gray-200 mix-blend-multiply h-96">
          </div>
        </div>
        <div class="relative w-full xl:max-w-7xl mx-auto px-4 py-16 sm:px-6 md:py-24 pb-0 lg:pb-32 lg:pt-32 lg:px-6">
          <h1 class="font-display text-4xl mb-5 font-bold tracking-tight sm:text-4xl lg:text-5xl w-full text-white">
            An eye care
            professional near you.</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const stickyLinks = [
  {
    label: 'Eye Exams',
    href: '/',
    icon: 'ph:eye-duotone',
  },
  {
    label: 'Eye Emergencies',
    href: '/',
    icon: 'ph:siren-duotone',
  },
  {
    label: 'Glasses',
    href: '/',
    icon: 'ph:sunglasses-duotone',
  },
  {
    label: 'Contact Lenses',
    href: '/',
    icon: 'ph:circle-duotone',
  },
  {
    label: 'Reparation',
    href: '/',
    icon: 'ph:barricade-duotone',
  },

]
</script>

<style>
</style>
