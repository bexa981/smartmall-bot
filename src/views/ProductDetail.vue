<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure Firebase is correctly imported
import { useI18n } from 'vue-i18n';
import { HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon, ChevronLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();
const product = ref(null);
const quantity = ref(1);
const showNotification = ref(false);

// **Fetch Product Details from Firebase**
const fetchProductDetails = async () => {
    try {
        const productId = route.query.id;
        if (!productId) {
            console.error("❌ No product ID found!");
            return;
        }

        const productRef = doc(db, "products", productId);
        const productSnap = await getDoc(productRef);

        if (productSnap.exists()) {
            product.value = { id: productId, ...productSnap.data() };
        } else {
            console.error("❌ Product not found in Firebase!");
        }
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};

// **Increase / Decrease Quantity**
const increaseQuantity = () => quantity.value++;
const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
};

// **Navigate Back**
const goBack = () => {
    router.push('/');
};

// **Add Product to Cart**
const addToCart = () => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product already exists in the cart
    const existingProduct = cart.find(item => item.id === product.value.id);

    if (existingProduct) {
        existingProduct.quantity += quantity.value; // Increase quantity
    } else {
        cart.push({
            id: product.value.id,
            name: product.value.name,
            price: parseFloat(product.value.price), // Ensure price is a number
            image: product.value.image,
            quantity: quantity.value,
            selected: true
        });
    }

    // Save updated cart to localStorage
    localStorage.setItem('cartItems', JSON.stringify(cart));

    // ✅ Correctly calculate total price across multiple products
    let newTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    localStorage.setItem('totalCartPrice', newTotal.toFixed(2)); // Store as string for consistency

    // ✅ Trigger update for `TotalPrice.vue`
    window.dispatchEvent(new Event("storage"));

    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
        router.push('/'); // Navigate back to home
    }, 1000);
};

// **Fetch Data When Component Mounts**
onMounted(() => {
    fetchProductDetails();
});
</script>

<template>
    <div class="p-3 pb-24">
        <div v-if="product">
            <!-- Back Button -->
            <div class="relative flex justify-center">
                <button @click="goBack" class="absolute top-0 left-0 p-2 rounded-full bg-white hover:bg-gray-300 transition">
                    <ChevronLeftIcon class="w-6 h-6 text-gray-700" />
                </button>
                <img :src="product.image" alt="Product Image" class="w-[70%] object-cover rounded-lg" />
                <button class="absolute cursor-pointer top-0 right-0 bg-white p-2 transition">
                    <HeartIcon class="w-6 h-6 text-red-600" />
                </button>
            </div>

            <!-- Product Info -->
            <div class="mt-4">
                <p class="text-xl text-green-700 font-bold">{{ product.price }} $</p>
                <p class="text-black-700 text-lg">{{ product.name }}</p>
                <br>
                <!-- Product Description -->
                <div class="mt-4">
                    <h3 class="font-bold text-md">{{ t('product.descriptionTitle') }}</h3>
                    <p class="text-black-600 font-normal">{{ product.description }}</p>
                </div>
            </div>
        </div>
        <div v-else class="text-center flex flex-col justify-center text-gray-500">
            <p >Mahsulotlar yuklanmoqda </p>
            <img width="100px" src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-05-37_512.gif" alt="">
        </div>
    </div>

    <!-- Quantity & Add to Cart (Fixed Bottom) -->
    <div v-if="product" class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between gap-4 items-center border-t border-gray-200">
        <div class="flex items-center bg-white-100 border-gray-300 w-[50%] border justify-center rounded-lg px-3 py-2">
            <button @click="decreaseQuantity" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <MinusIcon class="w-5 h-5 text-gray-700" />
            </button>
            <input type="number" v-model="quantity" class="mx-4 text-center w-12 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500" />
            <button @click="increaseQuantity" class="p-2 rounded-full bg-green-700 cursor-pointer transition">
                <PlusIcon class="w-5 h-5 text-white" />
            </button>
        </div>

        <button @click="addToCart" class="flex cursor-pointer text-sm items-center bg-green-700 text-white py-4 px-5 w-[50%] rounded-lg shadow-md transition">
            <ShoppingCartIcon class="w-5 h-5 mr-2" />
            {{ t('product.addToCart') }}
        </button>
    </div>

    <transition name="fade">
        <div v-if="showNotification" class="fixed w-[90%] top-5 left-1/2 transform -translate-x-1/2 bg-white shadow-lg p-3 rounded-lg flex items-center gap-2 border border-gray-300">
            <CheckCircleIcon class="w-6 h-6 text-green-500" />
            <span class="text-gray-700">{{ t('product.addedToCart') }}</span>
        </div>
    </transition>
</template>

<style scoped>
/* Ensure bottom buttons are fixed */
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

/* Hide arrows/spinners in number input */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
}

/* Notification fade animation */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
</style>
