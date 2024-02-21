<script lang="ts" setup>
export interface IService {
  id: string;
  label: string;
  icon: string;
}
const { data, pending, error, refresh } = await useFetch("/api/services");

const services = ref<IService[]>((data.value?.services as IService[]) || []);
const search = ref<string>("");

const filteredData = computed(() => {
  if (search.value) {
    return services.value.filter((service) =>
      service.label?.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  return services.value;
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
        :key="service.value"
        :to="`/search/services/${service.value}`"
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
