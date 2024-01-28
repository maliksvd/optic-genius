<script setup>
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Dynamic route params
const route = useRoute();
const slug = ref(route.params.slug);
const city = ref(route.params.city);

const apiUrl = ref(
  "/api/locations/" +
    city.value +
    "/" +
    (Array.isArray(slug.value) ? slug.value.join("/") : slug.value)
);

const { pending, data: location, error } = useFetch(apiUrl.value);

const isOpen = isLocationOpen();
</script>

<template>
  <div>
    <Header />
    <div>
      <div v-if="pending">
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
      <div v-if="error">Error: {{ error }}</div>
      <div v-else>
        <div v-if="location">
          <div class="container mx-auto px-6 md:max-w-7xl my-8">
            <div class="mt-2 mb-6">
              <Carousel
                :opts="{
                  align: 'center',
                  loop: true,
                }"
              >
                <CarouselContent>
                  <CarouselItem
                    v-for="image in location.gallery"
                    :key="image"
                    class="md:basis-1/2 lg:basis-1/3"
                  >
                    <img :src="image" :alt="location.title" class="h-72" />
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <section class="flex flex-col md:flex-row">
              <div class="flex-1">
                <h1
                  class="text-2xl md:text-3xl font-bold text-black dark:text-white"
                >
                  {{ location.title }}
                </h1>
                <div id="walkinsSection" class="mb-8">
                  <div
                    v-if="location.walk_ins_welcome === true"
                    class="flex items-center my-2 text-green-400 text-sm"
                  >
                    <Icon name="ph:calendar" class="h-5 w-5 mr-1" />
                    Walk-ins Welcome
                  </div>
                  <div
                    v-else
                    class="flex items-center my-2 text-red-500 text-sm"
                  >
                    <Icon name="ph:calendar" class="h-5 w-5 mr-1" />
                    With Appointment Only
                  </div>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div>
                    <div v-if="location.emergency === true">
                      <UIcon name="i-ph-siren-duotone" class="text-red-500" />
                      Emergency
                    </div>
                  </div>
                </div>
                <Separator class="my-8" />
                <div id="aboutSection">
                  <h2
                    class="text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    About
                  </h2>
                  <p class="mt-4">
                    {{ location.descriptions.en }}
                  </p>
                </div>
                <Separator class="my-8" />
                <div id="featuresSection">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Features
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
                    <div
                      v-if="location.insurance_accepted"
                      class="flex items-center"
                    >
                      <Icon
                        name="ph:identification-badge"
                        class="h-5 w-5 mr-1"
                      />
                      <div>
                        {{
                          location.insurance_accepted === true
                            ? "Accepts Insurance"
                            : "Does not accept Insurance"
                        }}
                      </div>
                    </div>
                    <div
                      v-if="location.online_ordering_available"
                      class="flex items-center"
                    >
                      <Icon name="ph:laptop" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.online_ordering_available === true
                            ? "Online Ordering Available"
                            : "No Online Ordering Available"
                        }}
                      </div>
                    </div>
                    <div
                      v-if="location.children_eyewear_available"
                      class="flex items-center"
                    >
                      <Icon name="ph:baby" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.children_eyewear_available === true
                            ? "Children Eyewear Available"
                            : "No Children Eyewear Available"
                        }}
                      </div>
                    </div>
                    <div v-if="location.emergency" class="flex items-center">
                      <Icon name="ph:siren" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.emergency === true
                            ? "Emergency"
                            : "No Emergency"
                        }}
                      </div>
                    </div>
                    <div v-if="location.contact_lens" class="flex items-center">
                      <Icon name="ph:eye" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.contact_lens === true
                            ? "Contact Lens available"
                            : "No Contact Lens"
                        }}
                      </div>
                    </div>
                    <div
                      v-if="location.telehealth_services"
                      class="flex items-center"
                    >
                      <Icon name="ph:video" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.telehealth_services === true
                            ? "Telehealth Services"
                            : "No Telehealth Services"
                        }}
                      </div>
                    </div>
                    <div
                      v-if="location.average_wait_time"
                      class="flex items-center"
                    >
                      <Icon name="ph:clock" class="h-5 w-5 mr-1" />
                      <div>
                        {{
                          location.average_wait_time
                            ? location.average_wait_time +
                              " minutes average wait time"
                            : "No Average Wait Time"
                        }}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator class="my-8" />
                <div id="geolocationSection">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Geolocation
                  </h2>
                  <div class="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <div class="flex items-center">
                      <Icon name="ph:map-pin" class="h-5 w-5 mr-1" />
                      {{ location.street_address }}
                    </div>
                    <div class="flex items-center capitalize">
                      <Icon name="ph:map-trifold" class="h-5 w-5 mr-1" />
                      {{ location.city }} -
                      {{ location.province }}
                    </div>
                  </div>
                </div>
                <Separator class="my-8" />
                <div id="othersSection">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Others
                  </h2>
                  {{ location.specialization }}
                </div>
                <Separator class="my-8" />
                <div id="hoursSection">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Hours
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3">
                    <div
                      v-for="(hours, day) in location.business_hours"
                      :key="day"
                    >
                      <div>
                        <strong>{{ day }}:</strong> {{ hours.open }} -
                        {{ hours.close }}
                      </div>
                    </div>
                  </div>
                </div>
                <Separator class="my-8" />
                <div id="paymentsSections">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Payments options
                  </h2>
                  <div class="grid grid-cols-1 md:grid-cols-3">
                    <div
                      v-for="(payment, index) in location.payment_options"
                      :key="index"
                    >
                      <div class="flex itens-center">
                        <Icon :name="payment.icon" class="h-6 w-6 mr-1" />
                        <p>{{ payment.label }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <Separator class="my-8" />
                <div id="productsSection">
                  <h2
                    class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white"
                  >
                    Products
                  </h2>
                </div>
              </div>
              <div class="w-96">
                <Card>
                  <CardHeader>
                    <h3 class="text-xl font-bold">Book an appointment</h3>
                    <p class="text-sm">
                      Book an appointment with this location. You can also call
                      them directly.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <Button class="w-full">
                      <Icon name="ph:calendar" class="h-5 w-5 mr-1" />
                      Ask for an appointment
                    </Button>
                  </CardContent>
                  <CardFooter>
                    <div class="flex space-x-4">
                      <Button variant="outline" class="w-full">
                        <Icon name="ph:phone" class="h-5 w-5 mr-1" />
                        <a :href="'tel:' + location.phone"> Phone Number </a>
                      </Button>
                      <Button variant="outline" class="w-full">
                        <Icon name="ph:laptop" class="h-5 w-5 mr-1" />
                        <a :href="'https://' + location.website"> Website </a>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>
            </section>
          </div>
        </div>
        <div v-else>
          <div
            class="flex flex-col items-center justify-center mx-auto h-screen px-8"
          >
            <Icon name="i-lucide-archive-x" class="h-12 w-12 mb-2" />
            <h1 class="text-lg font-bold mb-2">Location not found</h1>
            <p class="text-center">
              Sorry, we couldn't find the location you're looking for.
            </p>
            <NuxtLink to="/">
              <UButton
                color="primary"
                variant="solid"
                class="mt-4 rounded-full bg-black"
              >
                Go back to home
              </UButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
