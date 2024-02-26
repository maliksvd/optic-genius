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
  <div class="my-12">
    <UCard>
      <h1>test</h1>
      <p>test</p>
    </UCard>
  </div>
</template>
