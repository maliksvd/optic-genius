<script lang="ts" setup>
// import shadcn components

import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// import types
import type { Location } from '@/types/Location'
import type { Locations } from '@/types/Locations'
import type { Service } from '@/types/Service'

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'


import { Checkbox } from '@/components/ui/checkbox'


const route = useRoute()

// Dynamic route params
const { city } = route.params

// Query params
const borough = route.query.borough; // Define borough here
const service = route.query.service;
const limit = route.query.limit;

// Define the form schema
const formSchema = toTypedSchema(z.object({
  service: z.string().optional(),
  borough: z.string().optional(),
  allowWalkIns: z.boolean().optional(),
}))

// Define the form
const form = useForm({
  validationSchema: formSchema,
})

// Fetch data from the API with params
const { data, pending, error, refresh } = await useFetch('/api/locations/' + city)

const allLocations = ref<Location[]>(data<Locations>);

// Get the services and boroughs for the filter from the local api
const { data: getServices } = await useFetch('/api/services/');
const { data: getBoroughs } = await useFetch('/api/boroughs?city=' + city);

// if the form is submitted, filter the locations and if not, show all locations
const isFilterFormIsSubmitted = ref(false)

const onSubmit = form.handleSubmit((values) => {
  console.log('Form submitted!', values)

  // set the form to submitted
  isFilterFormIsSubmitted.value = true

  // filter the array of locations with the filters from the form
  computed(() => {
    const filteredLocations = allLocations.value?.locations.filter((location) => {
      return location.services_offered.includes(values.service)
    });
    console.log(filteredLocations);

  })

  console.log(isFilterFormIsSubmitted.value);

})


</script>

<template>
  <div>
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="my-8">
        <div class="flex flex-col md:flex-row space-x-0 space-y-4 md:space-x-4 md:space-y-0 w-full md:w-1/2">

          <Sheet>
            <SheetTrigger>
              <Button class="py-2 px-5 bg-black border border-transparent rounded-full text-sm font-medium text-white">
                <Icon name="ph:dots-three-circle-duotone" class="w-5 h-5 mr-1.5" />
                Filter results
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader class="mb-8">
                <SheetTitle>Filter results</SheetTitle>
                <SheetDescription>
                  Filter results by service and borough
                </SheetDescription>
              </SheetHeader>
              <form @submit="onSubmit">

                <FormField v-slot="{ componentField }" type="select"
                  name="service"">
                                                                                                                                                                                      <FormItem class="
                mt-6">
                  <FormLabel>Service</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="service in getServices" :key="service.value" :value="service.value">
                          {{ service.label }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" type="select"
                  name="borough"">
                                                                                                                                                                                      <FormItem class="
                mt-6">
                  <FormLabel>Borough</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a borough" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem v-for="borough in getBoroughs.boroughs" :key="borough.value" :value="borough.value">
                          {{ borough.name }}
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  </FormItem>
                </FormField>

                <Button class=" mt-8 w-full" type="submit">Apply filters</Button>
              </form>

            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div v-if="isFilterFormIsSubmitted === true">
          <div>
            <ul>
              <li v-for="location in filteredLocations" :key="location.id">
                {{ location.title }}
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div v-for="location in allLocations.locations" :key="location.id">
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
