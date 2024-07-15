import axios from 'axios';
import type { Coach } from '@/types/Coach';
import type { NewCoach } from '@/types/NewCoach';
import type { Member } from '@/types/Member';
import type { NewMember } from '@/types/NewMember';

const API_URL = 'http://127.0.0.1:3000';

export const membersService = {
    //GetClientsByCoachId
    async getMembersByCoachId(coachId: number): Promise<Member[]> {
        try {
            const response = await axios.get<Member[]>(`${API_URL}/members?coach_id=${coachId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching clients:', error);
            throw error;
        }
    },

    //AddMember
    async addMember(member: NewMember): Promise<Member> {
        try {
            const response = await axios.post<Member>(`${API_URL}/members`, member);
            return response.data;
        } catch (error) {
            console.error('Error adding client:', error);
            throw error;
        }
    },

    //removeMember
    async removeMember(memberId: number): Promise<void> {
        try {
            await axios.delete(`${API_URL}/members/${memberId}`);
        } catch (error) {
            console.error('Error removing client:', error);
            throw error;
        }
    },

    //EditMember
    async editMember(member: Member): Promise<Member> {
        try {
            const response = await axios.put<Member>(`${API_URL}/members/${member.id}`, member);
            return response.data;
        } catch (error) {
            console.error('Error editing client:', error);
            throw error;
        }
    },
}