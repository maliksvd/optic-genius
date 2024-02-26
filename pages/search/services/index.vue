<script lang="ts" setup>
const { locale } = useI18n();
const localePath = useLocalePath();

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
  <div style="stagger: 100" data-animate>
    <h1 class="text-2xl font-bold mb-2">{{ $t("services") }}</h1>
    <p>{{ $t("servicesDescription") }}</p>

    <UInput
      v-model="search"
      placeholder="Search services"
      size="xl"
      class="mt-4 w-full md:max-w-sm"
    />

    <div class="grid grid-cols-2 md:grid-cols-6 gap-4 mt-8">
      <NuxtLink
        v-for="service in filteredData"
        :key="service.value"
        :to="localePath(`/search/services/${service.value}`)"
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
