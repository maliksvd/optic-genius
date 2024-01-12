<script lang="ts" setup>
const isOpen = ref(false)
</script>

<template>
  <div>
    <UButton label="Login with Email" @click="isOpen = true"
      class="py-2 px-5 bg-black border border-transparent rounded-full text-sm font-medium text-white" />

    <UModal v-model="isOpen">
      <div class="p-4">
        <Placeholder class="h-48" />
      </div>
    </UModal>
  </div>
</template>

<style>
</style>
