<script lang="ts" setup>
defineProps<{
  isWalkinsWelcome: boolean;
}>();
</script>

<template>
  <div id="walkinsSection" class="my-4">
    <UBadge color="green" variant="subtle" v-if="isWalkinsWelcome === true">
      <Icon name="ph:calendar" class="h-5 w-5 mr-1" />
      Walk-ins Welcome
    </UBadge>
    <UBadge color="red" variant="subtle" v-else>
      <Icon name="ph:calendar" class="h-5 w-5 mr-1" />
      With Appointment Only
    </UBadge>
  </div>
</template>
