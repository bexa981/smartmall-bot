<script setup>
import { ref } from 'vue';
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';
import { useRouter } from 'vue-router';

const router = useRouter();

// Active tab (default: "Faol")
const activeTab = ref("Faol");

// Orders Data
const orders = ref([
    {
        id: 34446,
        status: "Yangi",
        createdAt: "29.01.2025, 10:17",
        price: "11,600,000 UZS",
        itemCount: 3,
        isExpanded: false, // Expand order details
        category: "Faol",
    },
    {
        id: 34445,
        status: "Yetkazilgan",
        createdAt: "28.01.2025, 14:30",
        price: "9,200,000 UZS",
        itemCount: 2,
        isExpanded: false,
        category: "Barchasi",
    },
    {
        id: 34444,
        status: "Bekor qilingan",
        createdAt: "27.01.2025, 09:50",
        price: "5,600,000 UZS",
        itemCount: 1,
        isExpanded: false,
        category: "Barchasi",
    },
]);

// Function to filter orders by selected tab
const filteredOrders = () => {
    return activeTab.value === "Faol"
        ? orders.value.filter(order => order.status === "Yangi")
        : orders.value;
};

// Toggle order details
const toggleOrder = (order) => {
    order.isExpanded = !order.isExpanded;
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
            <button @click="goBack" class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold text-center flex-1">Buyurtmalarim</h2>
        </div>

        <!-- Tab Selection -->
        <div class="flex justify-center mt-4 space-x-2 bg-gray-100 p-1 rounded-lg w-[60%] mx-auto">
            <button @click="activeTab = 'Faol'" :class="['w-1/2 py-2 rounded-md', activeTab === 'Faol' ? 'bg-white shadow' : 'text-gray-500']">
                Faol
            </button>
            <button @click="activeTab = 'Barchasi'" :class="['w-1/2 py-2 rounded-md', activeTab === 'Barchasi' ? 'bg-white shadow' : 'text-gray-500']">
                Barchasi
            </button>
        </div>

        <!-- Orders List -->
        <div class="mt-6 space-y-3">
            <div v-for="order in filteredOrders()" :key="order.id" class="bg-white p-4 rounded-lg shadow-md">
                <!-- Order Summary -->
                <div class="flex justify-between items-center">
                    <div>
                        <p class="text-sm font-semibold">Buyurtma raqami: {{ order.id }}</p>
                    </div>
                </div>
                <hr class="my-2">

                <div class="space-y-1 text-gray-600">
                    <p class="text-sm flex items-center">
                        <span>Holati:</span>
                        <span :class="['ml-2 text-xs px-2 py-1 rounded-md', 
                                      order.status === 'Yangi' ? 'bg-green-100 text-green-600' : 
                                      order.status === 'Yetkazilgan' ? 'bg-blue-100 text-blue-600' : 
                                      'bg-red-100 text-red-600']">
                            {{ order.status }}
                        </span>
                    </p>
                    <p class="text-sm">Yaratilgan vaqti: {{ order.createdAt }}</p>
                    <p class="text-sm font-semibold text-black">Narxi: {{ order.price }}</p>
                </div>

                <!-- Toggle Order Items -->
                <button @click="toggleOrder(order)" class="text-purple-600 mt-3 flex items-center">
                    {{ order.itemCount }} Mahsulotlar
                    <ChevronDownIcon :class="['w-5 h-5 ml-2 transition-transform', order.isExpanded ? 'rotate-180' : '']" />
                </button>

                <!-- Expanded Order Details -->
                <div v-if="order.isExpanded" class="mt-3 bg-gray-50 p-3 rounded-lg">
                    <p class="text-sm text-gray-700">Buyurtma tafsilotlari bu yerda bo'ladi...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
button {
    cursor: pointer;
}
</style>
