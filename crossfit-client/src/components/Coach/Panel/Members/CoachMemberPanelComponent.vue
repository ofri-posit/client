<template>
    <div>
        <div class="info-header">
            <div class="info-header-buttons">
                <div @click="showNewMemberModal = true" class="info-header-button">
                    <i class="fas fa-plus"></i>
                    Add member
                </div>
                <div @click="() => { toast.error(`Feature not supported yet.`) }" class="info-header-button">
                    <i class="fas fa-filter"></i>
                    Filter
                </div>
            </div>
        </div>
        <div class="basic-info">
            <div v-if="(memberStore.members.length <= 0)" class="flex justify-center w-full">
                <p class="text-center text-xl font-bold">No members yet, add some members to your gym</p>
            </div>

            <div v-else v-for="member in memberStore.members" class="w-full lg:w-[20%] basic-info-card">
                <p class="h-2 flex justify-between">
                    <i @mouseenter="addHoverAnimation" @click="showEditModal(member)"
                        class="info-card-button fas fa-pen"></i>
                    <i @mouseenter="addHoverAnimation" @click="removeMember(member)"
                        class="info-card-button fas fa-trash"></i>
                </p>
                <div class="basic-info-card-header">
                    <p>
                        {{ member.name }}
                    </p>
                </div>
                <div class="basic-info-card-body text-sm">
                    <div v-if="member.last_workout_time">
                        <div class="">
                            Last workout
                        </div>
                        <div class="">
                            {{ new Date(member.last_workout_time).toLocaleString() }}
                        </div>
                    </div>
                    <p v-else>No workouts yet</p>
                </div>
            </div>

        </div>


        <MemberNewComponent :showNewMemberModal="showNewMemberModal" :coachId="coach?.id"
            @close-modal="showNewMemberModal = false" />

        <MemberEditComponent :show-edit-member-modal="showEditMemberModal" :selected-member="selectedMember"
            @close-modal="closeEditModal" />

    </div>
</template>

<script setup lang="ts">
import { Coach } from '@/types/Coach';
import { onMounted, ref } from 'vue';
import { membersService } from "@/services/MemberService";
import { useMemberStore } from "@/stores/memberStore";
import { useToast } from "vue-toastification";
import MemberNewComponent from './MemberNewComponent.vue';
import MemberEditComponent from './MemberEditComponent.vue';
import type { Member } from '@/types/Member';

const memberStore = useMemberStore();
const toast = useToast();

const showNewMemberModal = ref(false);
const showEditMemberModal = ref(false);


const selectedMember = ref<Member>();

const props = defineProps({
    coach: Coach
});

const addHoverAnimation = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const className = "fa-bounce";
    target.classList.add(className);
    setTimeout(() => {
        target.classList.remove(className);
    }, 800);
}


const removeMember = (member: Member) => {
    membersService.removeMember(member.id)
        .then(() => {
            memberStore.removeMember(member.id);
            toast.success(`Member ${member.name} removed`);
        }).catch((error) => {
            toast.error("Failed to remove member");
        });
}


const showEditModal = (member: Member) => {
    selectedMember.value = member;
    showEditMemberModal.value = true;
}

const closeEditModal = () => {
    showEditMemberModal.value = false;
}

onMounted(() => {
    membersService.getMembersByCoachId(Number(props.coach?.id))
        .then((members) => {
            memberStore.setMembers(members)

        }).catch((error) => {
            toast.error("Failed to load members");
        });
});
</script>

<style scoped>
.info-header {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-bottom: 1px solid #e2e8f0;
}

.basic-info {
    display: flex;
    flex-wrap: wrap;
    padding: 1rem;

}

.info-header-buttons {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

.info-header-button {
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;
}

.info-header-button:hover {
    background-color: #f7fafc;
    transform: translateY(-2px);
}

.info-card-button {
    transition: all 0.3s;
    box-shadow: 2px rgba(0, 0, 0, 0.1);
}

.info-card-button:hover {
    cursor: pointer;
}
</style>