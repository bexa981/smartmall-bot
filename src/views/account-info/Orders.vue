<template>
    <div class="p-4">
        <!-- 🔹 Back Button & Title -->
        <div class="flex items-center justify-between">
            <button @click="goBack"
                class="p-1 bg-gray-100 border cursor-pointer border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50">
                <ChevronLeftIcon class="w-5 h-5 text-gray-500" />
            </button>
            <h2 class="text-lg font-bold text-center flex-1">Buyurtmalarim</h2>
        </div>

        <!-- 🔹 Tab Selection -->
        <div class="flex justify-center mt-4 space-x-2 bg-gray-100 p-1 rounded-lg w-[60%] mx-auto">
            <button @click="activeTab = 'Faol'"
                :class="['w-1/2 py-2 rounded-md', activeTab === 'Faol' ? 'bg-white shadow' : 'text-gray-500']">
                Faol
            </button>
            <button @click="activeTab = 'Barchasi'"
                :class="['w-1/2 py-2 rounded-md', activeTab === 'Barchasi' ? 'bg-white shadow' : 'text-gray-500']">
                Barchasi
            </button>
        </div>

        <!-- 🔹 Loading State -->
        <div v-if="loading" class="text-center mt-6 text-gray-600">Yuklanmoqda...</div>

        <!-- 🔹 No Orders Found -->
        <div v-else-if="orders.length === 0" class="text-center mt-6 text-gray-500">
            Hech qanday buyurtma mavjud emas.
        </div>

        <!-- 🔹 Orders List -->
        <div v-else class="mt-6 space-y-3">
            <div v-for="order in filteredOrders" :key="order.id" class="bg-white p-4 rounded-lg shadow-md">
                <!-- 🔹 Order Summary -->
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
                    <p class="text-sm">Yaratilgan vaqti: {{ formatDate(order.timestamp) }}</p>
                    <p class="text-sm font-semibold text-black">Narxi: {{ formatPrice(order.totalPrice) }} UZS</p>
                </div>

                <!-- 🔹 Toggle Order Items -->
                <button @click="toggleOrder(order)" class="text-purple-600 mt-3 flex items-center">
                    {{ order.cartItems.length }} Mahsulotlar
                    <ChevronDownIcon :class="['w-5 h-5 ml-2 transition-transform', order.isExpanded ? 'rotate-180' : '']" />
                </button>

                <!-- 🔹 Expanded Order Details -->
                <div v-if="order.isExpanded" class="mt-3 bg-gray-50 p-3 rounded-lg">
                    <div v-for="item in order.cartItems" :key="item.id" class="flex items-center gap-4 border-b py-2">
                        <img :src="item.image" alt="Product" class="w-14 h-14 object-cover rounded-md" />
                        <div>
                            <p class="font-semibold text-gray-800">{{ item.name }}</p>
                            <p class="text-sm text-gray-600">Soni: {{ item.quantity }}</p>
                            <p class="text-sm text-gray-800 font-semibold">{{ formatPrice(item.price) }} $</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "@/firebase"; // ✅ Ensure correct Firestore import
import { ChevronLeftIcon, ChevronDownIcon } from '@heroicons/vue/24/solid';

// 🔹 Vue Router
const router = useRouter();

// 🔹 Active Tab State
const activeTab = ref("Faol");

// 🔹 Orders State
const orders = ref([]);
const loading = ref(true);

// 🔹 Get Current User ID from LocalStorage
const userId = ref(localStorage.getItem('userId') || "");

// ✅ **Fetch User Orders from Firestore**
const fetchOrders = async () => {
    if (!userId.value) {
        loading.value = false;
        return;
    }

    try {
        const q = query(
            collection(db, "orders"),
            where("userId", "==", userId.value),
            orderBy("timestamp", "desc") // Show latest orders first
        );

        const snapshot = await getDocs(q);
        orders.value = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            isExpanded: false
        }));

    } catch (error) {
        console.error("🔥 Error fetching orders:", error);
    } finally {
        loading.value = false;
    }
};

// ✅ **Filter Orders by Active Tab**
const filteredOrders = computed(() => {
    if (activeTab.value === "Faol") {
        return orders.value.filter(order => order.status === "Yangi");
    }
    return orders.value;
});

// ✅ **Toggle Order Expansion**
const toggleOrder = (order) => {
    order.isExpanded = !order.isExpanded;
};

// ✅ **Format Date**
const formatDate = (isoDate) => {
    if (!isoDate) return "Noma'lum sana";
    const date = new Date(isoDate);
    return date.toLocaleString("uz-UZ", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
    });
};

// ✅ **Format Price**
const formatPrice = (price) => {
    if (!price) return "0";
    return parseFloat(price).toLocaleString("uz-UZ", { minimumFractionDigits: 2 });
};

// ✅ **Go Back Function**
const goBack = () => {
    router.push('/');
};

// ✅ **Fetch Orders on Page Load**
onMounted(fetchOrders);
</script>

<style scoped>
button {
    cursor: pointer;
}
</style>

