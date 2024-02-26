<script setup>
// Dynamic route params
const route = useRoute();
const slug = ref(route.params.slug);

const {
  data: location,
  pending,
  error,
  refresh,
} = useFetch("/api/location/" + slug.value);
</script>

<template>
  <div v-if="pending">
    <LocationLoading />
  </div>
  <div v-else>
    <div v-if="location">
      <div
        class="mt-8 mb-24 flex flex-col space-x-0 space-y-6 md:space-x-6 md:space-y-0 md:flex-row"
      >
        <UCard class="flex-1" style="stagger: 100" data-animate>
          <h1 class="text-2xl md:text-3xl font-bold text-black dark:text-white">
            {{ location.title }}
          </h1>
          <LocationWalkins :isWalkinsWelcome="location.walk_ins_welcome" />
          <UDivider class="my-8" />
          <LocationFeatures
            :insuranceAccepted="location.insurance_accepted"
            :onlineOrderingAvailable="location.online_ordering_available"
            :childrenEyewearAvailable="location.children_eyewear_available"
            :emergency="location.emergency"
            :hasContactLens="location.has_contact_lens"
            :telehealthServices="location.telehealth_services"
            :averageWaitTime="location.average_wait_time"
          />
          <UDivider class="my-8" />
          <LocationGeolocation
            :steetAddress="location.street_address"
            :city="location.city"
            :province="location.province"
          />
          <UDivider class="my-8" />
          <LocationHours :businessHours="location.business_hours" />
        </UCard>
        <div class="w-full md:w-96 md:sticky md:h-screen md:top-8">
          <UCard style="--stagger: 1" data-animate>
            <template #header>
              <h3 class="text-xl font-bold">Book an appointment</h3>
              <p class="text-sm">
                Book an appointment with this location. You can also call them
                directly.
              </p>
            </template>
            <LocationAppointmentModal :phone="location.phone" />
            <template #footer>
              <div class="flex space-x-2 w-full">
                <UButton color="white" variant="solid" size="xl">
                  <Icon
                    name="solar:laptop-minimalistic-bold"
                    class="h-5 w-5 mr-1"
                  />
                  <a :href="'https://' + location.website"> Website </a>
                </UButton>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>
    <div v-if="!location">
      <LocationError />
    </div>
  </div>
</template>
