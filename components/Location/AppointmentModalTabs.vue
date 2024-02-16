<script lang="ts" setup>
const formTabs = ref([
  {
    id: "date-picker",
    label: "Choose a date",
    icon: "i-phwalk",
    slot: "date-picker",
    description: "Select a date to book an appointment.",
  },
  {
    id: "time-picker",
    label: "Choose a time",
    icon: "i-phclock",
    slot: "time-picker",
    description: "Select a time to book an appointment with available slots.",
  },
  {
    id: "confirmation",
    label: "Confirmation",
    icon: "i-phcheck",
    slot: "confirmation",
    description: "Review your appointment details and confirm.",
  },
]);

const slotsAvailables = ref([
  {
    date: "2022-01-01",
    times: [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "12:00 PM",
      "01:00 PM",
      "02:00 PM",
      "03:00 PM",
      "04:00 PM",
      "05:00 PM",
    ],
  },
]);
</script>

<template>
  <div>
    <UTabs :items="formTabs" :default-index="1">
      <template #date-picker> date pciker </template>

      <template #time-picker>
        <div class="grid grid-cols-1 gap-4">
          <UCard v-for="slot in slotsAvailables" :key="slot.date">
            <h3 class="text-lg font-bold">{{ slot.date }}</h3>
            <div class="grid grid-cols-3 gap-2">
              <div
                v-for="time in slot.times"
                :key="time"
                class="p-2 border rounded-md"
              >
                {{ time }}
              </div>
            </div>
          </UCard>
        </div>
      </template>

      <template #confirmation> confirmation </template>
    </UTabs>
  </div>
</template>

<style></style>
