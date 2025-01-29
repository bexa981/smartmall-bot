<script setup>
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { ChevronLeftIcon, DevicePhoneMobileIcon } from "@heroicons/vue/24/outline";

const { t } = useI18n();
const router = useRouter();

const daysOfWeek = [
    { key: "monday", hours: "09:00 - 23:00" },
    { key: "tuesday", hours: "09:00 - 23:00" },
    { key: "wednesday", hours: "09:00 - 23:00" },
    { key: "thursday", hours: "09:00 - 23:00" },
    { key: "friday", hours: "09:00 - 23:00" },
    { key: "saturday", hours: "09:00 - 23:00" },
    { key: "sunday", hours: "09:00 - 23:00" },
];

// Adjust for correct weekday index (0 = Sunday)
const todayIndex = new Date().getDay();
const today = computed(() => (todayIndex === 0 ? 6 : todayIndex - 1));

const goBack = () => {
    router.push("/");
};
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center mb-1 justify-between">
            <button @click="goBack" class="p-2 cursor-pointer bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg  font-bold text-center flex-grow">
                {{ t("aboutUs.title") }}
            </h2>
        </div>
        <img src="/src/assets/smartmallLogoHd.svg" class="mt-10 rounded"  alt="">
        <p class="mt-10 text-center font-bold text-green-800">Smartmall</p>
        <p class="text-center text-gray-500 mt-2">{{ t("aboutUs.subtitle") }}</p>

        <!-- Working Hours -->
        <div class="mt-6">
            <h3 class="font-semibold text-lg">{{ t("aboutUs.workingHours") }}</h3>
            <div v-for="(day, index) in daysOfWeek" :key="index" :class="{ 'text-green-700 font-bold': index === today }"
                class="flex justify-between py-2">
                <span>{{ t(`aboutUs.days.${day.key}`) }}</span>
                <span>{{ day.hours }}</span>
            </div>
        </div>

        <!-- Branches -->
        <div class="mt-6">
            <h3 class="font-semibold text-lg">{{ t("aboutUs.branches") }}</h3>
            <div class="mt-2 bg-gray-100 p-3 rounded-lg">
                <p class="text-blue-600 font-semibold">
                    {{ t("aboutUs.branchAddress") }}
                </p>
                <p class="text-gray-600">
                    {{ t("aboutUs.branchLocation") }}
                </p>
            </div>
        </div>

        <!-- Contact Info -->
        <div class="mt-6">
            <h3 class="font-semibold text-lg">{{ t("aboutUs.contact") }}</h3>

            <a href="tell:+998978100404" class="flex items-center">
                <DevicePhoneMobileIcon class="w-8 text-gray-500" />
                <p class="text-green-800">{{ t("aboutUs.phone") }}</p>
            </a>
        </div>

        <!-- Social Media -->
        <div class="mt-6">
            <h3 class="font-semibold text-lg">{{ t("aboutUs.socialMedia") }}</h3>
            <p class="text-blue-500 text-lg mt-2">
                <a href="https://t.me/Smartmall070">
                    <img width="30px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/2048px-Telegram_logo.svg.png"
                        alt="">
                </a>
            </p>
        </div>
    </div>
</template>

<style scoped>
.text-green-700 {
    color: #10b981;
}
</style>
