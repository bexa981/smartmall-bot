<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const notifications = ref([]); // Empty notifications array
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <button @click="router.push('/')" class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold text-center flex-1">Bildirishmalar</h2>
            <div class="w-10"></div> <!-- Placeholder for centering -->
        </div>

        <!-- Notifications List -->
        <div v-if="notifications.length > 0" class="mt-6 space-y-4">
            <div v-for="(notification, index) in notifications" :key="index"
                class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                <p class="text-gray-800 font-medium">{{ notification.title }}</p>
                <p class="text-gray-600 text-sm">{{ notification.message }}</p>
            </div>
        </div>

        <!-- No Notifications Message -->
        <div v-else class="mt-20 flex flex-col items-center">
            <img src="https://static.vecteezy.com/system/resources/previews/047/468/654/non_2x/no-notifications-empty-state-illustration-free-vector.jpg" alt="No Notifications" class="w-40 h-40">
            <p class="text-gray-500 mt-4 text-center">Sizda hech qanday bildirishnoma yo‘q</p>
        </div>
    </div>
</template>

<style scoped>
/* Styling for smooth UI */
</style>
