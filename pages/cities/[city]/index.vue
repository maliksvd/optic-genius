<script setup>
const route = useRoute()

// Dynamic route params
const { city } = route.params

// Query params
const serviceParamURL = route.query.service;
const boroughParamURL = route.query.borough;
const occupationParamURL = route.query.occupation;

const selectedService = ref('');
const selectedOccupation = ref('');
const selectedBorough = ref('');
const walkIns = ref(false);
const hasEmergency = ref(false);

const filterModalIsOpen = ref(false)


// Fetch data from the API with params
const queryParams = new URLSearchParams();
if (serviceParamURL) {
  queryParams.append('service', serviceParamURL);
}
if (boroughParamURL) {
  queryParams.append('borough', boroughParamURL);
}
if (occupationParamURL) {
  queryParams.append('occupation', occupationParamURL);
}

const { data, pending, error, refresh } = await useFetch('/api/locations/' + city + '?' + queryParams.toString());

const allLocations = ref();

watchEffect(() => {
  allLocations.value = data.value;
});

console.log(allLocations.value)
console.log(error)

// Get the services and boroughs for the filter from the local api
const { data: getServices } = await useFetch('/api/services/');
const { data: getBoroughs } = await useFetch('/api/boroughs?city=' + city);

const formatBorough = ref(getBoroughs.value.boroughs)

const filteredLocations = computed(() => {
  if (allLocations.value && allLocations.value.locations) {
    return allLocations.value.locations.filter(location => {
      const serviceMatch = !selectedService.value || location.services_offered.includes(selectedService.value);
      const occupationMatch = !selectedOccupation.value || location.occupation_type.some(occupation => occupation.type === selectedOccupation.value);
      const boroughMatch = !selectedBorough.value || location.borough === selectedBorough.value;
      const walkInsMatch = !walkIns.value || location.walk_ins_welcome == 1;
      const emergencyMatch = !hasEmergency.value || location.emergency_services == 1;

      return serviceMatch && occupationMatch && boroughMatch && walkInsMatch && emergencyMatch;
    });
  }
  return []; // Retourne un tableau vide si allLocations n'est pas encore défini
});
</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="my-8">
        <div class="flex flex-col md:flex-row space-x-0 space-y-4 md:space-x-4 md:space-y-0 w-full md:w-1/2">
          <UButton @click="filterModalIsOpen = true"
            class="py-2 px-5 bg-black border border-transparent rounded-full text-sm font-medium text-white">
            <Icon name="ph:dots-three-circle-duotone" class="w-5 h-5 mr-1.5" />
            Filter results
          </UButton>
          <USlideover v-model="filterModalIsOpen">
            <UCard class="flex flex-col flex-1"
              :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
              <template #header>
                <div class="flex items-center justify-between">
                  <h3 class="text-base font-semibold leading-6 text-black dark:text-white">
                    Filtres
                  </h3>
                  <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                    @click="isOpen = false" />
                </div>
              </template>

              <div class="space-y-4">
                <UFormGroup label="Service">
                  <USelect v-model="selectedService" :options="getServices" option-attribute="label" size="md" />
                </UFormGroup>
                <UFormGroup label="Occupation">
                  <USelect v-model="selectedOccupation" :options="['', 'optician', 'optometrist', 'ophthalmologist']"
                    size="md" />
                </UFormGroup>

                <UFormGroup label="Borough">
                  <USelect v-model="selectedBorough" :options="formatBorough" option-attribute="name" size="md" />
                </UFormGroup>

                <div class="flex space-x-8">
                  <UFormGroup label="Accept Walk-ins">
                    <UToggle v-model="walkIns" label="Accept Walk-ins" />
                  </UFormGroup>

                  <UFormGroup label="Has Emergency Services">
                    <UToggle v-model="hasEmergency" label="Has Emergency Services" />
                  </UFormGroup>
                </div>
              </div>



              <template #footer>
                <Placeholder class="h-8" />
              </template>
            </UCard>
          </USlideover>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="  location   in   filteredLocations  " :key="location.id">
            <img :src="location.storefrontphoto" :alt="location.title" class="w-full h-56 object-cover mb-2 rounded-md" />
            <div class="text-sm font-semibold">
              <NuxtLink :to="`/cities/${city}/${location.slug}`">{{ location.title }}</NuxtLink>
            </div>
            <div class="text-xs capitalize">{{ location.location_type }} in <span class="capitalize">{{ location.city
            }}</span>
            </div>
            <div class="text-xs">
              <span v-if="location.walk_ins_welcome == 1" class="text-green-500">Walk-ins welcome</span>
              <span v-else class="text-red-500">Walk-ins not welcome</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
