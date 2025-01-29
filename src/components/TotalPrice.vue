<script setup>
import { ref, onMounted } from 'vue';
import { ShoppingCartIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const totalPrice = ref(0);
const router = useRouter();

onMounted(() => {
    totalPrice.value = localStorage.getItem('totalCartPrice') ? parseFloat(localStorage.getItem('totalCartPrice')) : 0;
});

// Navigate to cart
const goToCart = () => {
    router.push('/cart');
};
</script>

<template>
  <div v-if="totalPrice > 0" 
       class="fixed bottom-4 left-4 right-4 bg-indigo-900 text-white rounded-xl shadow-lg p-4 flex justify-between items-center cursor-pointer"
       @click="goToCart">
    <ShoppingCartIcon class="w-6 h-6 text-white" />
    <p class="text-lg font-semibold">{{ totalPrice }} $</p>
  </div>
</template>

<style scoped>
/* Ensure the total price bar is fixed */
</style>
