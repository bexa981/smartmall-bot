<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedAddress = ref("");

onMounted(() => {
    // Simulate map selection (replace this with an actual map implementation)
    setTimeout(() => {
        selectedAddress.value = "Tashkent, Amir Temur Avenue 108";
    }, 2000);
});

// Save address and return
const saveAddress = () => {
    let addresses = JSON.parse(localStorage.getItem("savedAddresses")) || [];
    addresses.push(selectedAddress.value);
    localStorage.setItem("savedAddresses", JSON.stringify(addresses));
    router.push('/addresses'); // Navigate back
};
</script>

<template>
    <div class="p-3">
        <h2 class="text-lg font-bold text-center">Manzilni tanlang</h2>
        <div class="mt-6 bg-gray-100 p-10 text-center rounded-lg">
            <p v-if="!selectedAddress">Joylashuv tanlanmoqda...</p>
            <p v-else class="text-green-700 font-semibold">{{ selectedAddress }}</p>
        </div>
        <button v-if="selectedAddress" @click="saveAddress"
            class="mt-4 w-full bg-indigo-600 text-white py-3 rounded-lg text-center">
            Manzilni saqlash
        </button>
    </div>
</template>
