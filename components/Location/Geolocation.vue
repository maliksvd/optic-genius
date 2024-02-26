<script lang="ts" setup>
defineProps({
  steetAddress: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  province: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div id="geolocationSection">
    <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">
      {{ $t("slug.title.geolocation") }}
    </h2>
    <div class="grid grid-cols-2 md:grid-cols-2 gap-6">
      <div class="flex items-center">
        <Icon name="solar:map-point-wave-bold" class="h-5 w-5 mr-1" />
        {{ steetAddress }}
      </div>
      <div class="flex items-center capitalize">
        <Icon name="solar:streets-map-point-bold" class="h-5 w-5 mr-1" />
        {{ city }}, {{ province }}
      </div>
    </div>
  </div>
</template>
