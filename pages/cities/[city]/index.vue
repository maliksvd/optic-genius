<script setup>
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const route = useRoute();

// Dynamic route params
const { city } = route.params;

// Query params
const serviceParamURL = route.query.service;
const boroughParamURL = route.query.borough;
const occupationParamURL = route.query.occupation;

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

const formatBorough = ref(getBoroughs.value.boroughs);

const filteredLocations = computed(() => {
  if (allLocations.value && allLocations.value.locations) {
    return allLocations.value.locations.filter((location) => {
      const serviceMatch =
        !selectedService.value ||
        location.services_offered.includes(selectedService.value);
      const occupationMatch =
        !selectedOccupation.value ||
        location.occupation_type.some(
          (occupation) => occupation.type === selectedOccupation.value
        );
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
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="my-8">
        <div
          class="flex flex-col md:flex-row space-x-0 space-y-4 md:space-x-4 md:space-y-0 w-full md:w-1/2"
        >
          <Select v-model="selectedService">
            <SelectTrigger>
              <SelectValue
                
                placeholder="Services available"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Services</SelectLabel>
                <template v-for="service in getServices">
                  <SelectItem :value="service.value">
                    {{ service.label }}
                  </SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select v-model="selectedOccupation">
            <SelectTrigger>
              <SelectValue
                v-model="selectedOccupation"
                placeholder="Occupation Type"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Occupation Type</SelectLabel>
                <SelectItem value="optician"> Optician </SelectItem>
                <SelectItem value="optometrist"> Optometrist </SelectItem>
                <SelectItem value="ophthalmologist">
                  Ophthalmologist
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select v-model="selectedBorough">
            <SelectTrigger>
              <SelectValue
                v-model="selectedBorough"
                placeholder="Borough"
              />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Borough</SelectLabel>
                <template v-for="borough in formatBorough">
                  <SelectItem :value="borough.value" v-model="selectedBorough">
                    {{ borough.name }}
                  </SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="location in filteredLocations" :key="location.slug">
            <NuxtLink
              :to="`/cities/${city}/${location.slug}`"
              :key="location.slug"
            >
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
            </NuxtLink>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
