<script setup>
import { ref } from 'vue';
import { CheckCircleIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';

const phoneNumber = ref("");
const showAlert = ref(false);

const emit = defineEmits(["login-success"]);

const savePhoneNumber = () => {
    if (phoneNumber.value.trim().length >= 9) {
        localStorage.setItem("userPhone", phoneNumber.value);
        showAlert.value = true;

        setTimeout(() => {
            showAlert.value = false;
            emit("login-success"); // Notify App.vue that login is complete
        }, 1500);
    }
};
</script>

<template>
    <div class="fixed mainPhone inset-0 bg-black/20 flex justify-center items-end">
        <transition name="slide-up">
            <div class="w-full bg-white p-6 rounded-t-3xl shadow-lg">
                <!-- Title -->
                <h2 class="text-xl font-semibold text-center">Telefon raqamingizni kiriting</h2>
                <p class="text-center text-gray-500 text-sm mt-2">
                    Davom etish tugmasini bosish orqali siz bizning 
                    <a href="#" class="text-blue-500">Foydalanish qoidalarimizni</a> qabul qilasiz.
                </p>

                <!-- Phone Input -->
                <div class="flex items-center border p-3 rounded-lg mt-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Flag_of_Uzbekistan.svg" 
                         alt="Uzbekistan Flag" class="w-6 h-4 mr-2" />
                    <input type="text" v-model="phoneNumber" placeholder="+998" 
                           class="w-full outline-none" />
                </div>

                <!-- Submit Button -->
                <button @click="savePhoneNumber" 
                        class="mt-4 w-full bg-green-700 text-white py-3 rounded-lg text-center">
                    Davom etish
                </button>

                <!-- Success Alert -->
                <transition name="fade">
                    <div v-if="showAlert" 
                        class="fixed top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-3 rounded-lg flex items-center gap-2 border border-gray-300">
                        <CheckCircleIcon class="w-6 h-6 text-green-500" />
                        <span class="text-gray-700">Tabriklaymiz! Muvaffaqiyatli tizimga kirdingiz!</span>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>

<style scoped>
/* Slide-Up Animation */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.4s ease-in-out, opacity 0.4s ease-in-out;
}
.slide-up-enter-from {
    transform: translateY(100%);
    opacity: 0;
}
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}

/* Fade Animation */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
.mainPhone{
    background-image: url(https://thumbs.dreamstime.com/b/online-shopping-11763626.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;

}
</style>
