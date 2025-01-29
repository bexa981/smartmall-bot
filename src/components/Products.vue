<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';
import ProductIcon from '../assets/icons/box.png';
const router = useRouter();
const categories = ref([
    { name: "Вытяжки", image: "https://via.placeholder.com/100" },
    { name: "Duxovkalar", image: "https://via.placeholder.com/100" },
    { name: "Микроволновки", image: "https://via.placeholder.com/100" },
    { name: "Konditsionerlar", image: "https://via.placeholder.com/100" }
]);

const products = ref([
    { name: "Кухонная вытяжка Artel-1160", price: 4, image: ProductIcon, category: "Вытяжки" },
    { name: "Кухонная вытяжка Bosch", price: 15, image: ProductIcon, category: "Вытяжки" },
    { name: "Кухонная вытяжка Samsung", price: 2, image: ProductIcon, category: "Вытяжки" },
    
    { name: "Микроволновка Samsung", price: 23, image: ProductIcon, category: "Микроволновки" },
    { name: "Микроволновка LG", price: 15, image: ProductIcon, category: "Микроволновки" },

    { name: "Духовка Bosch", price: 17, image: ProductIcon, category: "Duxovkalar" },
    { name: "Духовка Samsung", price: 17, image: ProductIcon, category: "Duxovkalar" },

    { name: "Кондиционер LG", price: 23, image: ProductIcon, category: "Konditsionerlar" },
    { name: "Кондиционер Samsung", price: 5, image: ProductIcon, category: "Konditsionerlar" }
]);

// Get liked products from localStorage
const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});

// Watch likedProducts and update localStorage whenever it changes
watch(likedProducts, (newVal) => {
    localStorage.setItem('likedProducts', JSON.stringify(newVal));
}, { deep: true });

// Toggle like function
const toggleLike = (product) => {
    if (likedProducts.value[product.name]) {
        delete likedProducts.value[product.name]; // Remove from liked
    } else {
        likedProducts.value[product.name] = product; // Add to liked
    }
};

// Navigate to Product Detail Page
const goToProductDetail = (product) => {
    router.push({
        name: 'ProductDetail',
        query: {
            name: product.name,
            price: product.price,
            image: product.image
        }
    });
};
</script>

<template>
    <div class="p-4 mb-30">
        <div v-for="category in categories" :key="category.name">
            <h2 class="text-lg font-bold mb-2">{{ category.name }}</h2>

            <!-- Scrollable product list for each category -->
            <div class="overflow-x-auto whitespace-nowrap flex space-x-4 scrollbar-hide py-2">
                <div v-for="product in products.filter(p => p.category === category.name)" :key="product.name"
                    class="bg-white p-2 rounded-lg shadow-md flex flex-col items-center min-w-[180px] snap-center cursor-pointer"
                    @click="goToProductDetail(product)">

                    <div class="relative">
                        <img :src="product.image" alt="Product Image" class="w-40 h-40 object-cover rounded-lg" />
                        <button @click.stop="toggleLike(product)"
                            class="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                            <SolidHeartIcon v-if="likedProducts[product.name]" class="w-6 h-6 text-red-600" />
                            <OutlineHeartIcon v-else class="w-6 h-6 text-gray-500" />
                        </button>
                    </div>
                    <h3 class="text-sm font-semibold mt-2 text-center truncate-2-lines">{{ product.name }}</h3>
                    <p class="text-md mt-2 font-normal text-green-800 text-center">{{ product.price }} $</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Hide scrollbar for better UI */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Enable smooth scrolling */
.overflow-x-auto {
    scroll-behavior: smooth;
}

/* Fix text truncation for product names */
.truncate-2-lines {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
    max-width: 100%;
}
</style>
