<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon } from '@heroicons/vue/24/solid';

const { t, locale } = useI18n();
const router = useRouter();
const selectedLanguage = ref(localStorage.getItem('language') || 'uz');

// Apply saved language on mount
onMounted(() => {
    locale.value = selectedLanguage.value;
});

// Change language selection
const changeLanguage = (lang) => {
    selectedLanguage.value = lang;
};

// Confirm and save language
const confirmLanguage = () => {
    locale.value = selectedLanguage.value;
    localStorage.setItem('language', selectedLanguage.value);
    router.push('/'); // Redirect to home after confirmation
};
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <button @click="router.push('/')" class="p-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold flex-1 text-center">{{ t('language.title') }}</h2>
            <div class="w-10"></div> <!-- Placeholder for centering -->
        </div>

        <!-- Language Selection -->
        <div class="mt-6 space-y-3">
            <div v-for="lang in ['ru', 'uz']" :key="lang" @click="changeLanguage(lang)"
                class="flex items-center justify-between cursor-pointer p-3 border-b border-gray-200">
                <span class="text-gray-700">{{ t(`language.${lang}`) }}</span>
                <div class="w-5 h-5 flex items-center justify-center border rounded-full"
                    :class="{ 'border-green-600': selectedLanguage === lang }">
                    <div v-if="selectedLanguage === lang" class="w-3 h-3 bg-green-600 rounded-full"></div>
                </div>
            </div>
        </div>

        <!-- Confirm Button -->
        <button @click="confirmLanguage" class="mt-8 w-full bg-indigo-600 text-white py-3 rounded-lg text-center">
            {{ t('language.confirm') }}
        </button>
    </div>
</template>

<style scoped>
/* No extra styles needed, Tailwind handles everything */
</style>
