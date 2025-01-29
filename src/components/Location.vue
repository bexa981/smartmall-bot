<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { MapPinIcon } from '@heroicons/vue/24/outline';

const { t } = useI18n();

const isMapOpen = ref(false);
const isAddressFormOpen = ref(false);
const selectedLocation = ref(localStorage.getItem('selectedAddress') || t('location.selectAddress'));
const addressDetails = ref({
  address: '',
  entrance: '',
  floor: '',
  room: '',
  courierNote: '',
  name: ''
});

// Load saved address on mount
onMounted(() => {
  const savedAddress = localStorage.getItem('selectedAddress');
  if (savedAddress) {
    selectedLocation.value = savedAddress;
  }
});

const toggleMap = () => {
  isMapOpen.value = !isMapOpen.value;
  isAddressFormOpen.value = false;
};

const openAddressForm = () => {
  isMapOpen.value = false;
  isAddressFormOpen.value = true;
};

const confirmAddress = () => {
  selectedLocation.value = addressDetails.value.address;
  localStorage.setItem('selectedAddress', addressDetails.value.address);
  isAddressFormOpen.value = false;
};
</script>

<template>
  <div class="relative">
    <!-- Clickable Location Button -->
    <button @click="toggleMap" class="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-200 transition">
      <span class="text-green-800 font-medium">{{ selectedLocation }}</span>
      <MapPinIcon class="w-5 h-5 text-green-800 ml-2" />
    </button>
    
    <!-- Map Modal -->
    <transition name="fade">
      <div v-if="isMapOpen" class="fixed inset-0 bg-black/50 flex z-10 items-center justify-center" @click.self="toggleMap">
        <div class="bg-white p-5 shadow-lg w-11/12 md:w-3/4 h-3/4 relative rounded-lg">
          <button @click="toggleMap" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">❌</button>
          <h2 class="text-lg font-semibold mb-4">{{ t('location.selectAddress') }}</h2>
          <iframe 
            class="w-full h-64 rounded-lg" 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243647.46020438958!2d69.13928220360813!3d41.2994957615177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b547012c3c7%3A0x9894f6b4c4df32c4!2sTashkent%2C%20Uzbekistan!5e0!3m2!1sen!2sus!4v1644626475365!5m2!1sen!2sus" 
            allowfullscreen>
          </iframe>
          <button @click="openAddressForm" class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg">{{ t('location.continue') }}</button>
        </div>
      </div>
    </transition>
    
    <!-- Address Form Modal -->
    <transition name="fade">
      <div v-if="isAddressFormOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" @click.self="toggleMap">
        <div class="bg-white p-5 rounded-lg shadow-lg w-11/12 md:w-3/4 relative">
          <button @click="toggleMap" class="absolute top-3 right-3 text-gray-500 hover:text-gray-700">❌</button>
          <h2 class="text-lg font-semibold mb-4">{{ t('location.deliveryAddress') }}</h2>
          <input v-model="addressDetails.address" type="text" :placeholder="t('location.enterAddress')" class="w-full p-2 border rounded mb-2">
          <div class="grid grid-cols-3 gap-2">
            <input v-model="addressDetails.entrance" type="text" :placeholder="t('location.entrance')" class="p-2 border rounded">
            <input v-model="addressDetails.floor" type="text" :placeholder="t('location.floor')" class="p-2 border rounded">
            <input v-model="addressDetails.room" type="text" :placeholder="t('location.room')" class="p-2 border rounded">
          </div>
          <input v-model="addressDetails.courierNote" type="text" :placeholder="t('location.courierNote')" class="w-full p-2 border rounded mt-2">
          <input v-model="addressDetails.name" type="text" :placeholder="t('location.addressName')" class="w-full p-2 border rounded mt-2">
          <button @click="confirmAddress" class="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg">{{ t('location.confirm') }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
