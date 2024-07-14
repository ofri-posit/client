import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { type Coach } from '@/types/Coach'

export const useCoachStore = defineStore('coach', () => {
    const coaches = ref<Coach[]>([])

    const hasCoaches = computed(() => coaches.value.length > 0)


    const addCoach = (coach: Coach) => {
        coaches.value.push(coach)
    }

    const removeCoach = (id: number) => {
        coaches.value = coaches.value.filter(coach => coach.id !== id)
    }

    const getCoachById = (id: number) => {
        return computed(() => coaches.value.find(coach => coach.id === id))
    }

    const setCoaches = (newCoaches: Coach[]) => {
        coaches.value = newCoaches
    }

    const getDisplayString = (coach: Coach) => {
        return `${coach.name} ${coach.email}`

    }


    return {
        coaches,
        hasCoaches,
        addCoach,
        removeCoach,
        getCoachById,
        setCoaches,
    }
})
