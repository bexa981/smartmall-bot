<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import {
    ChevronLeftIcon,
    PhoneIcon,
    PaperAirplaneIcon,
    PaperClipIcon
} from '@heroicons/vue/24/solid';

const router = useRouter();
const messages = ref([]);
const newMessage = ref("");

// Load previous messages (simulating chat persistence)
onMounted(() => {
    const storedMessages = JSON.parse(localStorage.getItem("supportMessages")) || [];
    messages.value = storedMessages;
});

// Send message function
const sendMessage = () => {
    if (newMessage.value.trim() !== "") {
        const messageData = {
            text: newMessage.value,
            time: new Date().toLocaleTimeString(),
            sender: "user"
        };
        
        messages.value.push(messageData);
        newMessage.value = "";

        // Save messages to local storage (simulate real chat)
        localStorage.setItem("supportMessages", JSON.stringify(messages.value));
    }
};
</script>

<template>
    <div class="flex mainmsg flex-col h-[100vh]  bg-white">
        <!-- Header -->
        <div class="flex bg-white justify-between items-center p-3 border-b-1 border-gray-100 shadow-md">
            <button @click="router.push('/')" class="text-gray-700">
                <ChevronLeftIcon class="w-6 h-6" />
            </button>
            <div class="text-center">
                <h2 class="text-lg font-semibold">Qo‘llab quvvatlash xizmati</h2>
                <p class="text-green-600 text-sm">Online</p>
            </div>
            <button class="text-gray-700">
                <PhoneIcon class="w-6 h-6" />
            </button>
        </div>

        <!-- Chat Messages -->
        <div class="flex-1 overflow-y-auto p-4 space-y-4">
            <div v-for="(message, index) in messages" :key="index" class="flex justify-end">
                <div class=" text-black-900 bg-green-50 rounded-lg p-3 max-w-xs">
                    <p class="text-sm">{{ message.text }}</p>
                    <p class="text-xs text-right mt-1 text-gray-500">{{ message.time }}</p>
                </div>
            </div>
        </div>

        <!-- Message Input -->
        <div class="p-4 fixed bottom-0 w-[100%] mssg flex items-center bg-white shadow-md">
            <button class="p-2">
                <PaperClipIcon class="w-6 h-6 text-gray-500" />
            </button>
            <input v-model="newMessage" type="text" placeholder="Xabar..."
                class="flex-1 p-3 border-none bg-gray-200 rounded-full focus:outline-none  " />
            <button @click="sendMessage" class="p-3 bg-green-800 text-white rounded-full ml-2">
                <PaperAirplaneIcon class="w-6 h-6 " />
            </button>
        </div>
    </div>
</template>

<style scoped>
/* Chat scroll */
.mssg{
    border-top: 1px solid rgb(218, 215, 215);
}
.mainmsg{
    background-image: url(https://i.pinimg.com/736x/bc/da/1d/bcda1d0c891d235fbf680a893265d68f.jpg);
    background-position: center;
    background-size: cover;
}
.overflow-y-auto {
    max-height: calc(100vh - 200px);
}
</style>
