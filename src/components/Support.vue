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
            class=" sup-main bottom-6 right-6 bg-white-100 p-1.5 rounded-full shadow-md hover:bg-gray-100 transition">
            <ChatBubbleBottomCenterTextIcon class="w-7 h-7 text-green-800" />
        </button>
    </div>
</template>

<style scoped>
.sup-main{
    background-color: white;
}
</style>