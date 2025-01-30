<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { HeartIcon as SolidHeartIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const favouriteProducts = ref([]);

// Load favourite products from localStorage
onMounted(() => {
    const storedFavourites = localStorage.getItem("likedProducts");
    favouriteProducts.value = storedFavourites ? JSON.parse(storedFavourites) : {};
});
// Navigate to product details
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

// Remove product from favourites
const removeFromFavourites = (product) => {
    // Check if favouriteProducts is valid
    if (!favouriteProducts.value || typeof favouriteProducts.value !== 'object') {
        return;
    }

    // 🔹 Remove the product from favouriteProducts
    delete favouriteProducts.value[product.id];

    // 🔹 Update localStorage
    localStorage.setItem("likedProducts", JSON.stringify(favouriteProducts.value));

    // 🔹 Force UI update
    favouriteProducts.value = { ...favouriteProducts.value };
};

// Go back function
const goBack = () => {
    router.push('/');
};
</script>

<template>
    <div class="p-4">
        <!-- Back Button & Title -->
        <div class="flex items-center justify-between">
            <button @click="goBack"
                class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold text-center flex-1">Sevimlilar</h2>
        </div>

        <!-- Favourites List -->
        <div class="mt-6 grid grid-cols-2 gap-3">
            <div v-for="product in favouriteProducts" :key="product.name"
                class="bg-white p-3 rounded-lg shadow-md cursor-pointer transition-transform hover:scale-105"
                @click="goToProductDetail(product)">

                <div class="relative">
                    <img :src="product.image" class="w-full h-40 object-contain rounded-lg" />

                    <!-- Remove from Favourites -->
                    <button @click.stop="removeFromFavourites(product)"
                        class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                        <SolidHeartIcon class="w-6 h-6 text-red-600" />
                    </button>
                </div>
                <h3 class="text-sm font-semibold mt-2 truncate-2-lines">{{ product.name }}</h3>
                <p class="text-md font-semibold text-green-800">{{ product.price }} UZS</p>
            </div>
        </div>

        <!-- No favourites message -->
        <div v-if="favouriteProducts.length === 0" class="mt-10 text-center text-gray-500">
            <p>Sevimli mahsulotlar topilmadi</p>
        </div>
    </div>
</template>

<style scoped>
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
    white-space: normal;
    max-width: 100%;
}
</style>
