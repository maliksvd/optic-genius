<script setup>
const { getLocation, error } = useLocation();
const isOpen = isLocationOpen();

const isLoading = ref(true)

onMounted(() => {
  // create loading state  // simulate loading for 1.5 seconds
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
});
</script>

<template>
  <div>
    <Header />
    <div v-if="isLoading">
      <div
        class="flex flex-col items-center justify-center mx-auto h-screen px-8"
      >
        <Icon name="i-lucide-loader-2" class="h-12 w-12 mb-2 animate-spin" />
        <h1 class="text-lg font-bold mb-2">Loading...</h1>
        <p class="text-center">
          Just a moment, we're fetching the location you're looking for.
        </p>
      </div>
    </div>
    <div v-else>
      <div v-if="getLocation" class="container mx-auto px-6 md:max-w-7xl my-8">
        <div class="mt-2 mb-6">
          <img
            :src="getLocation.storefrontphoto"
            alt="location image"
            class="rounded-lg object-cover h-64 w-full"
          />
        </div>
        <section class="flex flex-col md:flex-grow">
          <div class="flex-initial w-full">
            <h1
              class="text-2xl md:text-3xl font-bold text-black dark:text-white"
            >
              {{ getLocation.title }}
            </h1>
            <div id="walkinsSection">
              <div
                v-if="getLocation.walk_ins_welcome === true"
                class="flex items-center my-2"
              >
                <Icon name="i-ph-calendar-x-duotone" class="h-6 w-6 mr-1" />
                Walk-ins Welcome
              </div>
              <div v-else class="flex items-center my-2">
                <Icon name="i-ph-calendar-check-duotone" class="h-6 w-6 mr-2" />
                With Appointment Only
              </div>
            </div>
            <div>
              <UBadge
                v-if="isOpen === true"
                color="green"
                variant="subtle"
                class="my-2"
              >
                Open
              </UBadge>
              <UBadge v-else color="red" variant="subtle" class="my-2">
                Closed
              </UBadge>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
              <div>
                <div v-if="getLocation.emergency === true">
                  <UIcon name="i-ph-siren-duotone" class="text-red-500" />
                  Emergency
                </div>
              </div>
            </div>
            <UDivider class="my-8" />
            <div id="aboutSection">
              <h2
                class="text-xl md:text-2xl font-bold text-black dark:text-white"
              >
                About
              </h2>
              <p class="mt-4">
                {{ getLocation.descriptions.en }}
              </p>
            </div>
            <UDivider class="my-8" />
            <div id="geolocationSection">
              <h2
                class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
              >
                Geolocation
              </h2>
              <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div class="flex items-center">
                  <Icon name="i-ph-map-pin-duotone" class="h-6 w-6 mr-1" />
                  {{ getLocation.street_address }}
                </div>
                <div class="flex items-center capitalize">
                  <Icon name="i-ph-map-trifold-duotone" class="h-6 w-6 mr-1" />
                  {{ getLocation.city }} -
                  {{ getLocation.province }}
                </div>
              </div>
            </div>
            <UDivider class="my-8" />
            <div id="othersSection">
              <h2
                class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
              >
                Others
              </h2>
              {{ getLocation.specialization }}
            </div>
          </div>
          <div class="bg-red-500 w-96"></div>
        </section>
      </div>
      <div v-else>
      <div class="flex flex-col items-center justify-center mx-auto h-screen">
        <Icon name="i-lucide-archive-x" class="h-12 w-12 mb-2" />
        <h1 class="text-lg font-bold mb-2">Location not found</h1>
        <p>Sorry, we couldn't find the location you're looking for.</p>
        <NuxtLink to="/" class="mt-4">
          <UButton class="bg-black rounded-full">Go back to home</UButton>
        </NuxtLink>
      </div>
    </div>
    </div>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
