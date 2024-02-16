<template>
  <UCard
    class="flex flex-col items-center justify-center mx-auto h-96 mt-24 px-8 w-full md:w-96 text-center"
  >
    <Icon name="i-lucide-archive-x" class="h-12 w-12 mb-2" />
    <h1 class="text-lg font-bold mb-2">Location not found</h1>
    <p class="text-center">
      Sorry, we couldn't find the location you're looking for.
    </p>
    <NuxtLink to="/">
      <UButton color="black" variant="solid" size="lg" class="mt-4">
        Go back to home
      </UButton>
    </NuxtLink>
  </UCard>
</template>
