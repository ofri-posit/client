<template>
    <div class="flex flex-col lg:flex-row justify-start h-screen">
        <div class="menu w-full lg:w-[20%]">
            <div class="menu-base p-2 mt-3 flex flex-col h-full justify-between">
                <div>
                    <div class="menu-title flex justify-center text-2xl font-bold mb-3">
                        <p>Hello {{ coach?.name }}</p>
                    </div>
                    <div class="menu-items flex flex-col p-3">
                        <div @click="applyPanel(0)" class="menu-item">
                            <i class="fas fa-house-user"></i>
                            Home
                        </div>
                        <div @click="applyPanel(1)" class="menu-item">
                            <i class="fas fa-users"></i>
                            Members
                        </div>
                    </div>
                </div>
                <div class="settings-item p-3">
                    <div @click="applyPanel(2)" class="menu-item">
                        <i class="fas fa-gear"></i>
                        Settings
                    </div>
                </div>
            </div>
        </div>
        <div class="seperator w-[0.3%] hidden lg:block"></div>
        <div class="portal w-full lg:w-[70%] bg-green-500 flex-1">
            <transition name="fade">
                <div v-if="panels[0]" key="home">Home</div>
                <div v-else-if="panels[1]" key="members">Members</div>
                <div v-else-if="panels[2]" key="settings">Settings</div>
                <div v-else key="select">Select a panel</div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router';
import { Coach } from '@/types/Coach';
import { coachService } from '@/services/CoachService';
import { onMounted, ref } from 'vue';

const panels = ref([false, false, false]);

const route = useRoute();

const coach = ref<Coach>();

const applyPanel = (index: number) => {
    if (panels.value[index]) return;
    console.log("Applying panel ", index);
    panels.value = panels.value.map(() => false);
    panels.value[index] = true;
    console.log("Selected pane is ", panels);
};

onMounted(async () => {
    const coachId = route.params.id;
    const response = await coachService.getCoach(Number(coachId));
    coach.value = response;
    console.log(`Coach: ${JSON.stringify(coach.value)}`);
});
</script>

<style scoped>
.menu {
    background: #ecdbd5;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
}

.seperator {
    background-color: #212572;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
}

.menu-item {
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    background: #e8d8d3;
    box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
}

.menu-item:hover {
    background: #d8c8c3;
    transform: translateX(5px);
    cursor: pointer;
}

.menu-item:active {
    transform: translateY(5px);
}

.settings-item {
    margin-top: auto;
}

.fade-enter-active {
    transition: opacity 1.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
