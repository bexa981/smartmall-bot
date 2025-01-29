<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const phoneNumber = ref("");
const userName = ref("");

// Load user data
onMounted(() => {
    phoneNumber.value = localStorage.getItem("userPhone") || "";
    userName.value = localStorage.getItem("userName") || "";
});

const saveChanges = () => {
    localStorage.setItem("userName", userName.value);
    alert("Ma'lumotlar saqlandi!"); // Replace with a better notification system if needed
};

const goBack = () => {
    router.push('/'); // Navigate back to Home
};
</script>

<template>
    <div class="p-6">
        <!-- Back Button -->
        <button @click="goBack" class="p-2 text-gray-700 flex items-center">
            <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <!-- Title -->
        <h2 class="text-center text-lg font-semibold mb-6">Shaxsiy ma'lumotlarim</h2>

        <!-- Phone Number (Read-only) -->
        <div class="mb-4">
            <input 
                type="text" 
                v-model="phoneNumber" 
                disabled 
                class="w-full bg-gray-100 text-gray-500 px-4 py-3 rounded-lg focus:outline-none"
            />
        </div>

        <!-- User Name (Editable) -->
        <div class="mb-4">
            <input 
                type="text" 
                v-model="userName" 
                class="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
        </div>

        <!-- Save Button -->
        <button @click="saveChanges" class="w-full bg-green-800 text-white py-3 rounded-lg shadow-md hover:bg-indigo-700 transition">
            O'zgarishlarni saqlash
        </button>
    </div>
</template>

<style scoped>
/* Smooth hover effect for Save button */
button:hover {
    transition: all 0.3s ease-in-out;
}
</style>