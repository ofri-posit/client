<template>
    <div class="coach-add-panel">
        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">New</button>
    </div>

    <div class="fixed bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">Add New Coach</h2>
            <div class="mb-4">
                <FormKit label="Coach Name" name="Coach Name" type="text" validation="required|text|length:2"
                    placeholder="Coach Name" :classes="{
                        outer: 'mb-4',
                        input: 'w-full border p-2 rounded'
                    }" />

            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'
import { onMounted, ref } from 'vue';
import { type Coach } from '@/types/Coach';

const coachStore = useCoachStore();




const showAllCoachModal = ref(false);


</script>

<style scoped></style>