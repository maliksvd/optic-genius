<script lang="ts" setup>
const { locale } = useI18n();

export interface City {
  value: string;
  label: string;
}
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
const {
  data: fetchCities,
  pending,
  error,
  refresh,
} = await useFetch("/api/cities");
const getCities = ref(fetchCities.value?.cities ?? []);

const search = ref<string>("");
const filteredData = computed(() => {
  if (search.value) {
    return getCities.value.filter((city) =>
      (city as City).label.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return getCities.value;
});

useHead({
  title: "All cities - Optic Genius",
});
</script>

<template>
  <div style="stagger: 100" data-animate>
    <h1 class="text-2xl font-bold mb-2">{{ $t("cities") }}</h1>
    <p>{{ $t("citiesDescription") }}</p>

    <UInput
      v-model="search"
      placeholder="Search a city"
      size="xl"
      class="mt-4 w-full md:max-w-sm"
    />

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      <NuxtLink
        v-for="city in filteredData"
        :key="city.value"
        :to="localePath(`/search/${city.value}`)"
        style="stagger: 100"
        data-animate
      >
        <UCard>
          <div class="flex flex-col items-center justify-center">
            <h1 class="text-sm">{{ city.label }}</h1>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
