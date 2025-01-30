<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const totalPrice = ref(0);
const router = useRouter();

const updateTotalPrice = () => {
    const storedTotal = localStorage.getItem('totalCartPrice');
    totalPrice.value = storedTotal ? parseFloat(storedTotal).toFixed(2) : 0; // Ensure it's correctly formatted
};

// Run function when the component is mounted
onMounted(() => {
    updateTotalPrice();
    window.addEventListener('storage', updateTotalPrice); // Listen for updates
});

// Clean up event listener when component unmounts
onUnmounted(() => {
    window.removeEventListener('storage', updateTotalPrice);
});

// Navigate to cart
const goToCart = () => {
    router.push('/cart');
};
</script>

<template>
  <div v-if="totalPrice > 0" 
       class="fixed bottom-4 left-2 right-3 bg-green-800 text-white rounded-xl shadow-lg p-4 flex justify-between items-center cursor-pointer"
       @click="goToCart">
    <ShoppingCartIcon class="w-6 h-6 text-white" />
    <p class="text-lg font-semibold">{{ totalPrice.toLocaleString() }} $</p>
  </div>
</template>

<style scoped>
/* Ensure the total price bar is fixed */
</style>
