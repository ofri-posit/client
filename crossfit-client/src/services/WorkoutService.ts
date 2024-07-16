import axios from 'axios';
import type { Workout } from '@/types/Workout';

const API_URL = 'http://127.0.0.1:3000';


export const workoutService = {
    //GetWorkoutsByCoachId
    async getWorkoutsByCoachId(coachId: number): Promise<Workout[]> {
        try {
            const response = await axios.get<Workout[]>(`${API_URL}/workouts?coach_id=${coachId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching workouts:', error);
            throw error;
        }
    },

    //RemoveWorkout
    async removeWorkout(workoutId: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/workouts/${workoutId}`);
        } catch (error) {
            console.error('Error removing workout:', error);
            throw error;
        }
    },

    //AddWorkout
    async addWorkout(workout: Object): Promise<Workout> {
        try {
            const response = await axios.post(`${API_URL}/workouts`, workout);
            return response.data;
        } catch (error) {
            console.error('Error adding workout:', error);
            throw error;
        }
    },

    //GetWorkoutSessionsByWorkoutIdAndCoachId
    async getWorkoutSessionsByWorkoutIdAndCoachId(coachId: number, workoutId: number): Promise<Workout[]> {
        try {
            const response = await axios.get<Workout[]>(`${API_URL}/workout_sessions?coach_id=${coachId}&workout_id=${workoutId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching workout sessions:', error);
            throw error;
        }
    },

    //addWorkoutSessions workout.id,coach.id,members[]
    async addWorkoutSession(workoutId: number, coachId: number, member: number): Promise<Workout[]> {
        try {
            const response = await axios.post(`${API_URL}/workout_sessions`, { workout_id: workoutId, member_id: member, coach_id: coachId });
            return response.data;
        } catch (error) {
            console.error('Error adding workout sessions:', error);
            throw error;
        }
    },


}