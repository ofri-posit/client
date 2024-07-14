import axios from 'axios';
import type { Coach } from '@/types/Coach';
import type { NewCoach } from '@/types/NewCoach';

const API_URL = 'http://127.0.0.1:3000';

export const coachService = {
    async getCoaches(): Promise<Coach[]> {
        try {
            const response = await axios.get<Coach[]>(`${API_URL}/coaches`);
            return response.data;
        } catch (error) {
            console.error('Error fetching coaches:', error);
            throw error;
        }
    },


    async addCoach(coach: Coach): Promise<Coach> {
        try {
            const response = await axios.post<Coach>(`${API_URL}/coaches`, coach);
            return response.data;
        } catch (error) {
            console.error('Error adding coach:', error);
            throw error;
        }
    },

    async removeCoach(coachId: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/coaches/${coachId}`);
        } catch (error) {
            console.error('Error removing coach:', error);
            throw error;
        }
    },

    //EditCoach
    async editCoach(coach: Coach): Promise<Coach> {
        try {
            const response = await axios.put<Coach>(`${API_URL}/coaches/${coach.id}`, coach);
            return response.data;
        } catch (error) {
            console.error('Error editing coach:', error);
            throw error;
        }
    },


    async getCoach(coachId: number): Promise<Coach> {
        try {
            const response = await axios.get<Coach>(`${API_URL}/coaches/${coachId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching coach:', error);
            throw error;
        }
    }

};