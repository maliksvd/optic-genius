<template>
  <div class="fixed bottom-0 bg-white border-t py-2 px-4 w-full z-50">
    <UPopover :popper="{ placement: 'top-start' }">
      <UButton
        color="white"
        variant="solid"
        size="lg"
        label="Navigation"
        icon="i-ph-list"
        @click="toggleNavigation"
        class="md:hidden"
      />

      <template #panel>
        <div class="p-2">
          <UVerticalNavigation
            :links="itemsNavigation"
            :ui="{ size: 'text-base' }"
          />
        </div>
      </template>
    </UPopover>
  </div>
</template>

<script lang="ts" setup>
const { locale, locales } = useI18n();
const localePath = useLocalePath();

const itemsNavigation = ref([
  {
    label: "Home",
    icon: "i-ph-house-simple",
    to: localePath("/"),
  },
  {
    label: "Find a service",
    icon: "i-ph-hand-heart",
    to: localePath("/search/services"),
  },
  {
    label: "Cities",
    icon: "i-ph-map-trifold",
    to: localePath("/search/cities"),
  },
  {
    label: "Education",
    icon: "i-ph-book-bookmark",
    to: localePath("/education"),
  },
  {
    label: "About",
    icon: "i-ph-envelope",
    to: localePath("/about"),
  },
]);

const navigationOpen = ref(false);

const toggleNavigation = () => {
  navigationOpen.value = !navigationOpen.value;
};
</script>

<style></style>
