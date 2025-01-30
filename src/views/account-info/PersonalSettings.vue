<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const { t } = useI18n();

const phoneNumber = ref("");
const userName = ref("");

// **🔹 Load user data when the page is opened**
onMounted(() => {
    phoneNumber.value = localStorage.getItem("userPhone") || "";
    userName.value = localStorage.getItem("userName") || "";

    // **Retrieve user's Telegram info if they are entering via Telegram WebApp**
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.initDataUnsafe.user) {
        const tgUser = window.Telegram.WebApp.initDataUnsafe.user;
        if (tgUser.first_name) {
            userName.value = tgUser.first_name;
            localStorage.setItem("userName", tgUser.first_name);
        }
    }
});

// **🔹 Save changes locally**
const saveChanges = () => {
    localStorage.setItem("userName", userName.value);
    alert(t("profile.savedMessage")); // **Use i18n for notifications**
};

// **🔹 Go back to home**
const goBack = () => {
    router.push('/');
};
</script>

<template>
    <div class="p-3">
        <!-- **🔹 Header with Back Button** -->
        <div class="flex items-center mb-6">
            <button @click="goBack" class="p-2 cursor-pointer bg-gray-100 border border-gray-300 rounded text-gray-700 flex items-center">
                <ChevronLeftIcon class="w-6 h-6" />
            </button>
            <h2 class="text-center text-lg font-semibold absolute left-[30%]">{{ t('profile.title') }}</h2>
        </div>

        <!-- **🔹 Phone Number (Read-only)** -->
        <div class="mb-4">
            <input type="text" v-model="phoneNumber" disabled
                class="w-full bg-gray-100 text-gray-500 px-4 py-3 rounded-lg focus:outline-none" />
        </div>

        <!-- **🔹 User Name (Editable)** -->
        <div class="mb-4">
            <input type="text" v-model="userName" :placeholder="t('profile.enterName')"
                class="w-full bg-gray-100 px-4 py-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-300" />
        </div>

        <!-- **🔹 Save Button** -->
        <button @click="saveChanges"
            class="w-full bg-green-800 text-white py-3 rounded-lg shadow-md transition">
            {{ t('profile.saveChanges') }}
        </button>
    </div>
</template>

<style scoped>
/* Smooth hover effect for Save button */
button:hover {
    transition: all 0.3s ease-in-out;
}
</style>
