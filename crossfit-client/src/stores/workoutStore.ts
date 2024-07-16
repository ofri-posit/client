import { ref, computed, type Ref } from 'vue'
import { defineStore } from 'pinia'
import type { Workout } from '@/types/Workout'

export const useWorkoutStore = defineStore('workout', () => {
    const workouts = ref<Workout[]>([])
    const monthlyWorkouts = ref<Workout[]>([])

    const hasWorkouts = computed(() => workouts.value.length > 0)

    const addWorkout = (workout: Workout) => {
        workouts.value.push(workout)
        //Check if workout is in this month and if so add it to the monthlyWorkouts array
        monthlyWorkouts.value.push(workout)
        const currentDate = new Date()
        const workoutDate = new Date(workout.start)
        if (workoutDate.getFullYear() === currentDate.getFullYear() && workoutDate.getMonth() === currentDate.getMonth()) {
        }
    }

    const removeWorkout = (workout: Workout) => {
        // //Remove the workout from the workouts array
        // const index = workouts.value.indexOf(workout)
        // if (index > -1) {
        //     workouts.value.splice(index, 1)
        // }

        // //Remove the workout from the monthlyWorkouts array
        // const monthlyIndex = monthlyWorkouts.value.indexOf(workout)
        // if (monthlyIndex > -1) {
        //     monthlyWorkouts.value.splice(monthlyIndex, 1)
        // }

    }



    const setWorkouts = (newWorkouts: Workout[], selectedDay: Ref<any>) => {
        workouts.value = newWorkouts

        //Filter the workouts by the selected day.year and month
        if (selectedDay.value) {

            const filteredWorkouts = workouts.value.filter((workout: Workout) => {
                const workoutDate = new Date(workout.start);

                return workoutDate.getFullYear() === selectedDay.value.year
                    && workoutDate.getMonth() === selectedDay.value.month
                    && workoutDate.getDate() == selectedDay.value.day;
            });

            monthlyWorkouts.value = filteredWorkouts;
        } else {
            monthlyWorkouts.value = newWorkouts;
        }

        console.log("Workouts", workouts.value);
        console.log("Monthly workouts", monthlyWorkouts.value);



    }

    const getDisplayString = (workout: Workout) => {
        return `${workout.start} ${workout.duration}`

    }

    return {
        workouts,
        monthlyWorkouts,
        hasWorkouts,
        addWorkout,
        removeWorkout,
        setWorkouts,
        getDisplayString
    }

})