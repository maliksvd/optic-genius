<script lang="ts" setup>
defineProps({
  phone: String,
});
const isAppointmentsModalOpen = ref(false);
</script>

<template>
  <div>
    <div class="flex items-center space-x-4">
      <UButton
        color="black"
        variant="solid"
        :label="$t('askAppointment')"
        size="xl"
        @click="isAppointmentsModalOpen = true"
      />

      <UButton color="white" variant="solid" size="xl">
        <a :href="'tel:' + phone"> Call {{ phone }}</a>
      </UButton>
    </div>

    <UModal v-model="isAppointmentsModalOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <h3 class="text-xl font-bold">{{ $t("askAppointment") }}</h3>
          <p class="text-base">
            {{ $t("askAppointmentMessage") }}
          </p>
        </template>

        <LocationAppointmentModalTabs />

        <template #footer>
          <Placeholder class="h-8" />
        </template>
      </UCard>
    </UModal>
  </div>
</template>
