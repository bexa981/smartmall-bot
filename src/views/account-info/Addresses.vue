<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, PlusCircleIcon, ChevronRightIcon } from '@heroicons/vue/24/solid';

const router = useRouter();
const addresses = ref([]);

// Load addresses from localStorage
onMounted(() => {
    const savedAddresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    addresses.value = savedAddresses;
});

// Navigate to Map Selection Page
const addAddress = () => {
    router.push('/map-select');
};

// Open address in map
const openAddressInMap = (address) => {
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`, '_blank');
};
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center justify-between">
            <button @click="router.push('/')" class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold text-center flex-1">Manzillarim</h2>
            <button @click="addAddress" class="p-1 bg-white border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <PlusCircleIcon class="w-5 h-5 text-indigo-500" />
            </button>
        </div>

        <!-- Address List -->
        <div class="mt-6 space-y-4">
            <div v-for="(address, index) in addresses" :key="index"
                class="bg-white p-4 rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition flex justify-between items-center"
                @click="openAddressInMap(address)">
                <div class="flex-1">
                    <p class="text-xs text-gray-500">{{ index + 1 }}</p>
                    <p class="text-gray-900 font-medium">{{ address }}</p>
                </div>
                <ChevronRightIcon class="w-5 h-5 text-gray-500" />
            </div>
        </div>

        <!-- No Address Message -->
        <div v-if="addresses.length === 0" class="mt-10 text-center text-gray-500">
            <p>Manzil qo'shilmagan</p>
        </div>
    </div>
</template>

<style scoped>
/* Styling for smooth UI */
</style>
