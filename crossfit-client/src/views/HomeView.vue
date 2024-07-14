<script setup lang="ts">
import { onMounted } from 'vue'
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'

import CoachList from '@/components/Coach/CoachListComponent.vue'
import CoachNew from '@/components/Coach/CoachNewComponent.vue'

const coachStore = useCoachStore()

onMounted(() => {
  coachService.getCoaches().then((coaches) => {
    coachStore.setCoaches(coaches)
    console.log("Coaches loaded");

  })

})
</script>

<template>
  <div class="flex justify-center items-center flex-col">
    <div class="text-2xl font-bold">
      Welcome to Crossfit App
    </div>

    <div v-if="!coachStore.hasCoaches" class="flex justify-center flex-col items-center w-full">
      <p class="text-xl ">
        To get started click on the button below
      </p>

      <CoachNew />
    </div>

    <div v-else>
      <CoachList />
    </div>
  </div>
</template>
