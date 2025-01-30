<script setup>
import { ref,onMounted } from 'vue';
import { Squares2X2Icon } from '@heroicons/vue/24/outline';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this is correctly set up
import CategoryIcon from '../assets/icons/category.png';

import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();
const { t } = useI18n(); // i18n Hook for translations
const isOpen = ref(false);
const categories = ref([]);

const fetchCategories = async () => {
    try {
        console.log("Fetching categories...");
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        categories.value = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,  // Use ID as the category name
            image: doc.data().image || CategoryIcon // Default image if missing
        }));
        console.log("✅ Categories Fetched:", categories.value);
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};


const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Navigate to Category Detail Page
const goToCategoryDetail = (categoryId) => {
    router.push({
        name: 'CategoryDetail',
        query: { category: categoryId }
    });
};

onMounted(() => {
    fetchCategories();
});
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
          <div v-for="category in categories" :key="category.id" @click="goToCategoryDetail(category.id)" class="flex flex-col items-center cursor-pointer">
            <img :src="category.image" class="w-30 h-30 object-cover" />
            <p class="text-center text-sm mt-1 font-semibold">{{ category.id }}</p>
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

