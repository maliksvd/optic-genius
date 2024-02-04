<template>
  <div class="container mx-auto px-6 md:max-w-7xl">
    <div class="flex items-center h-96">
      <div class="flex flex-col justify-start">
        <div
          class="text-3xl text-center md:text-left font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1]"
        >
          {{ $t("seo.description") }}
        </div>
        <div
          class="max-w-[750px] text-center md:text-left text-lg text-black sm:text-xl mt-2"
        >
          Fast, free and multi-language
        </div>
        <div class="mt-8">
          <HomeSearchBar />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n();
</script>

<style></style>
