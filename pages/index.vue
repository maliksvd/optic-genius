<script lang="ts" setup>
const {
  data: getCities,
  pending,
  error,
  refresh,
} = await useFetch("/api/cities");
const { data: getServices } = await useFetch("/api/services");

const cities = ref<string[]>(getCities.value?.map((city) => city.value) || []);
const services = ref<string[]>(
  getServices.value?.map((service) => service.value) || []
);
</script>

<template>
  <div class="my-12">
    <UCard>
      <h1>test</h1>
      <p>test</p>
    </UCard>
  </div>
</template>
