<script lang="ts" setup>
const { locale, locales } = useI18n();

useSeoMeta({
  title: "Optic Genius" as string,
  description: "Find the eye professional near you" as string,
  lang: locale.value as string | undefined,
  ogTitle: "Optic Genius" as string,
  ogDescription: "Find the eye professional near you" as string,
  twitterTitle: "Optic Genius" as string,
  twitterDescription: "Find the eye professional near you" as string,
  twitterCard: "app" as string,
});
</script>

<template>
  <div class="container mx-auto px-container">
    <div
      class="container mx-auto max-w-3xl flex flex-col items-center justify-center"
    >
      <h1
        class="text-center text-4xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]"
      >
        {{ $t("pages.home.title") }}
      </h1>
      <p
        class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl mt-6"
      >
        {{ $t("pages.home.subTitle") }}
      </p>
      <div class="flex items-center space-x-2 mt-8">
        <HomeSearchModal />
        <UButton size="xl" color="white" icon="i-solar-info-square-bold">
          {{ $t("learnMore") }}
        </UButton>
      </div>
    </div>
  </div>
</template>
