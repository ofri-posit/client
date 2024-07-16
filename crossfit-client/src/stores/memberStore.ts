import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Member } from '@/types/Member'

export const useMemberStore = defineStore('member', () => {
    const members = ref<Member[]>([])

    const hasMembers = computed(() => members.value.length > 0)

    const addMember = (member: Member) => {
        members.value.push(member)
    }

    const removeMember = (id: number) => {
        members.value = members.value.filter(member => member.id !== id)
    }

    const getMemberById = (id: number) => {
        return computed(() => members.value.find(member => member.id === id))
    }

    const updateMember = (member: Member) => {
        const index = members.value.findIndex(m => m.id === member.id)
        members.value[index] = member
    }

    const setMembers = (newMembers: Member[]) => {
        members.value = newMembers
    }

    const getDisplayString = (member: Member) => {
        return `${member.name} ${member.email}`

    }



    return {
        members,
        hasMembers,
        addMember,
        removeMember,
        getMemberById,
        updateMember,
        setMembers,
        getDisplayString
    }
})