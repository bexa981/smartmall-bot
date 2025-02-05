<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import {  HeartIcon as OutlineHeartIcon } from '@heroicons/vue/24/outline';
import { HeartIcon as SolidHeartIcon } from '@heroicons/vue/24/solid';
const router = useRouter();
const categories = ref([]);
const products = ref([]);
const totalPrice = ref(0);
const likedProducts = ref(JSON.parse(localStorage.getItem('likedProducts')) || {});
const addedProductId = ref(null);

// ✅ **Fetch Categories & Products from Firestore**
const fetchCategoriesAndProducts = async () => {
    try {
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        categories.value = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        const productsSnapshot = await getDocs(collection(db, "products"));
        products.value = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};

// ✅ **Toggle Like (Add/Remove Favorite)**
const toggleLike = (product) => {
    if (likedProducts.value[product.id]) {
        delete likedProducts.value[product.id];
    } else {
        likedProducts.value[product.id] = product;
    }
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts.value));
    likedProducts.value = { ...likedProducts.value }; // Force Vue to detect changes
};

// ✅ **Add Product to Cart (with Fly to Cart Animation)**
const addToCart = (product, event) => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // **Check if the product already exists in cart**
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            quantity: 1,
            selected: true
        });
    }

    // ✅ **Save to localStorage**
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // ✅ **Update total price**
    let newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem('totalCartPrice', newTotal.toFixed(2));
    window.dispatchEvent(new Event("storage"));

    // ✅ **Fly to Cart Animation**
    runFlyAnimation(event);

    // ✅ **Show "Added" effect on button**
    addedProductId.value = product.id;
    setTimeout(() => {
        addedProductId.value = null;
    }, 1000);
};

// ✅ **Fly to Cart Animation**
const runFlyAnimation = (event) => {
    const cartIcon = document.querySelector('.cart-icon');
    const btn = event.target;

    if (!cartIcon || !btn) return;

    const btnRect = btn.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    // **Create flying image**
    const flyImage = document.createElement("img");
    flyImage.src = btn.closest('.prod-main').querySelector('img').src;
    flyImage.classList.add("fly-to-cart");

    // **Set initial position**
    flyImage.style.top = `${btnRect.top}px`;
    flyImage.style.left = `${btnRect.left}px`;
    document.body.appendChild(flyImage);

    // **Move to cart icon**
    setTimeout(() => {
        flyImage.style.top = `${cartRect.top}px`;
        flyImage.style.left = `${cartRect.left}px`;
        flyImage.style.transform = "scale(0)";
        flyImage.style.opacity = "0";
    }, 500);

    // **Remove after animation**
    setTimeout(() => {
        flyImage.remove();
    }, 1000);
};

// ✅ **Navigate to Product Detail Page**
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

// ✅ **Update total price**
const updateTotalPrice = () => {
    const storedTotal = localStorage.getItem('totalCartPrice');
    totalPrice.value = storedTotal ? parseFloat(storedTotal).toFixed(2) : 0;
};

onMounted(() => {
    fetchCategoriesAndProducts();
    updateTotalPrice();
    window.addEventListener('storage', updateTotalPrice);
});

onUnmounted(() => {
    window.removeEventListener('storage', updateTotalPrice);
});
</script>

<template>
    <div v-if="categories.length === 0 || products.length === 0">
        <p>Yuklanmoqda...</p>
    </div>

    <div v-else>
        <!-- 🔹 Category List -->
        <div v-for="category in categories" :key="category.id">
            <h2 class="text-lg font-bold mb-2">{{ category.name }}</h2>

            <!-- 🔹 Product List -->
            <div class="flex space-x-2 justify-evenly flex-wrap py-2">
                <div v-for="product in products.filter(p => p.category === category.id)" :key="product.id"
                    class="bg-white prod-main w-[180px] p-2 mt-2 rounded-lg shadow-md flex flex-col items-center min-w-[180px] snap-center cursor-pointer"
                    @click="goToProductDetail(product)">

                    <div class="relative">
                        <img :src="product.image" class="w-40 h-40 object-contain rounded-lg" />
                        <button @click.stop="toggleLike(product)"
                            class="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md">
                            <SolidHeartIcon v-if="likedProducts[product.id]" class="w-6 h-6 text-red-600 " />
                            <OutlineHeartIcon v-else class="w-6 h-6 text-gray-400" />
                        </button>
                    </div>

                    <h3 class="text-sm font-semibold mt-2 text-center truncate-2-lines">{{ product.name }}</h3>
                    <p class="text-md mt-2 font-normal text-green-800 text-center">{{ product.price }} $</p>

                    <!-- 🛒 Add to Cart Button -->
                    <button class="buy"
                        :class="{ 'added': addedProductId === product.id }"
                        @click.stop="addToCart(product, $event)">
                        {{ addedProductId === product.id ? "Qo'shildi ✅" : "Sotib olish" }}
                    </button>
                </div>
            </div>
        </div>

        <!-- 🛒 Total Price -->
        <div v-if="totalPrice > 0" class="fixed bottom-4 left-2 right-3 bg-green-800 text-white rounded-xl shadow-lg p-4 flex justify-between items-center cursor-pointer"
             @click="router.push('/cart')">
            <ShoppingCartIcon class="w-6 h-6 text-white cart-icon" />
            <p class="text-lg font-semibold">{{ totalPrice.toLocaleString() }} $</p>
        </div>
    </div>
</template>

<style scoped>
/* 🔹 Buy Button */
.buy {
    background-color: rgb(3, 125, 105);
    color: white;
    padding: 8px;
    border-radius: 5px;
    width: 90%;
    cursor: pointer;
    margin-top: 4px;
    transition: all 0.3s;
}

.buy.added {
    background-color: #18cde9;
    color: white;
    transform: scale(1.1);
}

/* 🔹 Fly to Cart */
.fly-to-cart {
    position: fixed;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    transition: all 0.5s ease-in-out;
    z-index: 9999;
    pointer-events: none;
}
</style>
