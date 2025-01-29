<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ChevronLeftIcon, CreditCardIcon, TagIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';

const showPaymentModal = ref(false);
const selectedPaymentMethod = ref(null);
const { t } = useI18n();
const router = useRouter();
const orderType = ref('delivery');
const address = ref('Toshkent, Fotografia 3...');
const entrance = ref('12');
const floor = ref('21');
const room = ref('21');
const courierNote = ref('21');
const paymentMethod = ref('');
const promoCode = ref('');
const totalPrice = ref(1800000);

const confirmOrder = () => {
    alert('Buyurtma tasdiqlandi!');
};

const openPaymentModal = () => {
    showPaymentModal.value = true;
};
const closePaymentModal = () => {
    showPaymentModal.value = false;
};

// Select Payment Method
const selectPaymentMethod = (method) => {
    selectedPaymentMethod.value = method;
    showPaymentModal.value = false;
};
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center mb-4">
            <button @click="router.push('/')" class="p-2">
                <ChevronLeftIcon class="w-6 h-6 text-gray-700" />
            </button>
            <h2 class="text-lg font-bold flex-grow text-center">Buyurtmani rasmiylashtirish</h2>
        </div>

        <!-- Order Type -->
        <h3 class="text-md font-semibold">Buyurtma turi</h3>
        <div class="mt-2 space-y-2">
            <div @click="orderType = 'delivery'" class="p-3 border rounded-lg flex justify-between items-center cursor-pointer" :class="{'bg-green-100 border-green-600': orderType === 'delivery'}">
                <div>
                    <p class="font-semibold">Yetkazib berish</p>
                    <p class="text-sm text-gray-600">Buyurtmangizni o‘zimiz yetkazib beramiz.</p>
                </div>
                <input type="radio" v-model="orderType" value="delivery" class="w-5 h-5">
            </div>
            <div @click="orderType = 'pickup'" class="p-3 border rounded-lg flex justify-between items-center cursor-pointer" :class="{'bg-gray-100': orderType === 'pickup'}">
                <div>
                    <p class="font-semibold">Olib ketish</p>
                    <p class="text-sm text-gray-600">O‘zingizga eng yaqin filialdan olib ketishingiz mumkin.</p>
                </div>
                <input type="radio" v-model="orderType" value="pickup" class="w-5 h-5">
            </div>
        </div>

        <!-- Address Selection -->
        <div v-if="orderType === 'delivery'" class="mt-4">
            <h3 class="text-md font-semibold">Yetkazish manzili</h3>
            <div class="p-3 border rounded-lg flex flex-col gap-2 mt-2">
                <p class="font-semibold">{{ address }}</p>
                <div class="grid grid-cols-3 gap-2 text-sm">
                    <p><strong>Kirish yoʻlagi:</strong> {{ entrance }}</p>
                    <p><strong>Qavat:</strong> {{ floor }}</p>
                    <p><strong>Xona:</strong> {{ room }}</p>
                </div>
                <p class="text-sm text-gray-600">Kuryer uchun izoh: {{ courierNote }}</p>
            </div>
        </div>

        <!-- Payment Method -->
        <div class="mt-4">
            <button @click="openPaymentModal" class="flex items-center justify-between w-full p-4 border rounded-lg shadow-md cursor-pointer">
                <div class="flex items-center space-x-3">
                    <span class="text-gray-700">{{ selectedPaymentMethod ? selectedPaymentMethod : t('order.selectPaymentMethod') }}</span>
                </div>
                <XMarkIcon class="w-6 h-6 text-gray-500" />
            </button>
        </div>

        <transition name="slide-up">
            <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 bg-opacity-50 flex items-end z-50">
                <div class="bg-white w-full rounded-t-2xl p-5 shadow-lg">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-lg font-bold">{{ t('order.paymentMethod') }}</h2>
                        <button @click="closePaymentModal" class="text-gray-500 hover:text-gray-700">
                            <XMarkIcon class="w-6 h-6" />
                        </button>
                    </div>

                    <!-- Payment Options -->
                    <div class="grid grid-cols-2 gap-4">
                        <div @click="selectPaymentMethod(t('order.cash'))"
                            class="p-4 border rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-100 transition"
                            :class="{ 'border-green-500': selectedPaymentMethod === t('order.cash') }">
                            <img src="https://cdn-icons-png.flaticon.com/128/2979/2979493.png" class="w-12 h-12" />
                            <p class="mt-2 text-center">{{ t('order.cash') }}</p>
                        </div>
                        <div @click="selectPaymentMethod(t('order.card'))"
                            class="p-4 border rounded-lg flex flex-col items-center cursor-pointer hover:bg-gray-100 transition"
                            :class="{ 'border-green-500': selectedPaymentMethod === t('order.card') }">
                            <img src="https://cdn-icons-png.flaticon.com/128/1236/1236932.png" class="w-12 h-12" />
                            <p class="mt-2 text-center">{{ t('order.card') }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Promo Code -->
        <div class="mt-4">
            <div class="p-3 border rounded-lg flex justify-between items-center cursor-pointer">
                <div class="flex items-center gap-2">
                    <TagIcon class="w-5 h-5 text-gray-700" />
                    <p>Promocode bormi?</p>
                </div>
            </div>
        </div>

        <!-- Total Price & Confirm Button -->
        <div class="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg border-t border-gray-200">
            <div class="flex justify-between items-center mb-2">
                <p class="text-md font-bold">Umumiy</p>
                <p class="text-lg font-bold text-green-800">{{ totalPrice.toLocaleString() }} UZS</p>
            </div>
            <button @click="confirmOrder" class="w-full bg-indigo-900 text-white py-3 rounded-lg text-center">
                Buyurtma berish
            </button>
        </div>
    </div>
</template>

<style scoped>
/* No additional styles needed, Tailwind takes care of styling */
/* Slide-up animation */
.slide-up-enter-active,
.slide-up-leave-active {
    transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
    transform: translateY(100%);
    opacity: 0;
}
</style>
