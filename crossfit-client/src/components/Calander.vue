<template>
    <div class="cal-container">
        <div class="wrapper">
            <header>
                <p class="currentDate">{{ currentDisplayDate }}</p>
                <div class="icons">
                    <span @click="setMonth(-1)" class="material-symbols-rounded">&lt;</span>
                    <span @click="setMonth(1)" class="material-symbols-rounded">&gt;</span>
                </div>
            </header>
            <div class="calander">
                <ul class="weeks">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul class="days">
                    <li @click="dateSelected(day)" @contextmenu.prevent="showContextMenu($event, day)"
                        v-for="day in days" :key="day.id" :class="{ 'other-month': day.isOtherMonth }">
                        {{ day.date }}
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="contextMenuVisible"
            :style="{ top: `${contextMenuPosition.y}px`, left: `${contextMenuPosition.x}px` }" class="context-menu">
            <ul>
                <li @click="contextMenuAction('action1')">Action 1</li>
                <li @click="contextMenuAction('action2')">Action 2</li>
                <li @click="contextMenuAction('action3')">Action 3</li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.wrapper {
    background: white;
    border-radius: 10px;
    padding: 15px;
}

.wrapper header {
    display: flex;
    justify-content: space-between;
}

.wrapper header .icons {
    display: flex;
    align-items: center;
    justify-content: center;
}

.wrapper header .currentDate {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 500;
    margin-left: 30px;
}

.wrapper header .icons span {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 800;
    width: 35px;
}

.wrapper header .icons span:hover {
    cursor: pointer;
    background: #aaa;
}

.calander {
    padding: 20px;
}

.calander ul {
    display: flex;
    flex-wrap: wrap;
}

.calander ul li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: calc(100% / 7);
}

.calander .days li {
    cursor: pointer;
    margin-top: 25px;
    border-radius: 15%;
}

.calander .days li:hover {
    background-color: #bbbbbb42;
}

.calander .weeks {
    font-weight: 600;
}

.other-month {
    color: #ccc;
}

.context-menu {
    position: absolute;
    background-color: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

.context-menu ul {
    list-style: none;
    padding: 10px 0;
    margin: 0;
}

.context-menu ul li {
    padding: 8px 15px;
    cursor: pointer;
}

.context-menu ul li:hover {
    background-color: #f0f0f0;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const emit = defineEmits(['dateSelected']);

const currentDate = ref(new Date());
const currentDisplayDate = ref("");
const days = ref<Array<{ id: number, date: number | string, isOtherMonth: boolean }>>([]);
const contextMenuVisible = ref(false);
const contextMenuPosition = ref({ x: 0, y: 0 });
const selectedDay = ref<{ id: number, date: number | string, isOtherMonth: boolean } | null>(null);

const setCurrentDisplayDate = () => {
    // Get month in string
    let month = currentDate.value.toLocaleString('default', { month: 'long' });
    // Get year
    let year = currentDate.value.getFullYear();
    currentDisplayDate.value = `${month} ${year}`;
};

const setDays = () => {
    const firstDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth() + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDay = firstDayOfMonth.getDay();

    days.value = [];

    // Fill in the days from the previous month
    const prevLastDay = new Date(currentDate.value.getFullYear(), currentDate.value.getMonth(), 0).getDate();
    for (let i = startDay - 1; i >= 0; i--) {
        days.value.push({ id: -(startDay - i), date: prevLastDay - i, isOtherMonth: true });
    }

    // Fill in the days of the current month
    for (let i = 1; i <= daysInMonth; i++) {
        days.value.push({ id: i, date: i, isOtherMonth: false });
    }

    // Fill in the days from the next month
    const remainingSlots = 35 - days.value.length; // 42 slots for 6 weeks 7 days each
    for (let i = 1; i <= remainingSlots; i++) {
        days.value.push({ id: daysInMonth + i, date: i, isOtherMonth: true });
    }
};

const setMonth = (monthToAdd: number) => {
    currentDate.value.setMonth(currentDate.value.getMonth() + monthToAdd);
    setCurrentDisplayDate();
    setDays();


};

const dateSelected = (day: { id: number, date: number | string, isOtherMonth: boolean }) => {
    if (day.isOtherMonth) {
        setMonth(day.date > "15" ? -1 : 1);
        return;
    }

    const selectedDate = {
        year: currentDate.value.getFullYear(),
        month: currentDate.value.getMonth(),
        day: day.date
    };

    emit('dateSelected', selectedDate);
};

const showContextMenu = (event: MouseEvent, day: { id: number, date: number | string, isOtherMonth: boolean }) => {
    selectedDay.value = day;
    contextMenuPosition.value = { x: event.clientX, y: event.clientY };
    contextMenuVisible.value = true;
    event.preventDefault();
};

const contextMenuAction = (action: string) => {
    if (selectedDay.value) {
        console.log(`Action ${action} on ${selectedDay.value.date}`);
    }
    contextMenuVisible.value = false;
};

document.addEventListener('click', () => {
    contextMenuVisible.value = false;
});

onMounted(() => {
    setCurrentDisplayDate();
    setDays();
});
</script>