<script lang="ts" setup>
/**
 * Get the current locale path
 *
 * @returns {string}
 */
const localePath = useLocalePath();

/**
 * Fetch the cities from the API
 *
 * @returns {object}
 * @property {object[]} data
 * @property {boolean} pending
 * @property {boolean} error
 * @property {function} refresh
 *
 */
const { data, pending, error, refresh } = await useFetch("/api/cities");

useHead({
  title: "All cities - Optic Genius",
});
</script>

<template>
  <div class="mt-6">
    <h1 class="text-3xl font-semibold">All cities</h1>
    <p class="mt-2 text-gray-500 dark:text-gray-400">
      Find a service in your city
    </p>
    <UCard class="lugmt-8">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        <UCard v-for="city in data" :key="city.id" class="">
          <NuxtLink :to="localePath('/cities/' + city.value)">{{
            city.label
          }}</NuxtLink>
          <template #footer>
            <NuxtLink :to="localePath('/cities/' + city.value)">
              View
            </NuxtLink>
          </template>
        </UCard>
      </div>
    </UCard>
  </div>
</template>
