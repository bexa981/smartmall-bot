<script setup>
import { ref } from 'vue';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid';
import {  ChevronLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';

const isSupportOpen = ref(false);
const showAlert = ref(false);
const toggleSupport = () => {
    isSupportOpen.value = !isSupportOpen.value;
};
const submitSupportRequest = () => {
    showAlert.value = true;
    setTimeout(() => {
        showAlert.value = false;
        isSupportOpen.value = false; // Close modal after showing alert
    }, 3000); // Hide alert after 3 seconds
};
</script>

<template>
    <div class="relative">
        <!-- Clickable Support Button -->
        <button @click="toggleSupport"
            class="bg-gray-200 p-2 rounded-full  shadow-md hover:bg-gray-300 transition  bottom-6 right-6">
            <ChatBubbleBottomCenterTextIcon class="w-6 h-6 text-green-800 " />
        </button>
  <!-- Background Overlay (Doesn't slide, stays fixed) -->
  <div v-if="isSupportOpen" class="fixed inset-0 bg-black/50 z-10" @click="toggleSupport"></div>
        <!-- Full-Width Bottom Support Modal -->
        <transition name="slide-up">
            <div v-if="isSupportOpen"
                class="fixed z-20 bottom-0 left-0 w-full bg-white p-5 rounded-t-[5vw] shadow-lg h-2/5">
                <div class="flex justify-between items-center mb-4">
                    <button @click="toggleSupport"
                        class="text-black-800 flex justify-center items-center cursor-pointer p-2 rounded hover:text-gray-900 hover:bg-black/10">
                        <ChevronLeftIcon class="w-4" /> Orqaga
                    </button>
                </div>

                <h2 class="text-lg font-semibold mb-4 text-center">Bizning xizmat ko'rsatish bo'limizga murojat qilish</h2>
                <p class="text-center">Telefon raqamingizni kiriting</p>

                <div class="mt-4 p-3 border rounded-lg flex items-center mx-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg"
                        alt="Uzbekistan Flag" class="w-6 h-4 mr-2" />
                    <input type="text" placeholder="+998" class="w-full focus:outline-none" />
                </div>

                <p class="text-xs text-gray-500 mt-2 text-center mx-4">Davom etish tugmasini bosish orqali siz bizning <a href="#"
                        class="text-blue-500">Foydalanish qoidalarimizni</a> ni qabul qilasiz. .</p>

                <button  @click="submitSupportRequest" class="mt-4 w-full bg-green-800 cursor-pointer text-white py-3 rounded-lg text-center">Davom
                    etish</button>
            </div>
        </transition>

        <transition name="fade">
            <div v-if="showAlert"
                class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-3 rounded-lg flex items-center gap-3 border border-gray-300 z-30">
                <CheckCircleIcon class="w-10 h-10 text-green-500" />
                <span class="text-gray-700">Tabriklaymiz muvaffaqqiyatli tizimga kirdingiz!</span>
                <button @click="showAlert = false" class="text-gray-400 hover:text-gray-600">
                    <XMarkIcon class="w-5 h-5" />
                </button>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-up-enter-from, .slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

/* Alert fade animation */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
