import axios from 'axios';
import type { Coach } from '@/types/Coach';

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


};