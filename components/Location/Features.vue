<script lang="ts" setup>
defineProps({
  insuranceAccepted: {
    type: Boolean,
    required: false,
    default: false,
  },
  onlineOrderingAvailable: {
    type: Boolean,
    required: false,
    default: false,
  },
  childrenEyewearAvailable: {
    type: Boolean,
    required: false,
    default: false,
  },
  emergency: {
    type: Boolean,
    required: false,
    default: false,
  },
  hasContactLens: {
    type: Boolean,
    required: false,
    default: false,
  },
  telehealthServices: {
    type: Boolean,
    required: false,
    default: false,
  },
  averageWaitTime: {
    type: Number,
    required: false,
    default: 0,
  },
});
</script>

<template>
  <div id="featuresSection">
    <h2 class="mb-4 text-xl md:text-2xl font-bold text-black dark:text-white">
      Features
    </h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
      <div v-if="insuranceAccepted" class="flex items-center">
        <Icon name="ph:identification-badge" class="h-5 w-5 mr-1" />
        <div>
          {{
            insuranceAccepted === true
              ? "Accepts Insurance"
              : "Does not accept Insurance"
          }}
        </div>
      </div>
      <div v-if="onlineOrderingAvailable" class="flex items-center">
        <Icon name="ph:laptop" class="h-5 w-5 mr-1" />
        <div>
          {{
            onlineOrderingAvailable === true
              ? "Online Ordering Available"
              : "No Online Ordering Available"
          }}
        </div>
      </div>
      <div v-if="childrenEyewearAvailable" class="flex items-center">
        <Icon name="ph:baby" class="h-5 w-5 mr-1" />
        <div>
          {{
            childrenEyewearAvailable === true
              ? "Children Eyewear Available"
              : "No Children Eyewear Available"
          }}
        </div>
      </div>
      <div v-if="emergency" class="flex items-center">
        <Icon name="ph:siren" class="h-5 w-5 mr-1" />
        <div>
          {{ emergency === true ? "Emergency" : "No Emergency" }}
        </div>
      </div>
      <div v-if="hasContactLens" class="flex items-center">
        <Icon name="ph:eye" class="h-5 w-5 mr-1" />
        <div>
          {{
            hasContactLens === true
              ? "Contact Lens available"
              : "No Contact Lens"
          }}
        </div>
      </div>
      <div v-if="telehealthServices" class="flex items-center">
        <Icon name="ph:video" class="h-5 w-5 mr-1" />
        <div>
          {{
            telehealthServices === true
              ? "Telehealth Services"
              : "No Telehealth Services"
          }}
        </div>
      </div>
      <div v-if="averageWaitTime" class="flex items-center">
        <Icon name="ph:clock" class="h-5 w-5 mr-1" />
        <div>
          {{
            averageWaitTime
              ? averageWaitTime + " minutes average wait time"
              : "No Average Wait Time"
          }}
        </div>
      </div>
    </div>
  </div>
</template>
