<script lang="ts" setup>
export interface BusinessHours {
  [key: string]: { open: string; close: string };
}

const props = defineProps<{
  businessHours: BusinessHours;
}>();

const emit = defineEmits(["update:businessHours"]);

const sortedBusinessHours = computed(() => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  return daysOfWeek.map((day) => ({
    day,
    hours: props.businessHours[day] || { close: "Closed" },
  }));
});
</script>

<template>
  <div id="hoursSection">
    <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">
      Hours
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2">
      <div v-for="{ day, hours } in sortedBusinessHours" :key="day">
        <div>
          <strong>{{ day }}:</strong>
          {{ hours.open ? hours.open + " - " + hours.close : hours.close }}
        </div>
      </div>
    </div>
  </div>
</template>
