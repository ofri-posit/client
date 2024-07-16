<template>
    <div>
        <div class="workout-container overflow-auto ">
            <div class="">
                <div v-if="selectedDay" class="flex justify-between text-center text-xl p-2">
                    <div class="">
                        {{ new Date(selectedDay.year, selectedDay.month, selectedDay.day).toLocaleDateString() }}
                    </div>
                    <div class="all-workouts-button new-button">
                        <div @click="showEditTimeModal = true" class="text-center text-xl">
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
                            <p @click="toggleWorkoutSessionView(workout)" class="">
                                <i class="fa-regular fa-eye"></i>
                            </p>
                            <p @click="removeWorkout(workout)" class="">
                                <i class="fas fa-x"></i>
                            </p>
                        </div>
                    </div>


                </div>
            </div>
            <!-- Shwo Edit Time Modal -->
            <div v-if="showEditTimeModal"
                class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
                    <h2 class="text-2xl font-bold mb-4 text-center">Add Workout</h2>
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Select Workout time</label>
                        <input type="time" id="name" class="w-full border border-gray-300 p-2 rounded"
                            v-model="selectedTime" />
                    </div>

                    <div class="mb-4">
                        <h2 class="text-2xl font-bold mb-4 text-center">Select Member</h2>
                        <div class=" flex p-1 gap-2">

                            <div @click="toggleMemberForWorkout($event, member)" v-for="member in memberStore.members"
                                :key="member.id" class="select-member-card">
                                {{ member.name }}
                            </div>
                        </div>
                    </div>


                    <div class="flex justify-between">
                        <button @click="addNewWorkout"
                            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Save</button>
                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            @click="showEditTimeModal = false">Cancel</button>
                    </div>
                </div>

            </div>

            <!-- Show workout sessions modal -->
            <div v-if="showWorkoutSessionsModal"
                class=" fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
                <div class="m-modal bg-white p-8 rounded-lg shadow-xl w-96">
                    <h2 class="text-2xl font-bold mb-4 text-center">Members</h2>


                    <div class="mb-4">
                        <div class=" flex p-1 gap-2">

                            <div v-for="member in workoutSessionsData" :key="member.id" class="select-member-card">
                                {{ member.name }}
                            </div>
                        </div>
                    </div>


                    <div class="flex justify-between">

                        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            @click="showWorkoutSessionsModal = false">Close</button>
                    </div>
                </div>

            </div>



        </div>
    </div>
</template>

<script setup lang="ts">
import { workoutService } from '@/services/WorkoutService';
import { useWorkoutStore } from '@/stores/workoutStore';
import { useMemberStore } from "@/stores/memberStore";
import { useToast } from "vue-toastification";
import { Workout } from '@/types/Workout';
import { ref } from 'vue';
import type { Member } from '@/types/Member';
import { membersService } from '@/services/MemberService';


const workoutStore = useWorkoutStore();
const memberStore = useMemberStore();
const toast = useToast();

const showEditTimeModal = ref(false);
const selectedTime = ref("10:00");
const selectedMembers = ref([]);

const showWorkoutSessionsModal = ref(false);
const workoutSessionsData = ref<Workout[]>();

const removeWorkout = (workout: Workout) => {
    console.log("Remove workout", workout);

    workoutService.removeWorkout(workout.id)
        .then(() => {
            workoutService.getWorkoutsByCoachId(Number(props.coach_id))
                .then((data) => {
                    workoutStore.setWorkouts(data, props.selectedDay);


                });
        });
}

const toggleMemberForWorkout = (event: Event, member: never) => {
    if (selectedMembers.value.includes(member)) {
        selectedMembers.value = selectedMembers.value.filter((m) => m !== member);
        event.target.style.backgroundColor = "#ead8d1";
    } else {
        selectedMembers.value.push(member);
        event.target.style.backgroundColor = "green";
    }

}

const props = defineProps({
    selectedDay: Object,
    coach_id: Number,
});

const addNewWorkout = () => {
    const hours = parseInt(selectedTime.value.split(":")[0]);
    const minutes = parseInt(selectedTime.value.split(":")[1]);
    const date = new Date(props.selectedDay?.year, props.selectedDay?.month, props.selectedDay?.day, hours, minutes)

    //Check if date is in the past
    if (date < new Date()) {
        toast.error("You can't add a workout in the past");
        return;
    }

    if (!memberStore.hasMembers) {
        toast.error("You need to add members first");
        return;
    }

    if (selectedMembers.value.length <= 0) {
        toast.error("Please select a member");
        return;
    }

    if (!selectedTime.value) {
        toast.error("Please select a time");
        return;
    }


    workoutService.addWorkout({
        start: date,
        coach_id: props.coach_id,
        duration: selectedTime.value,

    }).then(async (data) => {
        //Loop through selected members and add them to the workout
        for (const member of selectedMembers.value) {
            await workoutService.addWorkoutSession(
                data.id,
                Number(props.coach_id),
                member.id
            );

            member.last_workout_time = data.start;
            await membersService.editMember(member).then(() => {
            });
        }

        workoutStore.addWorkout(data);
        showEditTimeModal.value = false;
        selectedTime.value = "10:00";
        selectedMembers.value = [];
        toast.success("Workout added successfully");

    });
}

const toggleWorkoutSessionView = async (workout: Workout) => {
    console.log(`Coach id: ${props.coach_id}, Workout id: ${workout.id}`);

    workoutService.getWorkoutSessionsByWorkoutIdAndCoachId(Number(props.coach_id), workout.id)
        .then((data) => {
            showWorkoutSessionsModal.value = true;
            workoutSessionsData.value = data;
            console.log("workoutSessions", workoutSessionsData.value);
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

.select-member-card {
    background: #ead8d1;
    padding: 10px;
    width: 100px;
    text-align: center;
    transition: all 0.3s;
}



.select-member-card:hover {
    background: #d8c8c3;
    transform: translateY(-2px);
    cursor: pointer;


}
</style>