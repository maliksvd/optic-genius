<script setup lang="ts">
const route = useRoute();

/**
 * Define the city from the route params
 * @returns {string}
 */
const { city } = route.params;

/**
 * Fetch data from the API with params
 * @returns {string}
 * @property {string} title
 */
const { data, pending, error, refresh } = await useFetch(
  "/api/locations/" + city
);

const featuredLocations = ref(data?.locations);
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="featuredLocations"
    :ui="{
      item: 'basis-full lg:basis-1/5 mr-8 rounded-md',
      container: 'rounded-md',
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-left-20-solid',
      class: '-left-12',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-heroicons-arrow-right-20-solid',
      class: '-right-12',
    }"
    arrows
    class="w-full mx-auto rounded-md mb-12"
  >
    <div class="relative h-46">
      <img
        :src="item.storefrontphoto"
        class="w-full object-cover h-64 rounded-md"
        draggable="false"
      />
      <div
        class="absolute h-16 w-full bottom-0 backdrop-blur-lg rounded-t-md px-4"
      >
        <h1 class="text-black font-bold text-sm">{{ item.title }}</h1>
        <p class="text-gray-500 text-xs">{{ item.specialization }}</p>
      </div>
    </div>
  </UCarousel>
</template>
