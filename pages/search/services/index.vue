<script lang="ts" setup>
const { data, pending, error, refresh } = await useFetch("/api/services");

const search = ref<string>("");
const filteredData = computed(() => {
  if (search.value) {
    return data.value.filter((service) =>
      service.label.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return data.value;
});
</script>

<template>
  <div class="mt-8" style="stagger: 100" data-animate>
    <h1 class="text-2xl font-bold mb-2">Services</h1>
    <p>Select a service to view the available cities</p>

    <UInput
      v-model="search"
      placeholder="Search services"
      size="lg"
      class="mt-4 w-full md:max-w-sm"
    />

    <div class="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
      <NuxtLink
        v-for="service in filteredData"
        :key="service.id"
        :to="`/search/services/${service.id}`"
        style="stagger: 100"
        data-animate
      >
        <UCard>
          <div class="flex flex-col items-center justify-center">
            <Icon :name="service.icon" class="w-6 h-6" />
            <h1 class="text-sm mt-2">{{ service.label }}</h1>
          </div>
        </UCard>
      </NuxtLink>
    </div>
  </div>
</template>
