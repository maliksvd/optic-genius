<script lang="ts" setup>
const { locale, locales } = useI18n();
const localePath = useLocalePath();

const isOpen = ref(false);

defineShortcuts({
  escape: {
    usingInput: true,
    whenever: [isOpen],
    handler: () => {
      isOpen.value = false;
    },
  },
});
</script>

<template>
  <div>
    <UButton
      color="white"
      variant="solid"
      icon="i-ph-list"
      @click="isOpen = true"
      size="lg"
      :ui="{ rounded: 'rounded-full' }"
      label="Navigation"
    />
    <USlideover v-model="isOpen" side="left">
      <UCard
        class="flex flex-col flex-1"
        :ui="{
          body: { base: 'flex-1' },
          ring: '',
          divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        }"
      >
        <template #header>
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
            >
              Navigation
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isOpen = false"
            />
          </div>
        </template>

        <ul class="flex flex-col space-y-4">
          <li>
            <NuxtLink :to="localePath('/')"> Find a service </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/cities')"> Cities </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/about')"> About </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="localePath('/contact')"> Contact </NuxtLink>
          </li>
        </ul>

        <template #footer>
          <LanguageSwitcher />
        </template>
      </UCard>
    </USlideover>
  </div>
</template>
