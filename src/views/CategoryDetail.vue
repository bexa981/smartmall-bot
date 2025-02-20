<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Firebase konfiguratsiyasini tekshirib chiqing
import { ChevronLeftIcon, HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
import { HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';
import MenuCategory from '../components/MenuCategory.vue';
import TotalPrice from '../components/TotalPrice.vue';

const route = useRoute();
const router = useRouter();
const categoryName = ref(route.query.category || "No Category Selected");
const categories = ref([]);
const products = ref([]);
const selectedProducts = ref([]);

// **Yoqtirilgan mahsulotlarni localStorage'dan olish**
const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});

// **LocalStorage'ni kuzatib borish**
watch(likedProducts, (newVal) => {
    localStorage.setItem('likedProducts', JSON.stringify(newVal));
}, { deep: true });

// **Firestore'dan kategoriyalar va mahsulotlarni yuklash**
const fetchCategoriesAndProducts = async () => {
    try {
        // console.log("🔄 Fetching categories...");
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        categories.value = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.id, // Kategoriya nomi ID sifatida ishlatiladi
            image: doc.data().image || "https://via.placeholder.com/100" // Agar rasm yo‘q bo‘lsa, default rasm
        }));
        // console.log("✅ Categories Loaded:", categories.value);

        // console.log("🔄 Fetching products...");
        const productsSnapshot = await getDocs(collection(db, "products"));
        products.value = productsSnapshot.docs.map(doc => ({
            id: doc.id,
            name: doc.data().name,
            description:doc.data().description,
            price: doc.data().price,
            image: doc.data().image || "../assets/icons/box.png",
            category: doc.data().category // Kategoriya maydoni Firestore'da mavjud bo‘lishi kerak
        }));
        // console.log("✅ Products Loaded:", products.value);

        filterProductsByCategory();
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};

// **Kategoriya bo‘yicha mahsulotlarni filtrlash**
const filterProductsByCategory = () => {
    selectedProducts.value = products.value.filter(product => product.category === categoryName.value);
    // console.log(`🛍️ Products for ${categoryName.value}:`, selectedProducts.value);
};

// **Mahsulotni yoqtirish funksiyasi**
const toggleLike = (product) => {
    if (likedProducts.value[product.id]) {
        delete likedProducts.value[product.id]; // O'chirish
    } else {
        likedProducts.value[product.id] = product; // Qo‘shish
    }
};

// **Orqaga qaytish funksiyasi**
const goBack = () => {
    router.push('/'); // Bosh sahifaga qaytish
};

// **Mahsulot tafsilotlariga o'tish**
const goToProductDetail = (product) => {
    router.push({
        name: 'ProductDetail',
        query: {
            id: product.id,
            name: product.name,
            price: product.price,
            description:product.description,
            image: product.image
        }
    
        
    });
};

// **Kategoriya o‘zgarsa mahsulotlarni yangilash**
watch(() => route.query.category, (newCategory) => {
    if (newCategory) {
        categoryName.value = newCategory;
        filterProductsByCategory();
    }
});

// **Sahifa yuklanganda ma'lumotlarni yuklash**
onMounted(() => {
    fetchCategoriesAndProducts();
});
</script>

<template>
    <div class="p-3 pb-24 relative">
        <!-- **Orqaga qaytish tugmasi** -->
        <button @click="goBack" class="absolute top-0 left-0 p-2 text-gray-700">
            <ChevronLeftIcon class="w-6 h-6" />
        </button>

        <!-- **Kategoriya nomi** -->
        <h2 class="text-lg font-bold text-center">{{ categoryName }}</h2>

        <!-- **Yuklanish xabari** -->
        <div v-if="categories.length === 0 || products.length === 0" class="text-center text-gray-500">
            <p>Loading...</p>
        </div>

        <!-- **Mahsulotlar mavjud emas** -->
        <div v-if="selectedProducts.length === 0" class="text-center text-gray-500">
            <p>No products found in this category.</p>
        </div>

        <!-- **Mahsulotlar** -->
        <div v-else class="mt-6 grid grid-cols-2 gap-3">
            <div v-for="product in selectedProducts" :key="product.id"
                class="bg-white p-3 rounded-lg shadow-md cursor-pointer"
                @click="goToProductDetail(product)">
                
                <div class="relative">
                    <img :src="product.image" class="w-full h-40 object-contain rounded-lg" />
                    
                    <!-- **Yoqtirish tugmasi** -->
                    <button @click.stop="toggleLike(product)"
                        class="absolute top-0 right-0 bg-white rounded-full p-1 shadow-md">
                        <SolidHeartIcon v-if="likedProducts[product.id]" class="w-6 h-6 text-red-600" />
                        <OutlineHeartIcon v-else class="w-6 h-6 text-gray-500" />
                    </button>
                </div>
                <h3 class="text-sm font-semibold mt-2 truncate-2-lines">{{ product.name }}</h3>
                <p class="text-md font-semibold text-green-800">{{ product.price }} $</p>
            </div>
        </div>

        <!-- **Kategoriya menyusi va umumiy narx** -->
        <MenuCategory />
        <TotalPrice />
    </div>
</template>

<style scoped>
/* Mahsulotlar grid */
.grid-cols-2 {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: .5rem;
}

/* Matnni ikki qatorda kesish */
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
