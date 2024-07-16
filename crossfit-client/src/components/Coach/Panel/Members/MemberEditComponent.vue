<template>
    <div>

        <div v-if="showEditMemberModal"
            class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
            <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
                <h2 class="text-2xl font-bold mb-4 text-center">Edit Member</h2>
                <div class="mb-4">
                    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                    <input type="text" id="name" v-model="edittedMember.name"
                        class="w-full border border-gray-300 p-2 rounded" />
                </div>
                <div class="mb-4">
                    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input type="email" id="email" v-model="edittedMember.email"
                        class="w-full border border-gray-300 p-2 rounded" />
                </div>

                <div class="flex justify-between">
                    <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        @click="editMember">Save</button>
                    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                        @click="$emit('close-modal')">Cancel</button>
                </div>
            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore'
import { membersService } from '@/services/MemberService'
import { onMounted, ref, watch } from 'vue';
import { useToast } from 'vue-toastification';
import { Member } from '@/types/Member';

const memberStore = useMemberStore();
const toast = useToast();

const emit = defineEmits(['close-modal']);

const props = defineProps({
    selectedMember: Member,
    showEditMemberModal: Boolean
});

const edittedMember = ref<Member>({
    id: props.selectedMember?.id || 0,
    name: props.selectedMember?.name || '',
    email: props.selectedMember?.email || '',



});

const editMember = async () => {
    //Check if name and email are not empty
    if (!edittedMember.value.name || !edittedMember.value.email) {
        toast.error('Name and email are required');
        return;
    }
    //Check if name is too long
    if (edittedMember.value.name.length > 20) {
        toast.error('Name is too long');
        return;
    }

    //CHeck if name is too short
    if (edittedMember.value.name.length < 3) {
        toast.error('Name is too short');
        return;
    }

    //Check if email has @ in it
    if (!edittedMember.value.email.includes('@')) {
        toast.error('Invalid email');
        return;
    }
    edittedMember.value.last_workout_time = props.selectedMember?.last_workout_time;
    try {
        const response = await membersService.editMember(edittedMember.value);
        replaceMember(response);
        toast.success('Member edited successfully');
        emit('close-modal');
    } catch (error) {
        console.error('Failed to edit member:', error);
        toast.error('Failed to edit member');
    }
}

watch(() => props.selectedMember, (newVal) => {
    edittedMember.value = {
        id: newVal?.id || 0,
        name: newVal?.name || '',
        email: newVal?.email || '',
        last_workout_time: newVal?.last_workout_time || new Date()
    }
})

const replaceMember = (response: Member) => {
    if (!props.selectedMember) return;
    props.selectedMember.name = response.name;
    props.selectedMember.email = response.email;
    props.selectedMember.last_workout_time = response.last_workout_time;
}
</script>

<style scoped></style>