<script lang="ts" setup>
const isOpen = ref(false);
</script>

<template>
  <div>
    <UButton
      @click="isOpen = true"
      size="xl"
      color="black"
      icon="i-solar-map-point-search-bold"
      :aria-label="$t('pages.home.searchButton')"
    >
      {{ $t("pages.home.searchButton") }}
    </UButton>
    <UModal v-model="isOpen">
      <UCard
        :ui="{
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <Placeholder class="h-8" />
        </template>

        <Placeholder class="h-32" />

        <template #footer>
          <div class="flex items-center justify-between w-full">
            <UButton
              @click="isOpen = false"
              size="xl"
              color="black"
              :label="$t('pages.home.searchButton')"
            />
          </div>
        </template>
      </UCard>
    </UModal>
  </div>
</template>
