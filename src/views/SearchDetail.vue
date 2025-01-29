<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import categoryImage from '../assets/icons/category.png';
import { XMarkIcon, MagnifyingGlassIcon, ChevronLeftIcon, HeartIcon } from '@heroicons/vue/24/solid';
import { ClockIcon } from '@heroicons/vue/24/outline';
import { useI18n } from 'vue-i18n';
const router = useRouter();
const { t } = useI18n();
const searchQuery = ref('');
const searchHistory = ref([]);
const filteredProducts = ref([]);
const allProducts = ref([
    { name: "Кухонная вытяжка Artel-1160 Rapido Touch", price: 22, image: "https://via.placeholder.com/150" },
    { name: "Мини-печь Artel MD 4218 L", price: 33, image: "https://via.placeholder.com/150" },
    { name: "Микроволновая печь Artel 23 UX 97", price: 2, image: "https://via.placeholder.com/150" },
    { name: "Холодильник Artel HD 341 FN S", price: 5, image: "https://via.placeholder.com/150" }
]);

const categories = ref([
    { name: "Вытяжки", image: categoryImage, count: 1 },
    { name: "Duxovkalar", image: categoryImage, count: 1 },
    { name: "микроволновка", image: categoryImage, count: 1 },
    { name: "Konditsionerlar", image: categoryImage, count: 1 },
    { name: "Muzlatgichlar", image: categoryImage, count: 1 }
]);

const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});

// **🔹 Load search history from localStorage**
onMounted(() => {
    searchHistory.value = JSON.parse(localStorage.getItem("searchHistory")) || [];
});

// **🔹 Save search to history**
const saveSearch = () => {
    if (searchQuery.value.trim() !== "") {
        searchHistory.value.unshift(searchQuery.value);
        searchHistory.value = [...new Set(searchHistory.value)].slice(0, 5); // Keep only last 5 searches
        localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
        filterProducts();
    }
};

// **🔹 Filter products as user types**
const filterProducts = () => {
    if (searchQuery.value.trim() !== "") {
        filteredProducts.value = allProducts.value.filter(p =>
            p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    } else {
        filteredProducts.value = [];
    }
};
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
// **🔹 Clear search input and show categories & history**
const clearSearch = () => {
    searchQuery.value = "";
    filteredProducts.value = [];
};

// **🔹 Remove a single search history item**
const removeHistoryItem = (index) => {
    searchHistory.value.splice(index, 1);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
};

// **🔹 Click search history to search again**
const searchFromHistory = (query) => {
    searchQuery.value = query;
    filterProducts();
};

// **🔹 Like / Unlike Products**
const toggleLike = (product) => {
    if (likedProducts.value[product.name]) {
        delete likedProducts.value[product.name];
    } else {
        likedProducts.value[product.name] = product;
    }
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts.value));
};

// **🔹 Go back function**
const goBack = () => {
    router.push('/');
};
</script>

<template>
    <transition name="slide-right">
        <div class="p-4">
            <!-- **🔹 Search Bar** -->
            <div class="flex items-center justify-between">
                <button @click="goBack"
                    class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                    <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
                </button>
                <div
                    class="flex w-[80%] justify-between border border-gray-300 bg-gray-100 items-center rounded-lg px-3 py-2 hover:border-green-900">
                    <MagnifyingGlassIcon class="w-5 h-5 text-gray-500" />
                    <input v-model="searchQuery"  @keyup.enter="saveSearch" @input="filterProducts" type="text"
                    :placeholder="t('search.placeholder')" class="flex-1 px-2 bg-transparent focus:outline-none">
                    <button v-if="searchQuery" @click="clearSearch" class="text-gray-500 hover:text-gray-700">
                        <XMarkIcon class="w-5 h-5" />
                    </button>
                </div>
            </div>

            <!-- **🔹 Search Results** -->
            <div v-if="searchQuery.length">
                <h2 v-if="filteredProducts.length" class="text-lg font-bold text-purple-600 mt-4">
                    {{ filteredProducts.length }} {{ t('search.resultsFound') }}
                </h2>

                <div v-if="filteredProducts.length" class="mt-4 grid grid-cols-2 gap-3">
                    <div v-for="product in filteredProducts" :key="product.name"
                        class="bg-white p-3 rounded-lg shadow-md cursor-pointer"
                        @click="goToProductDetail(product)">
                        <div class="relative">
                            <img :src="product.image" class="w-full h-40 object-cover rounded-lg" />
                            <button @click.stop="toggleLike(product)"
                                class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                                <HeartIcon v-if="likedProducts[product.name]" class="w-6 h-6 text-red-600" />
                                <HeartIcon v-else class="w-6 h-6 text-gray-400" />
                            </button>
                        </div>
                        <h3 class="text-sm font-semibold mt-2">{{ product.name }}</h3>
                        <p class="text-md font-semibold text-green-800">{{ product.price }}</p>
                    </div>
                </div>

                <p v-else class="text-gray-500 text-center mt-4">{{ t('search.noResults') }}</p>
            </div>

            <!-- **🔹 Show categories & last searches if no search** -->
            <div v-if="!searchQuery.length" class="mt-4">
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-bold">{{ t('search.lastResults') }}</h2>
                </div>

                <div v-if="searchHistory.length" class="mt-2 space-y-2">
                    <div v-for="(item, index) in searchHistory" :key="index"
                        class="flex justify-between items-center py-2 cursor-pointer" @click="searchFromHistory(item)">
                        <div class="flex items-center space-x-2">
                            <ClockIcon class="w-5 h-5 text-gray-500" />
                            <span class="text-gray-700">{{ item }}</span>
                        </div>
                        <button @click.stop="removeHistoryItem(index)"
                            class="p-2 hover:bg-gray-100 rounded-[50%] transition">
                            <XMarkIcon class="w-5 h-5 text-gray-400" />
                        </button>
                    </div>
                </div>

                <!-- **🔹 Categories** -->
                <h2 class="text-lg font-bold mt-6">{{ t('search.categories') }}</h2>
                <div class="mt-2 space-y-2">
                    <div v-for="category in categories" :key="category.name"
                        class="flex items-center justify-between bg-white p-3 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100">
                        <img :src="category.image" class="w-10 h-10 rounded-md object-cover" />
                        <p class="text-gray-800 font-semibold flex-1 text-center">{{ category.name }}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.slide-right-enter-active,
.slide-right-leave-active {
    transition: transform 0.4s ease-in-out;
}

.slide-right-enter-from {
    transform: translateX(100%);
}

.slide-right-leave-to {
    transform: translateX(100%);
}

</style>

