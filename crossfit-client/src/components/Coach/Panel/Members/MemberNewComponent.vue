<template>
    <div v-if="showNewMemberModal"
        class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
        <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
            <h2 class="text-2xl font-bold mb-4 text-center">Add New Member</h2>
            <div class="mb-4">
                <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input type="text" id="name" v-model="newMember.name"
                    class="w-full border border-gray-300 p-2 rounded" />
            </div>
            <div class="mb-4">
                <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="email" id="email" v-model="newMember.email"
                    class="w-full border border-gray-300 p-2 rounded" />
            </div>

            <div class="flex justify-between">
                <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    @click="addMember(newMember)">Save</button>
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    @click="emit('close-modal')">Cancel</button>
            </div>
        </div>

    </div>
</template>

<script setup lang="ts">
import { useMemberStore } from '@/stores/memberStore';
import { membersService } from '@/services/MemberService'
import { onMounted, ref } from 'vue';
import { useToast } from 'vue-toastification';
import { type NewMember } from '@/types/NewMember';

const memberStore = useMemberStore();
const toast = useToast();

const newMember = ref<NewMember>({
    name: '',
    email: '',
    coach_id: 0
});

const props = defineProps({
    showNewMemberModal: Boolean,
    coachId: Number
});

const emit = defineEmits(['close-modal']);


const addMember = async (memberData: NewMember) => {

    //Check if name and email are not empty
    if (!memberData.name || !memberData.email) {
        toast.error('Name and email are required');
        return;
    }

    //Check if name is too long
    if (memberData.name.length > 50) {
        toast.error('Name is too long');
        return;
    }

    //CHeck if name is too short
    if (memberData.name.length < 3) {
        toast.error('Name is too short');
        return;
    }

    //Check if email has @ in it
    if (!memberData.email.includes('@')) {
        toast.error('Email is invalid');
        return;
    }



    if (!memberData.name || !memberData.email) {
        toast.error('Name and email are required');
        return;
    }

    newMember.value.coach_id = Number(props.coachId);
    try {
        const response = await membersService.addMember(memberData);
        toast.success('Member added successfully');
        memberStore.addMember(response);
        newMember.value.name = '';
        newMember.value.email = '';

        emit('close-modal');

    } catch (error) {
        console.error('Failed to add member:', error);
        toast.error('Failed to add member');
    }
}
</script>

<style scoped></style>