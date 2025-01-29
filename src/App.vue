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
  showLogin.value = false;
};
</script>

<template>
  <div>
    <!-- Login Modal (Only Shows If User Hasn't Logged In) -->
   
      <LoginModal v-if="showLogin" @login-success="handleLoginSuccess" />
  

    <!-- Main Application (Only Shows After Login) -->
    <transition name="fade">
      <router-view v-if="!showLogin" v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </transition>
  </div>
</template>

<style scoped>
/* Smooth Slide-Up Transition for Login */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.2s ease-in-out, opacity 0.2s;
}

.slide-up-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.slide-up-leave-to {
  transform: translateY(100%);
  opacity: 0;
}

/* Smooth Fade Transition for Main App */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
