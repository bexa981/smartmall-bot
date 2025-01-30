<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import {XMarkIcon , GlobeAltIcon,PhoneIcon, UserIcon ,ClipboardDocumentCheckIcon ,ExclamationCircleIcon, HeartIcon, MapPinIcon,BellAlertIcon} from '@heroicons/vue/24/outline'
import {ArrowLeftEndOnRectangleIcon} from '@heroicons/vue/24/solid'
const router = useRouter();
const { t } = useI18n();
const emit = defineEmits(['closeMenu']);

// **🔹 Navigation function**
const navigateTo = (path) => {
  router.push(path);
  emit('closeMenu'); // Close menu after clicking
};

// **🔹 Exit function (Logs user out)**
const logoutAndRedirect = () => {
  // Clear user data (Optional)
  localStorage.removeItem("userPhone");
  localStorage.removeItem("userName");
  location.reload();
  // Redirect to Login page
//   router.push('/login');
};
</script>

<template>
  <div class="fixed left-0 top-0 w-72 h-full bg-white shadow-lg p-5 flex z-10 flex-col">
    <!-- Close Button -->
    <button @click="emit('closeMenu')" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
      <XMarkIcon class="w-6  h-6 hover:bg-gray-100 rounded cursor-pointer transition"/> 
    </button>

    <!-- Menu Items -->
    <nav class="mt-8 space-y-4">
      <button @click="navigateTo('/personal-settings')" class="menu-item">
        <span><UserIcon class="w-5 h-5"/></span> <span>{{ t('menu.personalInfo') }}</span>
      </button>
      <button @click="navigateTo('/orders')" class="menu-item">
        <span><ClipboardDocumentCheckIcon class="w-5 h-5"/></span> <span>{{ t('menu.orders') }}</span>
      </button>
      <button @click="navigateTo('/favorites')" class="menu-item">
        <span><HeartIcon class="w-5 h-5"/></span> <span>{{ t('menu.favorites') }}</span>
      </button>
      <button @click="navigateTo('/addresses')" class="menu-item">
        <span><MapPinIcon class="w-5 h-5"/></span> <span>{{ t('menu.addresses') }}</span>
      </button>
      <button @click="navigateTo('/notifications')" class="menu-item">
        <span><BellAlertIcon class="w-5 h-5"/></span> <span>{{ t('menu.notifications') }}</span>
      </button>
      <button @click="navigateTo('/language')" class="menu-item">
        <span><GlobeAltIcon class="w-5 h-5"/></span> <span>{{ t('menu.language') }}</span>
      </button>
      <button @click="navigateTo('/about-us')" class="menu-item">
        <span><ExclamationCircleIcon class="w-5 h-5"/></span> <span>{{ t('menu.aboutUs') }}</span>
      </button>
    </nav>

    <!-- Contact Info -->
    <div class="mt-4 bg-gray-100 p-3 rounded-lg flex items-center space-x-3">
      <span><PhoneIcon class="w-5 h-5"/></span>
      <div>
        <p class="text-gray-600 text-sm">{{ t('menu.contactUs') }}</p>
        <p class="text-lg font-semibold">+998978100404</p>
      </div>
    </div>

    <!-- Exit Button -->
    <button @click="logoutAndRedirect" class="logout-button flex items-center justify-center gap-3">
        <ArrowLeftEndOnRectangleIcon class="w-5 h-5"/> {{ t('menu.logout') }}
    </button>

    <p class="text-sm mt-10">Yaratuvchi: 
      <a href="https://t.me/Mustafayevbexruz" class="text-blue-900">Mustafayev Bexruz</a>
    </p>
  </div>
</template>

<style scoped>
.menu-item {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  text-align: left;
  padding: 12px;
  border-radius: 8px;
  background: none;
  border: none;
  color: #374151;
  font-size: 16px;
  transition: background 0.3s;
}

.menu-item:hover {
  background-color: #f3f4f6;
}

/* 🔹 Exit Button */
.logout-button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

.logout-button:hover {
  background-color: #dc2626;
}
</style>


