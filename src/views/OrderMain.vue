<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase"; // Ensure Firebase is correctly imported
import { ChevronLeftIcon, CreditCardIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/vue/24/solid';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const router = useRouter();

const showPaymentModal = ref(false);
const selectedPaymentMethod = ref(localStorage.getItem('selectedPaymentMethod') || '');
const orderType = ref('Yetkazib berish');
const totalPrice = ref(parseFloat(localStorage.getItem('totalCartPrice')) || 0);
const userId = ref(localStorage.getItem('userId') || generateUserId()); // Unique User ID

// Load cart items from localStorage
const cartItems = ref(JSON.parse(localStorage.getItem('cartItems')) || []);

// **User Name & Phone Number Fields**
const userName = ref(localStorage.getItem('userName') || "Noma'lum foydalanuvchi");
const userPhone = ref(localStorage.getItem('userPhone') || "Noma'lum telefon");
// Generate a unique user ID
function generateUserId() {
    const id = 'user-' + Math.floor(Math.random() * 1000000);
    localStorage.setItem('userId', id);
    return id;
}
// **Save User Info to LocalStorage**

// **Save Payment Method to LocalStorage**
watch(selectedPaymentMethod, (newValue) => {
    localStorage.setItem('selectedPaymentMethod', newValue);
});

// **Confirm Order & Save to Firestore**
const confirmOrder = async () => {
    if (!selectedPaymentMethod.value) {
        alert('Iltimos, toʻlov usulini tanlang!');
        return;
    }
    if (!userName.value || !userPhone.value) {
        alert('Iltimos, ismingiz va telefon raqamingizni kiriting!');
        return;
    }

    const orderData = {
        userId: userId.value,
        orderType: orderType.value,
        userName: userName.value,
        userPhone: userPhone.value,
        paymentMethod: selectedPaymentMethod.value,
        totalPrice: totalPrice.value,
        cartItems: cartItems.value,
        timestamp: new Date().toISOString()
    };

    try {
        // Save order to Firestore
        await addDoc(collection(db, "orders"), orderData);
        // console.log("✅ Order saved to Firestore:", orderData);

        // Send order details to Telegram
        sendOrderToTelegram(orderData);

        alert('Buyurtma tasdiqlandi!');
        
        // Clear cart & order details
   
        localStorage.removeItem('cartItems');
        localStorage.removeItem('totalCartPrice');
        localStorage.removeItem('selectedPaymentMethod');

        router.push('/'); // Navigate to Home
    } catch (error) {
        console.error("🔥 Error saving order:", error.message);
        alert("Buyurtma saqlashda xatolik yuz berdi.");
    }
};

// **Send Order Details to Telegram**
const sendOrderToTelegram = async (order) => {
    const TELEGRAM_BOT_TOKEN = "7545687507:AAG_TGgNnbRQ9S19EPBdSuIpQ59ZWJ5uLfg"; // Replace with your bot token
    const TELEGRAM_CHAT_ID = "-4796888041"; // Replace with your group ID

    let message = `📦 *Yangi Buyurtma*\n\n`;
    message += `🆔 *User ID:* ${order.userId}\n`;
    message += `👤 *Foydalanuvchi:* ${order.userName}\n`;
    message += `📞 *Telefon:* ${order.userPhone}\n`;
    message += `📍 *Buyurtma turi:* ${order.orderType}\n`;
    message += `💳 *To'lov usuli:* ${order.paymentMethod}\n`;
    message += `💰 *Umumiy narx:* ${order.totalPrice.toLocaleString()} UZS\n\n`;

    message += `🛒 *Buyurtma Tafsilotlari:*\n`;
    order.cartItems.forEach((item, index) => {
        message += `\n${index + 1}. 🏷 *${item.name}*\n`;
        message += `   🖼 [Rasm](${item.image})\n`;
        message += `   💲 *Narxi:* ${item.price} $\n`;
        message += `   🔢 *Soni:* ${item.quantity}\n`;
    });

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const payload = {
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "Markdown",
        disable_web_page_preview: true
    };

    try {
        await fetch(telegramUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
        console.log("✅ Order sent to Telegram");
    } catch (error) {
        console.error("🔥 Error sending message to Telegram:", error.message);
    }
};

// **Open & Close Payment Modal**
const openPaymentModal = () => { showPaymentModal.value = true; };
const closePaymentModal = () => { showPaymentModal.value = false; };

// **Select Payment Method**
const selectPaymentMethod = (method) => {
    selectedPaymentMethod.value = method;
    showPaymentModal.value = false;
};
</script>

<template>
    <div class="p-4">
        <!-- Header -->
        <div class="flex items-center mb-4">
            <button @click="router.push('/')" class="p-2 border rounded border-gray-300">
                <ChevronLeftIcon class="w-6 h-6 text-gray-700" />
            </button>
            <h2 class="text-lg font-bold flex-grow text-center">Buyurtmani rasmiylashtirish</h2>
        </div>

        <!-- Order Type -->
        <h3 class="text-md font-semibold">Buyurtma turi</h3>
        <div class="mt-2 space-y-2">
            <div @click="orderType = 'Yetkazib berish'" class="p-3 border-none bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
                :class="{ 'bg-green-100 border border-green-600': orderType === 'Yetkazib berish' }">
                <p class="font-semibold">Yetkazib berish</p>
                <input type="radio" v-model="orderType" value="Yetkazib berish" class="w-5 h-5">
            </div>
            <div @click="orderType = 'Olib ketish'" class="p-3 border-none bg-gray-100 rounded-lg flex justify-between items-center cursor-pointer"
                :class="{ 'bg-green-100 border border-green-600': orderType === 'Olib ketish' }">
                <p class="font-semibold">Olib ketish</p>
                <input type="radio" v-model="orderType" value="Olib ketish" class="w-5 h-5">
            </div>
        </div>

        <!-- Payment Method -->
        <div class="mt-4">
            <button @click="openPaymentModal"
                class="flex items-center gap-2 w-full p-3 border-none rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition">
                <CreditCardIcon class="w-5 h-5 text-gray-700" />
                <span class="text-gray-700">{{ selectedPaymentMethod ? selectedPaymentMethod : t('order.selectPaymentMethod') }}</span>
                <ChevronRightIcon class="w-6 h-6 text-gray-500 absolute right-7" />
            </button>
        </div>
        <transition name="slide-up">
            <div v-if="showPaymentModal" class="fixed inset-0 bg-black/50 flex items-end z-50">
                <div class="bg-white w-full rounded-t-2xl p-5 shadow-lg">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-[22px] text-green-800 font-bold">Toʻlov usulini tanlang</h2>
                        <button @click="closePaymentModal" class="text-gray-500 hover:text-gray-700">
                            <XMarkIcon class="w-6 h-6" />
                        </button>
                    </div>
                    <div class="space-y-3">
                        <button @click="selectPaymentMethod('Naqd pul')" class="w-full flex items-center justify-between shadow cursor-pointer gap-5 p-3 bg-gray-100 rounded-lg">Naqd pul orqali to'lash <img class="w-12" src="../assets/icons/dollars.png" alt=""></button>
                        <button @click="selectPaymentMethod('Karta')" class="w-full flex items-center justify-between shadow cursor-pointer gap-5 p-3 bg-gray-100 rounded-lg">Karta orqali to'lash <img class="w-11" src="../assets/icons/atm-card.png" alt=""></button>
                    </div>
                </div>
            </div>
        </transition>
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
/* Ensure smooth UI */
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
