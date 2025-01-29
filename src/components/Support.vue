<script setup>
import { useRouter } from 'vue-router';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';

const router = useRouter();

// Navigate to the Support Chat page
const openSupportChat = () => {
    router.push('/support-chat'); // Redirects to Support Chat page
};
</script>

<template>
    <div class="relative">
        <!-- Clickable Support Button -->
        <button @click="openSupportChat"
            class=" bottom-6 right-6 bg-gray-200 p-3 rounded-full shadow-md hover:bg-gray-300 transition">
            <ChatBubbleBottomCenterTextIcon class="w-6 h-6 text-green-800" />
        </button>
    </div>
</template>

<style scoped></style>