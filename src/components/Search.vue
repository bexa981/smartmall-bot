<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { MagnifyingGlassIcon } from '@heroicons/vue/24/solid';

const { t } = useI18n();
const searchQuery = ref('');
const router = useRouter();

// Navigate to SearchDetail.vue when clicking the search bar
const goToSearchDetail = () => {
    router.push({ name: 'SearchDetail' });
};
</script>

<template>
  <div class="relative w-full max-w-md mx-auto mt-4">
    <!-- Search Input (Clickable) -->
    <div @click="goToSearchDetail" 
         class="cursor-pointer w-full bg-gray-100 rounded-lg pl-10 pr-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
      {{ searchQuery || t('search.placeholder') }}
    </div>

    <!-- Search Icon -->
    <MagnifyingGlassIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
  </div>
</template>

<style scoped>
</style>
