<template>
    <div>
        <div class="flex flex-wrap gap-3">
            <div class="w-full lg:w-[50%]">
                <Calander @date-selected="onDateSelected" />
            </div>
            <div class="c w-full lg:w-[40%]">
                <WorkoutList @remove-selected-day="onDateSelected('')" :selected-day="selectedDay"
                    :coach_id="coach?.id" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Coach } from '@/types/Coach';
import { Workout } from '@/types/Workout';
import { onMounted, ref } from 'vue';

import { workoutService } from '@/services/WorkoutService';
import { useWorkoutStore } from '@/stores/workoutStore';

import Calander from '@/components/Calander.vue'
import WorkoutList from '@/components/Coach/Panel/Workout/WorkoutList.vue';

const workoutStore = useWorkoutStore();


const props = defineProps({
    coach: Coach,
});

const selectedDay = ref();


const onDateSelected = (date: Object) => {
    selectedDay.value = date;
    loadData();

}

// const resetSelectedDate = () => {
//     selectedDay.value = undefined
//     loadData();
// }

const loadData = () => {
    workoutService.getWorkoutsByCoachId(Number(props.coach?.id))
        .then((data) => {
            workoutStore.setWorkouts(data, selectedDay);


        });
}

onMounted(() => {
    loadData();
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