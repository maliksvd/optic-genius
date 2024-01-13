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


console.log(getLocation.value.location)

if (error.value) {
  console.log(error.value)
}

</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="mt-2 mb-6">
        <img :src="getLocation.location.storefrontphoto" alt="location image"
          class="rounded-lg object-cover h-64 w-full" />
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        {{ getLocation.location.title }}
      </h1>
      <UBadge v-if="isBusinessOpen === true" color="green" variant="subtle" class="my-2">
        Open
      </UBadge>
      <UBadge v-else color="red" variant="subtle" class="my-2">
        Closed
      </UBadge>

      <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <div v-if="getLocation.location.emergency === true">
            <UIcon name="i-ph-siren-duotone" class="text-red-500" />
            Emergency
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style>
</style>
