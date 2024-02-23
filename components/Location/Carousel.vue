<script lang="ts" setup>
defineProps({
  items: {
    type: Array,
    required: true,
  },
});
</script>
<template>
  <UCarousel
    v-slot="{ item }"
    :items="items"
    :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 mr-2' }"
    class="rounded-md overflow-hidden"
    arrows
  >
    <img :src="item" class="w-full" />
  </UCarousel>
</template>
