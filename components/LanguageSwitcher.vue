<script lang="ts" setup>
const { locale, locales, setLocale } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code !== locale.value);
});
</script>

<template>
  <div>
    <div class="flex items-center space-x-2">
      <UButton
        v-for="locale in availableLocales"
        color="white"
        variant="solid"
        size="lg"
      >
        <NuxtLink :key="locale.code" :to="switchLocalePath(locale.code)">{{
          locale.name
        }}</NuxtLink></UButton
      >
    </div>
  </div>
</template>
