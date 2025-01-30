<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';

const router = useRouter();

// **Reactive Variables**
const categories = ref([]);
const products = ref([]);
const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});

// **Watch likedProducts and update localStorage whenever it changes**
watch(likedProducts, (newVal) => {
    localStorage.setItem('likedProducts', JSON.stringify(newVal));
}, { deep: true });

// **Fetch Categories & Products from Firestore**
const fetchCategoriesAndProducts = async () => {
    try {
        console.log("Fetching categories...");
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        categories.value = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Categories Fetched:", categories.value);

        console.log("Fetching products...");
        const productsSnapshot = await getDocs(collection(db, "products"));
        products.value = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log("✅ Products Fetched:", products.value);
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};

// **Navigate to Product Detail Page**
const goToProductDetail = (product) => {
    router.push({
        name: 'ProductDetail',
        query: {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
        }
    });
};
const toggleLike = (product) => {
    // Ensure likedProducts is always an object
    if (!likedProducts.value || typeof likedProducts.value !== 'object') {
        likedProducts.value = {};
    }

    if (likedProducts.value[product.id]) {
        // 🔹 Remove from liked products
        delete likedProducts.value[product.id];
    } else {
        // 🔹 Add product to liked
        likedProducts.value[product.id] = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            description: product.description
        };
    }

    // 🔹 Save updated liked products to localStorage
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts.value));

    // 🔹 Force Vue to detect changes
    likedProducts.value = { ...likedProducts.value };
};
// **Fetch Data When Component Mounts**
onMounted(() => {
    const storedLikedProducts = localStorage.getItem('likedProducts');
    likedProducts.value = storedLikedProducts ? JSON.parse(storedLikedProducts) : {};
    fetchCategoriesAndProducts();
});
</script>

<template>
    <div v-if="categories.length === 0 || products.length === 0">
        <p>Loading...</p> <!-- Show loading message -->
    </div>

    <div v-else>
        <div v-for="category in categories" :key="category.id">
            <h2 class="text-lg font-bold mb-2">{{ category.id }}</h2> <!-- 🔥 Fixed category name display -->

            <!-- 🔹 Scrollable Product List 🔹 -->
            <div class="overflow-x-auto flex space-x-4 py-2 scrollbar-hide" ref="scrollContainer">
                <div v-for="product in products.filter(p => p.category === category.id)" :key="product.id"
                    class="bg-white p-2 rounded-lg shadow-md flex flex-col items-center min-w-[180px] snap-center cursor-pointer"
                    @click="goToProductDetail(product)">

                    <div class="relative">
                        <img :src="product.image" class="w-40 h-40 object-contain rounded-lg" />
                        <button @click.stop="toggleLike(product)"
                            class="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                            <SolidHeartIcon v-if="likedProducts[product.id]" class="w-6 h-6 text-red-600" />
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
/* 🔹 Horizontal Scroll */
.overflow-x-auto {
    scroll-behavior: smooth;
    white-space: nowrap;
    overflow-x: auto;
    display: flex;
    gap: 12px;
    padding-bottom: 10px;
}

/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Enable smooth scrolling */
.overflow-x-auto {
    scroll-behavior: smooth;
}

/* 🔹 Fix text truncation for product names */
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
