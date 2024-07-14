<template>
    <div @keydown="onKeyDown">

        <div class="coach-add-panel">
            <button @click="showAllCoachModal = true"
                class="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded ">Edit</button>
        </div>

        <div v-if="showAllCoachModal"
            class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 class="text-2xl font-bold mb-4 text-center">Edit Coach</h2>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" v-model="edittedCoach.name"
                        class="w-full border border-gray-300 p-2 rounded" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" v-model="edittedCoach.email"
                        class="w-full border border-gray-300 p-2 rounded" />
                </div>

                <div class="flex justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        @click="editCoach">Save</button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="showAllCoachModal = false">Cancel</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { useCoachStore } from '@/stores/coachStore'
import { coachService } from '@/services/CoachService'
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { Coach } from '@/types/Coach';

const coachStore = useCoachStore();
const toast = useToast();

const props = defineProps<{
    coach: Coach;
}>();

const edittedCoach = ref<Coach>({
    id: props.coach.id,
    name: props.coach.name,
    email: props.coach.email

});

const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        showAllCoachModal.value = false;
    }
}


const showAllCoachModal = ref(false);

const editCoach = async () => {
    //Check if name and email are not empty
    if (!edittedCoach.value.name || !edittedCoach.value.email) {
        toast.error('Name and email are required');
        return;
    }
    //Check if name is too long
    if (edittedCoach.value.name.length > 20) {
        toast.error('Name is too long');
        return;
    }

    //CHeck if name is too short
    if (edittedCoach.value.name.length < 3) {
        toast.error('Name is too short');
        return;
    }

    //Check if email has @ in it
    if (!edittedCoach.value.email.includes('@')) {
        toast.error('Invalid email');
        return;
    }
    try {
        const response = await coachService.editCoach(edittedCoach.value);
        replaceCoach(response);
        toast.success('Coach edited successfully');
        showAllCoachModal.value = false;
    } catch (error) {
        console.error('Failed to edit coach:', error);
        toast.error('Failed to edit coach');
    }
}
watch(showAllCoachModal, (newVal) => {
    console.log('showAllCoachModal:', newVal);

});

const replaceCoach = (response: Coach) => {
    props.coach.name = response.name;
    props.coach.email = response.email;
}
</script>

<style scoped></style>