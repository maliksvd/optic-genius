<script lang="ts" setup>
defineProps({
  businessHours: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div id="hoursSection">
    <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">
      Hours
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div v-for="(hours, day) in businessHours" :key="day">
        <div>
          <strong>{{ day }}:</strong> {{ hours.open }} -
          {{ hours.close }}
        </div>
      </div>
    </div>
  </div>
</template>
