<template>
    <div>
        <div class="workout-container overflow-auto ">
            <div class="">
                <div v-if="selectedDay" class="flex justify-between text-center text-xl p-2">
                    <div class="">
                        {{ new Date(selectedDay.year, selectedDay.month, selectedDay.day).toLocaleDateString() }}
                    </div>
                    <div class="all-workouts-button new-button">
                        <div @click="addNewWorkout" class="text-center text-xl">
                            <i class="fas fa-plus"></i>
                        </div>
                    </div>
                    <div @click="$emit('remove-selected-day')" class="all-workouts-button">
                        <div class="text-center text-xl">All Workouts</div>
                    </div>
                </div>
                <div v-else class="text-center text-xl">All workouts</div>

                <div v-if="(workoutStore.monthlyWorkouts.length <= 0)" class="text-center text-xl font-bold">Not
                    workouts for this
                    month</div>
                <div v-else class="flex flex-col p-2 ">

                    <div class="flex justify-between workout-base p-6 mb-2"
                        v-for="workout in workoutStore.monthlyWorkouts">

                        <div class="workout-data">
                            {{ new Date(workout.start).toLocaleString() }}
                        </div>
                        <div class="flex gap-3">
                            <p class="">
                                <i class="fa-regular fa-eye"></i>
                            </p>
                            <p @click="removeWorkout(workout)" class="">
                                <i class="fas fa-x"></i>
                            </p>
                        </div>
                    </div>


                </div>
            </div>


        </div>
    </div>
</template>

<script setup lang="ts">
import { workoutService } from '@/services/WorkoutService';
import { useWorkoutStore } from '@/stores/workoutStore';
import { Workout } from '@/types/Workout';


const workoutStore = useWorkoutStore();


const removeWorkout = (workout: Workout) => {
    workoutService.removeWorkout(workout.id)
        .then(() => {
            workoutStore.removeWorkout(workout);
        });
}

const props = defineProps({
    selectedDay: Object,
});

const addNewWorkout = () => {

    workoutService.addWorkout({
        start: new Date(),
        coach_id: 22,
        duration: 60,
        id: 0,

    }).then((data) => {
        workoutStore.addWorkout(data);
        console.log(workoutStore.monthlyWorkouts);

    });
}


</script>

<style scoped>
* {
    border-radius: 10px;
}

.workout-container {
    background: #ffffff;
    height: 370px;

}

.workout-base {
    flex: 1;
    background: #f7f1f1;
}

i {
    transition: all 0.3s;
}

i:hover {
    transform: translateY(-2px);
    cursor: pointer;
}

.all-workouts-button {
    transition: all 0.3s;
}

.all-workouts-button:hover {
    transform: translateY(-2px);
    cursor: pointer;
}
</style>