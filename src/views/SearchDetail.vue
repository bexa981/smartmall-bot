<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { XMarkIcon, MagnifyingGlassIcon, ChevronLeftIcon, HeartIcon } from "@heroicons/vue/24/solid";
import { ClockIcon } from "@heroicons/vue/24/outline";
import { useI18n } from "vue-i18n";

const router = useRouter();
const { t } = useI18n();

const searchQuery = ref("");
const searchHistory = ref([]);
const filteredProducts = ref([]);
const filteredCategories = ref([]);
const allProducts = ref([]);
const allCategories = ref([]); // 🔹 Store all categories from Firebase
const likedProducts = ref(JSON.parse(localStorage.getItem("likedProducts")) || {});

// 🔹 Load search history from localStorage
onMounted(async () => {
  searchHistory.value = JSON.parse(localStorage.getItem("searchHistory")) || [];
  await fetchCategoriesAndProducts();
});

// 🔹 Fetch categories & products from Firebase
const fetchCategoriesAndProducts = async () => {
  try {
    // Fetch categories
    const categoriesSnapshot = await getDocs(collection(db, "categories"));
    allCategories.value = categoriesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch products
    const productsSnapshot = await getDocs(collection(db, "products"));
    allProducts.value = productsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("🔥 Error fetching data from Firebase:", error.message);
  }
};

// 🔹 Save search to history & filter results
const saveSearch = () => {
  if (searchQuery.value.trim() !== "") {
    searchHistory.value.unshift(searchQuery.value);
    searchHistory.value = [...new Set(searchHistory.value)].slice(0, 5);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
    filterResults();
  }
};

// 🔹 Filter products & categories as user types
const filterResults = () => {
  const query = searchQuery.value.trim().toLowerCase();
  if (query) {
    filteredProducts.value = allProducts.value.filter((p) => p.name.toLowerCase().includes(query));
    filteredCategories.value = allCategories.value.filter((c) => c.name.toLowerCase().includes(query));
  } else {
    filteredProducts.value = [];
    filteredCategories.value = [];
  }
};

// 🔹 Navigate to product detail
const goToProductDetail = (product) => {
  router.push({
    name: "ProductDetail",
    query: {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
    },
  });
};

// 🔹 Navigate to category detail
const goToCategoryDetail = (category) => {
  router.push({
    name: "CategoryDetail",
    query: { id: category.id, name: category.name },
  });
};

// 🔹 Clear search input & results
const clearSearch = () => {
  searchQuery.value = "";
  filteredProducts.value = [];
  filteredCategories.value = [];
};

// 🔹 Remove single search history item
const removeHistoryItem = (index) => {
  searchHistory.value.splice(index, 1);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory.value));
};

// 🔹 Search again from history
const searchFromHistory = (query) => {
  searchQuery.value = query;
  filterResults();
};

// 🔹 Toggle Like / Unlike Products
const toggleLike = (product) => {
  if (likedProducts.value[product.id]) {
    delete likedProducts.value[product.id];
  } else {
    likedProducts.value[product.id] = product;
  }
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts.value));
};

// 🔹 Go back
const goBack = () => {
  router.push("/");
};
</script>

<template>
  <transition name="slide-right">
    <div class="p-3">
      <!-- 🔹 Search Bar -->
      <div class="flex items-center justify-between">
        <button @click="goBack" class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
          <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
        </button>
        <div class="flex w-[80%] justify-between border border-gray-300 bg-gray-100 items-center rounded-lg px-3 py-2 hover:border-green-900">
          <MagnifyingGlassIcon class="w-5 h-5 text-gray-500" />
          <input
            v-model="searchQuery"
            @keyup.enter="saveSearch"
            @input="filterResults"
            type="text"
            :placeholder="t('search.placeholder')"
            class="flex-1 px-2 bg-transparent focus:outline-none"
          />
          <button v-if="searchQuery" @click="clearSearch" class="text-gray-500 hover:text-gray-700">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- 🔹 Search Results -->
      <div v-if="searchQuery.length">
        <h2 v-if="filteredProducts.length || filteredCategories.length" class="text-lg font-bold text-purple-600 mt-4">
          {{ filteredProducts.length + filteredCategories.length }} {{ t('search.resultsFound') }}
        </h2>

        <!-- 🔹 Filtered Categories -->
        <div v-if="filteredCategories.length" class="mt-4 space-y-2">
          <h3 class="font-bold text-gray-800">{{ t('search.categories') }}</h3>
          <div v-for="category in filteredCategories" :key="category.id" @click="goToCategoryDetail(category)" class="cursor-pointer bg-white p-3 rounded-lg shadow-sm flex items-center hover:bg-gray-100">
            <img :src="category.image" class="w-10 h-10 rounded-md object-cover" />
            <p class="text-gray-800 font-semibold flex-1 text-center">{{ category.name }}</p>
          </div>
        </div>

        <!-- 🔹 Filtered Products -->
        <div v-if="filteredProducts.length" class="mt-4 grid grid-cols-2 gap-3">
          <div v-for="product in filteredProducts" :key="product.id" class="bg-white p-3 rounded-lg shadow-md cursor-pointer" @click="goToProductDetail(product)">
            <div class="relative">
              <img :src="product.image" class="w-full h-40 object-cover rounded-lg" />
              <button @click.stop="toggleLike(product)" class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                <HeartIcon v-if="likedProducts[product.id]" class="w-6 h-6 text-red-600" />
                <HeartIcon v-else class="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <h3 class="text-sm font-semibold mt-2">{{ product.name }}</h3>
            <p class="text-md font-semibold text-green-800">{{ product.price }} $</p>
          </div>
        </div>
      </div>

      <!-- 🔹 Show All Categories (If No Search) -->
      <div v-if="!searchQuery.length" class="mt-6">
        <h2 class="text-lg font-bold">{{ t('search.categories') }}</h2>
        <div class="mt-2 space-y-2">
          <div v-for="category in allCategories" :key="category.id" @click="goToCategoryDetail(category)" class="cursor-pointer bg-white p-3 rounded-lg shadow-sm flex items-center hover:bg-gray-100">
            <img :src="category.image" class="w-10 h-10 rounded-md object-cover" />
            <p class="text-gray-800 font-semibold flex-1 text-center">{{ category.id }}</p>
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
.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
