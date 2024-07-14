<template>

    <div class="container mx-auto p-4 w-full">
        <h1 class="flex justify-between">
            <p class="text-xl font-bold mb-4 ">
                Coaches
            </p>
            <div class="text-sm">
                <CoachNewComponent />
            </div>
        </h1>

        <!-- List of coaches -->
        <ul class="space-y-2 mt-2">
            <li v-for="coach in coachStore.coaches" :key="coach.id"
                class="flex items-center justify-between bg-white p-3 rounded shadow">
                <span>{{ coach.name }}</span>
                <div class="flex gap-2 text-sm justify-center items-center">
                    <RouterLink :to="`/coach/${coach.id}`"
                        class="bg-green-500 hover:bg-green-700 text-white px-2 py-1 rounded ">
                        View
                    </RouterLink>
                    <CoachEditComponent :coach="coach" />
                    <button @click="removeCoach(coach.id)"
                        class="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded">
                        Remove
                    </button>
                </div>
            </li>
        </ul>


    </div>
</template>

<script setup lang="ts">
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'
import CoachNewComponent from './CoachNewComponent.vue';
import CoachEditComponent from './CoachEditComponent.vue';
import { useToast } from 'vue-toastification';

const coachStore = useCoachStore()
const toast = useToast()



const removeCoach = async (coachId: number) => {
    try {
        await coachService.removeCoach(coachId);
        coachStore.removeCoach(coachId);
        toast.success('Coach removed successfully');

    } catch (error) {
        console.error('Failed to remove coach:', error);
        toast.error('Failed to remove coach');
    }
}


</script>

<style scoped></style>