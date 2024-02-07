<template>
  <div class="flex items-center justify-center text-center h-96">
    <div class="flex flex-col justify-center">
      <div
        class="text-3xl text-center md:text-left font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
      >
        {{ $t("seo.description") }}
      </div>
      <div class="max-w-[750px] text-center text-lg text-black sm:text-xl mt-2">
        {{ $t("seo.subDescription") }}
      </div>
      <div class="mt-8">
        <UButton
          color="white"
          variant="solid"
          size="lg"
          icon="i-ph-magnifying-glass"
          :ui="{ rounded: 'rounded-full' }"
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
