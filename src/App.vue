<script setup>
import { RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';
import LoginModal from './views/Login.vue';

const showLogin = ref(true);

onMounted(() => {
  // Check if the user has already entered their phone number
  if (localStorage.getItem("userPhone")) {
    showLogin.value = false; // Hide login if already logged in
  }
});

const handleLoginSuccess = () => {
  showLogin.value = false; // Hide login modal after login
  location.reload();
};
</script>

<template>
  <div>
    <!-- 🔹 Login Modal (Shows Only If User Hasn't Logged In) -->
    <LoginModal v-if="showLogin" @login-success="handleLoginSuccess" />

    <!-- 🔹 Main Application (Shows After Login) -->
    <router-view v-if="!showLogin" v-slot="{ Component }">
      <transition name="fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped>
/* 🔹 Smooth Slide-Up Transition for Login */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease-in-out, opacity 0.3s;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* 🔹 Smooth Fade Transition for Main App */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

