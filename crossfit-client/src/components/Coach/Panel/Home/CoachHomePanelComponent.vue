<template>
    <div>
        <div class="basic-info flex-wrap">
            <div class="w-full lg:w-[20%] basic-info-card">
                <div class="basic-info-card-header">
                    Members Count
                </div>
                <div class="basic-info-card-body text-center">
                    {{ memberStore.members.length }}
                </div>
            </div>
            <!-- <div class="w-full lg:w-[20%] basic-info-card">
                <div class="basic-info-card-header">
                    Last workout
                </div>
                <div class="basic-info-card-body text-center">
                    2021-10-10
                </div>
            </div> -->
        </div>
    </div>
</template>

<script setup lang="ts">
import { Coach } from '@/types/Coach';
import { useMemberStore } from "@/stores/memberStore";

const memberStore = useMemberStore();

const props = defineProps({
    coach: Coach
});
</script>

<style scoped></style>