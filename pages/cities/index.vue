<script lang="ts" setup>
// @ts-nocheck

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const { data, pending, error, refresh } = await useFetch('/api/cities')

</script>

<template>
  <div class="mb-12">
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card v-for="city in data" :key="city.id" class="">
          <CardHeader>
            <CardTitle class="text-sm">
              <NuxtLink :to="`/cities/${city.value}`">{{ city.label }}</NuxtLink>
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
    </main>
  </div>
</template>
