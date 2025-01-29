<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { HeartIcon, ShoppingCartIcon, MinusIcon, PlusIcon, ChevronLeftIcon, CheckCircleIcon } from '@heroicons/vue/24/solid';

const { t } = useI18n(); // i18n Hook for translations
const route = useRoute();
const router = useRouter();

// Product data from router query
const product = ref({
    name: route.query.name || "No Name",
    price: parseFloat(route.query.price) || 0,
    image: route.query.image || "https://via.placeholder.com/300",
    description: t('product.description')
});

// Quantity control
const quantity = ref(1);
const increaseQuantity = () => quantity.value++;
const decreaseQuantity = () => {
    if (quantity.value > 1) quantity.value--;
};

// Go back function
const goBack = () => {
    router.push('/');
};

// Cart notification
const showNotification = ref(false);
const totalCartPrice = ref(0);

const addToCart = () => {
    let currentTotal = localStorage.getItem('totalCartPrice') ? parseFloat(localStorage.getItem('totalCartPrice')) : 0;
    let newTotal = currentTotal + (product.value.price * quantity.value);
    totalCartPrice.value = newTotal;
    
    // Save to localStorage
    localStorage.setItem('totalCartPrice', newTotal);

    showNotification.value = true;
    setTimeout(() => {
        showNotification.value = false;
        router.push('/'); // Navigate to Home.vue
    }, 2000);
};
</script>

<template>
    <div class="p-3 pb-24">
        <!-- Back Button -->
        <div class="relative flex justify-center">
            <button @click="goBack" class="absolute top-0 left-0 p-2 rounded-full bg-white-200 hover:bg-white-300 transition">
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

    <!-- Quantity & Add to Cart (Fixed Bottom) -->
    <div class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between gap-4 items-center border-t border-gray-200">
        <div class="flex quant items-center bg-white-100 border-gray-300 w-[50%] border justify-center rounded-lg px-3 py-2">
            <button @click="decreaseQuantity" class="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
                <MinusIcon class="w-5 h-5 text-gray-700" />
            </button>
            <input type="number" v-model="quantity"
                class="mx-4 inpt font-semibold text-center w-12 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-0 focus:ring-blue-500" />
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
@media only screen and (max-width: 424px) {
    button {
        font-size: 12px;
    }

    .quant {
        padding: 15px 5px;
        justify-content: center;
        gap: 0;
    }
}

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

.inpt {
    border-bottom: 1px solid rgb(8, 92, 8);
    border-radius: 0;
    border-top: none;
    border-right: none;
    border-left: none;
}

/* Notification fade animation */
.fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
    opacity: 0;
}
/* Hide arrows/spinners in number input */
input[type=number]::-webkit-inner-spin-button, 
input[type=number]::-webkit-outer-spin-button { 
    -webkit-appearance: none;
    margin: 0;
}


</style>
