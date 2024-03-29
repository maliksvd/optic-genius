<script setup>
const route = useRoute();

/**
 * Get the current locale path*
 * @returns {string}
 * @property {string} locale
 * @property {string} locales
 * @property {string} localePath
 */
const localePath = useLocalePath();
const { locale, locales } = useI18n();

/**
 * Define the city from the route params
 * @returns {string}
 */
const { city } = route.params;

/**
 * Define the query params from the route
 * @returns {string}
 * @property {string} service
 * @property {string} borough
 * @property {string} occupation
 */
const serviceParamURL = route.query.service;
const boroughParamURL = route.query.borough;
const occupationParamURL = route.query.occupation;

/**
 * Register reactive variables
 * @returns {string}
 * @property {string} selectedService
 * @property {string} selectedOccupation
 * @property {string} selectedBorough
 * @property {boolean} walkIns
 * @property {boolean} hasEmergency
 */
const selectedService = ref("");
const selectedOccupation = ref("");
const selectedBorough = ref("");
const walkIns = ref(false);
const hasEmergency = ref(false);

// Fetch data from the API with params
const queryParams = new URLSearchParams();
if (serviceParamURL) {
  queryParams.append("service", serviceParamURL);
}
if (boroughParamURL) {
  queryParams.append("borough", boroughParamURL);
}
if (occupationParamURL) {
  queryParams.append("occupation", occupationParamURL);
}

const { data, pending, error, refresh } = await useFetch(
  "/api/locations/" + city + "?" + queryParams.toString()
);

const allLocations = ref();

watchEffect(() => {
  allLocations.value = data.value;
});

// Get the services and boroughs for the filter from the local api
const { data: fetchServices } = await useFetch("/api/services/");
const getServices = ref(fetchServices.value.services);

const { data: fetchBoroughs } = await useFetch("/api/boroughs?city=" + city);
const getBoroughs = ref(fetchBoroughs.value);

const getOccupations = [
  { label: "Select an occupation", value: "" },
  { label: "Optometrist", value: "optometrist" },
  { label: "Optician", value: "optician" },
  { label: "Ophthalmologist", value: "ophthalmologist" },
];

const formatBorough = ref(getBoroughs.value.boroughs);

const filteredLocations = computed(() => {
  if (allLocations.value && allLocations.value.locations) {
    return allLocations.value.locations.filter((location) => {
      const serviceMatch =
        !selectedService.value ||
        location.services_offered.includes(selectedService.value);
      const occupationMatch =
        !selectedOccupation.value ||
        (Array.isArray(location.occupation_type) &&
          location.occupation_type.some(
            (occupation) => occupation.type === selectedOccupation.value
          ));
      const boroughMatch =
        !selectedBorough.value || location.borough === selectedBorough.value;
      const walkInsMatch = !walkIns.value || location.walk_ins_welcome == 1;
      const emergencyMatch =
        !hasEmergency.value || location.emergency_services == 1;

      return (
        serviceMatch &&
        occupationMatch &&
        boroughMatch &&
        walkInsMatch &&
        emergencyMatch
      );
    });
  }
  return []; // Retourne un tableau vide si allLocations n'est pas encore défini
});

useSeoMeta({
  title: "Find service in " + city,
  description: "Find the best service in " + city,
  lang: locale.value,
  ogTitle: "Find service in " + city,
  ogDescription: "Find the best service in " + city,
  twitterTitle: "Find service in " + city,
  twitterDescription: "Find the best service in " + city,
  twitterCard: "app",
});
</script>

<template>
  <div style="--stagger: 1" data-animate>
    <h1
      class="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight"
    >
      {{ $t("findServiceIn") }}
      <span class="capitalize font-bold">{{ city }}</span>
    </h1>
    <p class="mt-4 text-lg text-gray-500 dark:text-gray-400">
      {{ $t("filterDescription") }}
    </p>
    <UDivider class="my-8" />
    <div
      class="flex flex-col md:flex-row space-x-0 space-y-12 md:space-y-0 md:space-x-12 items-start justify-center mt-12"
    >
      <aside class="w-full md:w-[450px] md:sticky md:h-screen md:top-8">
        <UCard>
          <h2 class="text-lg font-semibold mb-4">{{ $t("filterBy") }}</h2>
          <div class="grid grid-cols-1 gap-4">
            <USelect
              v-model="selectedService"
              :options="getServices"
              icon="i-solar-help-bold"
              size="xl"
              :placeholder="$t('selectService')"
              class="w-full"
            />
            <USelect
              v-model="selectedOccupation"
              :options="getOccupations"
              icon="i-solar-diploma-bold"
              size="xl"
              :placeholder="$t('selectOccupation')"
              class="w-full text-black"
            />
            <USelect
              v-model="selectedBorough"
              :options="formatBorough.map((item) => item.name)"
              size="xl"
              icon="i-solar-map-bold"
              :placeholder="$t('selectBorough')"
              class="w-full"
            />
          </div>
        </UCard>
      </aside>

      <main>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-if="filteredLocations.length === 0"
            style="--stagger: 1"
            data-animate
            class="text-center w-full flex flex-col items-center justify-center mx-auto my-12"
          >
            <Icon
              name="i-solar-folder-error-broken"
              class="text-black w-8 h-8"
            />
            <p class="text-2xl font-semibold mb-4 text-center w-full">
              No results found for your search
            </p>
          </div>
          <div
            v-for="location in filteredLocations"
            :key="location.slug"
            style="--stagger: 1"
            data-animate
          >
            <NuxtLink
              :to="localePath(`/location/${location.slug}`)"
              :key="location.slug"
            >
              <UCard>
                <img
                  :src="location.storefrontphoto || '/placeholder.png'"
                  :alt="location.title"
                  class="w-full h-56 object-cover mb-2 rounded-md dark:opacity-30"
                />
                <div>
                  <div class="text-lg mt-4 font-semibold">
                    {{ location.title }}
                  </div>
                  <div class="mt-2">
                    <UBadge
                      v-if="location.walk_ins_welcome == 1"
                      color="green"
                      variant="subtle"
                      >Walk-ins welcome</UBadge
                    >
                    <UBadge v-else color="red" variant="subtle"
                      >Only by appointment</UBadge
                    >
                  </div>
                </div>
              </UCard>
            </NuxtLink>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
