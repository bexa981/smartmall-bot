<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, TrashIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/solid';
import ProductIcon from '../assets/icons/box.png';

const { t } = useI18n();
const router = useRouter();

// Load Cart Items from LocalStorage
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || [
    { id: 1, name: "Кухонная вытяжка Artel-1160 Rapido Touch", price: 33, image: ProductIcon, quantity: 1, selected: true },
    { id: 2, name: "Кухонная вытяжка Artel-1160 Rapido Touch", price: 12, image: ProductIcon, quantity: 1, selected: true },
    { id: 3, name: "Кухонная вытяжка Artel-1160 Rapido Touch", price: 55, image: ProductIcon, quantity: 1, selected: true }
]);

// Save Cart Items to LocalStorage
watch(cartItems, () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value));
}, { deep: true });

// Select / Deselect all
const selectAll = ref(true);
const toggleSelectAll = () => {
    selectAll.value = !selectAll.value;
    cartItems.value.forEach(item => item.selected = selectAll.value);
};

// Update total price
const totalPrice = computed(() => {
    return cartItems.value
        .filter(item => item.selected)
        .reduce((sum, item) => sum + item.price * item.quantity, 0);
});

// Increase / Decrease quantity
const increaseQuantity = (item) => item.quantity++;
const decreaseQuantity = (item) => { if (item.quantity > 1) item.quantity--; };

// Delete item
const removeItem = (id) => {
    cartItems.value = cartItems.value.filter(item => item.id !== id);
};

// Proceed to checkout
const proceedToCheckout = () => {
    alert(t('cart.proceed'));
};
</script>

<template>
    <div class="p-3 pb-24 relative">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
            <button @click="router.push('/')" class="p-2">
                <ChevronLeftIcon class="w-6 h-6 text-gray-700" />
            </button>
            <h2 class="text-lg text-green-800 font-bold text-center flex-grow">{{ t('cart.title') }}</h2>
            <button @click="cartItems = []" class="p-2">
                <TrashIcon class="w-6 h-6 text-gray-400" />
            </button>
        </div>

        <!-- Select All -->
        <div class="flex items-center mb-3">
            <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" class="mr-2 w-5 h-5 text-green-800" />
            <span class="text-md font-semibold">{{ t('cart.selectAll') }}</span>
            <span class="ml-auto text-gray-500">{{ cartItems.length }} {{ t('cart.items') }}</span>
        </div>

        <!-- Cart Items -->
        <div v-for="item in cartItems" :key="item.id"
            class="bg-white p-3 rounded-lg shadow-md mb-4 flex items-center justify-between">
            <div class="flex items-center">
                <input type="checkbox" v-model="item.selected" class="mr-3 w-5 h-5 text-green-800" />
                <img :src="item.image" alt="Product Image" class="w-16 h-16 object-cover rounded-lg" />
                <div class="ml-3 flex flex-col gap-3">
                    <p class="text-green-800 font-bold">{{ item.price }} $</p>
                    <p class="text-sm text-gray-700">{{ item.name }}</p>
                    <div class="flex justify-between">
                        <div class="flex items-center">
                            <button @click="decreaseQuantity(item)" class="p-2 bg-gray-200 rounded-[50%]">
                                <MinusIcon class="w-4 h-4 text-gray-700" />
                            </button>
                            <span class="mx-2 font-semibold">{{ item.quantity }}</span>
                            <button @click="increaseQuantity(item)" class="p-2 bg-green-700 text-white rounded-[50%]">
                                <PlusIcon class="w-4 h-4 text-white" />
                            </button>
                        </div>
                        <button @click="removeItem(item.id)" class="p-2 bg-red-100 rounded-md">
                            <TrashIcon class="w-5 h-5 text-red-500" />
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Total Price & Proceed Button -->
        <div class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg border-t border-gray-200">
            <div class="flex justify-between items-center mb-2">
                <p class="text-md font-bold">{{ t('cart.total') }}</p>
                <p class="text-lg font-bold text-green-800">{{ totalPrice.toLocaleString() }} $</p>
            </div>
            <button @click="proceedToCheckout" class="w-full cursor-pointer bg-indigo-900 text-white py-3 rounded-lg">
                {{ t('cart.proceed') }}
            </button>
        </div>
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
</style>
