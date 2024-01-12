<script lang="ts" setup>

const { data, pending, error, refresh } = await useFetch('/api/cities')

</script>

<template>
  <div class="mb-12">
    <Header />
    <main class="container mx-auto px-6 md:max-w-7xl mt-8">
      <div class="grid grid-cols-2 md:grid-cols-6 gap-4">
        <UCard v-for="city in data" :key="city.id" class="">
          <NuxtLink :to="`/cities/${city.value}`">{{ city.label }}</NuxtLink>
        </UCard>
      </div>
    </main>
  </div>
</template>
