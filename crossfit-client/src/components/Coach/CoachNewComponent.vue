<template>
    <div class="coach-add-panel">
        <button @click="showAllCoachModal = true"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">New</button>
    </div>

    <div v-if="showAllCoachModal"
        class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
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
                    @click="addCoach(newCoach)">Save</button>
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
import { useToast } from 'vue-toastification';
import { type Coach } from '@/types/Coach';
import { type NewCoach } from '@/types/NewCoach';

const coachStore = useCoachStore();
const toast = useToast();

const newCoach = ref<NewCoach>({
    name: '',
    email: '',
});


const showAllCoachModal = ref(false);

const addCoach = async (coachData: NewCoach) => {

    //Check if name and email are not empty
    if (!coachData.name || !coachData.email) {
        toast.error('Name and email are required');
        return;
    }

    //Check if name is too long
    if (coachData.name.length > 50) {
        toast.error('Name is too long');
        return;
    }

    //CHeck if name is too short
    if (coachData.name.length < 3) {
        toast.error('Name is too short');
        return;
    }

    //Check if email has @ in it
    if (!coachData.email.includes('@')) {
        toast.error('Email is invalid');
        return;
    }



    if (!coachData.name || !coachData.email) {
        toast.error('Name and email are required');
        return;
    }

    try {
        const response = await coachService.addCoach(coachData);
        toast.success('Coach added successfully');
        coachStore.addCoach(response);
        showAllCoachModal.value = false;
    } catch (error) {
        console.error('Failed to add coach:', error);
        toast.error('Failed to add coach');
    }
}
</script>

<style scoped></style>