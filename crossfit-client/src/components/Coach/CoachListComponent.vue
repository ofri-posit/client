<template>

    <div v-for="coach in coachStore.coaches" :key="coach.id">
        {{ coach.name }}
    </div>

    <div>

    </div>
</template>

<script setup lang="ts">
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'

const coachStore = useCoachStore()



</script>

<style scoped></style>