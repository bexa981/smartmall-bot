<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import MenuCategory from '../components/MenuCategory.vue';
import TotalPrice from '../components/TotalPrice.vue';

import { ChevronLeftIcon, HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';

const route = useRoute();
const router = useRouter();
const categoryName = route.query.category || "No Category Selected";

// Local storage for liked products
const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});

// Toggle like function
const toggleLike = (product) => {
    if (likedProducts.value[product.name]) {
        delete likedProducts.value[product.name]; // Remove from liked
    } else {
        likedProducts.value[product.name] = product; // Add to liked
    }
    localStorage.setItem('likedProducts', JSON.stringify(likedProducts.value));
};

// Local product data
const products = {
    "Вытяжки": [
        { name: "Кухонная вытяжка Artel-1160", price: 20, image: "https://via.placeholder.com/150" },
        { name: "Вытяжка Bosch", price: 23, image: "https://via.placeholder.com/150" }
    ],
    "Микроволновки": [
        { name: "Микроволновка Samsung", price: "2,500,000", image: "https://via.placeholder.com/150" },
        { name: "Микроволновка LG", price: "3,200,000", image: "https://via.placeholder.com/150" }
    ]
};

const selectedProducts = ref(products[categoryName] || []);

// Go back function
const goBack = () => {
    router.push('/');
};
</script>

<template>
    <div class="p-4 pb-24 relative">
        <!-- Back Button -->
        <button @click="goBack" class="absolute top-0 left-0 p-2 text-gray-700">
            <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <!-- Category Title -->
        <h2 class="text-lg font-bold text-center">{{ categoryName }}</h2>

        <!-- Product Grid -->
        <div class="mt-6 grid grid-cols-2 gap-3">
            <div v-for="product in selectedProducts" :key="product.name"
                class="bg-white p-3 rounded-lg shadow-md cursor-pointer"
                @click="router.push({ name: 'ProductDetail', query: { name: product.name, price: product.price, image: product.image } })">
                
                <div class="relative">
                    <img :src="product.image" class="w-full h-40 object-cover rounded-lg" />
                    
                    <!-- Like Button -->
                    <button @click.stop="toggleLike(product)"
                        class="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <SolidHeartIcon v-if="likedProducts[product.name]" class="w-6 h-6 text-red-600" />
                        <OutlineHeartIcon v-else class="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <h3 class="text-sm font-semibold mt-2 truncate-2-lines">{{ product.name }}</h3>
                <p class="text-md font-semibold text-green-800">{{ product.price }} $</p>
            </div>
        </div>

        <!-- Floating Category Menu Button -->
        <MenuCategory />
        <TotalPrice />
    </div>
</template>

<style scoped>
/* Ensure bottom buttons are fixed at the bottom of the screen */
.fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: white;
    padding: 1rem;
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.grid-cols-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .5rem;
}

/* Truncate product names to max 2 lines */
.truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
    white-space: normal;
}
</style>
