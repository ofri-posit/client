<template>
    <div>
        <div class="basic-info">
            <div class="w-full lg:w-[20%] basic-info-card">
                <div class="basic-info-card-header">
                    Members Count
                </div>
                <div class="basic-info-card-body text-center">
                    6
                </div>
            </div>
            <div class="w-full lg:w-[20%] basic-info-card">
                <div class="basic-info-card-header">
                    Last workout
                </div>
                <div class="basic-info-card-body text-center">
                    2021-10-10
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Coach } from '@/types/Coach';


const props = defineProps({
    coach: Coach
});
</script>

<style scoped></style>