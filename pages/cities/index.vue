<script lang="ts" setup>
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * Get the current locale path
 *
 * @returns {string}
 */
const localePath = useLocalePath();

/**
 * Fetch the cities from the API
 *
 * @returns {object}
 * @property {object[]} data
 * @property {boolean} pending
 * @property {boolean} error
 * @property {function} refresh
 *
 */
const { data, pending, error, refresh } = await useFetch("/api/cities");
</script>

<template>
  <div class="mb-12">
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card v-for="city in data" :key="city.id" class="">
          <NuxtLink :to="localePath('/cities/' + city.value)">{{
            city.label
          }}</NuxtLink>
        </Card>
      </div>
    </main>
  </div>
</template>
