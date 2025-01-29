<script setup>
import { ref } from 'vue';
import { Squares2X2Icon } from '@heroicons/vue/24/outline';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // i18n Hook for translations
const isOpen = ref(false);
const router = useRouter();

const categories = [
  { name: "Вытяжки", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Duxovkalar", image: "https://img.freepik.com/free-vector/realistic-vector-icon-illustration-modern-oven-multi-function-gas-stove-with-blue-fire-burner_134830-2432.jpg?ga=GA1.1.1167977278.1725462868&semt=ais_hybrid" },
  { name: "Микроволновка", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Konditsionerlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Muzlatgichlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "MOBIL TELEFONLAR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "TV - TILVIZOR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Muzlatgichlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "MOBIL TELEFONLAR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "TV - TILVIZOR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Muzlatgichlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "MOBIL TELEFONLAR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "TV - TILVIZOR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Muzlatgichlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "MOBIL TELEFONLAR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "TV - TILVIZOR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "Muzlatgichlar", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "MOBIL TELEFONLAR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
  { name: "TV - TILVIZOR", image: "https://img.freepik.com/free-vector/microwave-oven-with-light-inside-isolated-white-background-kitchen-appliances_134830-658.jpg" },
];

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Navigate to Category Detail Page
const goToCategoryDetail = (category) => {
  isOpen.value = false; // Close menu after clicking
  router.push({ name: 'CategoryDetail', query: { category: category.name } });
};
</script>

<template>
  <div>
    <!-- Background Overlay -->
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 bg-opacity-50 transition-opacity " @click="toggleMenu"></div>

    <!-- Floating Button -->
    <button @click="toggleMenu" class="fixed bottom-30 right-5 bg-green-800 p-3 rounded-full shadow-lg  transition ">
      <Squares2X2Icon class="w-8 h-8 text-white" />
    </button>

    <!-- Category Menu -->
    <transition name="slide-up">
      <div v-if="isOpen" class="fixed bottom-0 left-0 w-full bg-white shadow-lg p-5  z-20 rounded-t-[5vw]">
        <div class="flex justify-between items-center">
          <h2 class="text-lg font-bold text-green-800">{{ t('search.categories') }}</h2>
          <button @click="toggleMenu" class="text-gray-500 hover:text-gray-700 text-lg font-bold">✖</button>
        </div>

        <div class="grid grid-cols-3 gap-4 mt-4 max-h-[50vh] overflow-y-auto">
          <div v-for="category in categories" :key="category.name" @click="goToCategoryDetail(category)" class="flex flex-col items-center cursor-pointer">
            <img :src="category.image" class="w-30 h-30 object-cover" />
            <p class="text-center text-sm mt-1 font-semibold">{{ category.name }}</p>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
/* Slide-up transition */
.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}
.slide-up-enter-from, .slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
.overflow-y-auto::-webkit-scrollbar {
  width: 5px;
}
.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 5px;
}
</style>

