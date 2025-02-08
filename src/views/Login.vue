<script setup>
import { ref, watch, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { CheckCircleIcon } from '@heroicons/vue/24/solid';

const phoneNumber = ref("+998");
const showAlert = ref(false);
const inputRef = ref(null);
const containerRef = ref(null);

const emit = defineEmits(["login-success"]);

const formatPhoneNumber = () => {
    if (!phoneNumber.value.startsWith("+998")) {
        phoneNumber.value = "+998";
    }
};

const savePhoneNumber = () => {
    if (phoneNumber.value.length >= 13) { // Ensure at least 9 digits after +998
        localStorage.setItem("userPhone", phoneNumber.value);
        showAlert.value = true;

        setTimeout(() => {
            showAlert.value = false;
            emit("login-success"); // Notify App.vue that login is complete
        }, 1500);
    }
};

// **iOS Fix: Input bosilganda ekranni yuqoriga ko‘tarish**
const adjustForKeyboard = () => {
    if (window.visualViewport) {
        const viewportHeight = window.visualViewport.height;
        containerRef.value.style.height = `${viewportHeight}px`;
        nextTick(() => {
            inputRef.value?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
    }
};

// **Klaviatura yopilganda ekranni tiklash**
const resetView = () => {
    containerRef.value.style.height = "100vh";
};

onMounted(() => {
    if (window.visualViewport) {
        window.visualViewport.addEventListener("resize", adjustForKeyboard);
    }
});

onBeforeUnmount(() => {
    if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", adjustForKeyboard);
    }
});

watch(phoneNumber, formatPhoneNumber);
</script>

<template>
    <div ref="containerRef" class="fixed mainPhone inset-0 bg-black/20 flex justify-center items-end">
        <transition name="slide-up">
            <div class="w-full bg-white p-6 rounded-t-3xl shadow-lg">
                <h2 class="text-xl font-semibold text-center">Telefon raqamingizni kiriting</h2>

                <!-- Phone Input -->
                <div class="flex items-center border border-gray-200 bg-gray-100 p-3 rounded-lg mt-4">
                    <img src="https://www.svgrepo.com/show/405649/flag-for-flag-uzbekistan.svg" 
                         alt="Uzbekistan Flag" class="w-7 h-7 mr-2" />
                    <input type="number" v-model="phoneNumber" 
                           ref="inputRef"
                           @focus="adjustForKeyboard"
                           @blur="resetView"
                           placeholder="+998" 
                           class="w-full outline-none" />
                </div>
                <p class="text-center text-gray-500 text-sm mt-2">
                    Davom etish tugmasini bosish orqali siz bizning 
                    <a href="#" class="text-blue-500">Foydalanish qoidalarimizni</a> qabul qilasiz.
                </p>

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
