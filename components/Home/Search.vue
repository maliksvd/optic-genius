<template>
  <div class="flex items-center justify-center text-center h-full">
    <div class="flex flex-col justify-center">
      <div
        class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white md:text-5xl max-w-xl text-center"
      >
        {{ $t("seo.description") }}
      </div>
      <div class="mt-6 text-lg tracking-tight text-gray-600 dark:text-gray-300">
        {{ $t("seo.subDescription") }}
      </div>
      <div class="mt-8">
        <UButton
          color="white"
          variant="solid"
          size="lg"
          icon="i-ph-magnifying-glass"
        >
          <NuxtLink :to="localePath('/cities')">
            {{ $t("findService") }}
          </NuxtLink>
        </UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
</script>

<style></style>
