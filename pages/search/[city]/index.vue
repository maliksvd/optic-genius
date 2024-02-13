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
const { data: getServices } = await useFetch("/api/services/");
const { data: getBoroughs } = await useFetch("/api/boroughs?city=" + city);
const getOccupations = [
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
</script>

<template>
  <div>
    <UCard class="my-6">
      <div class="grid grid-cols-5 gap-8">
        <USelect
          v-model="selectedService"
          :options="getServices"
          icon="i-ph-hand-heart"
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          placeholder="Select a service"
          class="w-full"
        />
        <USelect
          v-model="selectedOccupation"
          :options="getOccupations"
          icon="i-ph-certificate"
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          placeholder="Select an occupation"
          class="w-full"
        />
        <USelect
          v-model="selectedBorough"
          :options="formatBorough"
          size="lg"
          :ui="{ rounded: 'rounded-full' }"
          icon="i-ph-map-pin"
          placeholder="Select a borough"
          class="w-full"
        />
      </div>
    </UCard>
    <main>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="location in filteredLocations" :key="location.slug">
          <NuxtLink
            :to="localePath(`/location/${location.slug}`)"
            :key="location.slug"
          >
            <UCard>
              <img
                :src="location.storefrontphoto"
                :alt="location.title"
                class="w-full h-56 object-cover mb-2 rounded-md"
              />
              <div>
                <div class="text-sm font-semibold">
                  {{ location.title }}
                </div>
                <div class="text-xs">
                  <span
                    v-if="location.walk_ins_welcome == 1"
                    class="text-green-500"
                    >Walk-ins welcome</span
                  >
                  <span v-else class="text-red-500">Walk-ins not welcome</span>
                </div>
              </div>
            </UCard>
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>
