<script setup>
const route = useRoute()

const slug = ref(route.params.slug)
const city = ref(route.params.city)

const { data, pending, error, refresh } = await useFetch('/api/locations/' + city.value + '/' + slug.value.join('/'), {

})

const getLocation = ref(data.value)

const getBusinesseHours = ref(getLocation.value.location.business_hours)

const isBusinessOpen = () => {
  const now = new Date();
  const day = now.toLocaleString('en-US', { weekday: 'long' }); // Get current day
  const currentTime = now.getHours() + ':' + now.getMinutes().toString().padStart(2, '0');

  const todayHours = getBusinesseHours[day];
  if (!todayHours) return false; // Closed if day not in businessHours

  const isOpen = currentTime >= todayHours.open && currentTime <= todayHours.close;
  return isOpen;

  return { isBusinessOpen };
};

const formatServices = () => {
  const services = getLocation.value.location.services_offered
  const formattedServices = JSON.parse(services)

  const formattedServicesWithSpaces = formattedServices.map(service => service.replace(/_/g, ' '))

  return formattedServicesWithSpaces
}

const formatOccupation = () => {
  const occupation = getLocation.value.location.occupation_type

  const formattedOccupationWithSpaces = occupation.map(occupation => occupation.type.replace(/_/g, ' '))

  return formattedOccupationWithSpaces
}


if (error.value) {
  console.log(error.value)
}

</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl my-8">
      <div class="mt-2 mb-6">
        <img :src="getLocation.location.storefrontphoto" alt="location image"
          class="rounded-lg object-cover h-64 w-full" />
      </div>
      <h1 class="text-2xl md:text-3xl font-bold text-black dark:text-white">
        {{ getLocation.location.title }}
      </h1>
      <div id="walkinsSection">
        <div v-if="getLocation.location.walk_ins_welcome === true" class="flex items-center my-2">
          <Icon name="i-ph-calendar-x-duotone" class="h-6 w-6 mr-1" />
          Walk-ins Welcome
        </div>
        <div v-else class="flex items-center my-2">
          <Icon name="i-ph-calendar-check-duotone" class="h-6 w-6 mr-2" />
          With Appointment Only
        </div>
      </div>
      <div>
        <UBadge v-if="isBusinessOpen === true" color="green" variant="subtle" class="my-2">
          Open
        </UBadge>
        <UBadge v-else color="red" variant="subtle" class="my-2">
          Closed
        </UBadge>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div v-if="getLocation.location.emergency === true">
            <UIcon name="i-ph-siren-duotone" class="text-red-500" />
            Emergency
          </div>
        </div>
      </div>
      <UDivider class="my-8" />
      <div id="aboutSection">
        <h2 class="text-xl md:text-2xl font-bold text-black dark:text-white">About</h2>
        <p class="mt-4">
          {{ getLocation.location.descriptions.en }}
        </p>
      </div>
      <UDivider class="my-8" />
      <div id="servicesSection">
        <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">Services</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="service in formatServices()" :key="service.id"
            class="ring-1 ring-gray-200 rounded-lg py-2 px-2 text-center">
            <div class="flex items-center">
              <span class="capitalize">{{ service }}</span>
            </div>
          </div>
        </div>
      </div>
      <UDivider class="my-8" />
      <div id="occupationSection">
        <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">Occupation available</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="service in formatOccupation()" :key="service.id"
            class="ring-1 ring-gray-200 rounded-lg py-2 px-2 text-center">
            <div class="flex items-center">
              <span class="capitalize">{{ service }}</span>
            </div>
          </div>
        </div>
      </div>
      <UDivider class="my-8" />
      <div id="geolocationSection">
        <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">Geolocation</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div class="flex items-center">
            <Icon name="i-ph-map-pin-duotone" class="h-6 w-6 mr-1" />
            {{ getLocation.location.street_address }}
          </div>
          <div class="flex items-center capitalize">
            <Icon name="i-ph-map-trifold-duotone" class="h-6 w-6 mr-1" />
            {{ getLocation.location.city }} - {{ getLocation.location.province }}
          </div>
        </div>
      </div>
      <UDivider class="my-8" />
      <div id="specializationSection">
        <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">Specialization</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="e in specialization" :key="e.id" class="ring-1 ring-gray-200 rounded-lg py-2 px-2 text-center">
            <div class="flex items-center">
              <span class="capitalize">{{ e }}</span>
            </div>
          </div>
        </div>
      </div>
      <UDivider class="my-8" />
      <div id="othersSection">
        <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">Others</h2>
        {{ getLocation.location.specialization }}
      </div>
    </main>
  </div>
</template>

<style>
</style>
