<template>
    <div class="coach-add-panel">
        <button @click="showAllCoachModal = true"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">New</button>
    </div>

    <div v-if="showAllCoachModal"
        class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">Add New Coach</h2>
            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" id="name" v-model="newCoach.name"
                    class="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" v-model="newCoach.email"
                    class="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div class="flex justify-between">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    @click="coachService.addCoach(newCoach)">Save</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="showAllCoachModal = false">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'
import { onMounted, ref } from 'vue';

const coachStore = useCoachStore();

const newCoach = ref({
    name: '',
    email: '',
});


const showAllCoachModal = ref(false);


</script>

<style scoped></style>