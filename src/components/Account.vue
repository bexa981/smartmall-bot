<script setup>
import { ref } from 'vue';
import { UserCircleIcon } from '@heroicons/vue/24/solid';
import MenuNav from '../components/MenuNav.vue';

const isMenuOpen = ref(false);
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<template>
  <div class="relative h-[40px]">
    <!-- Clickable User Icon -->
    <button @click="toggleMenu">
      <UserCircleIcon class="w-10 acc-main h-10 text-green-800  cursor-pointer transition duration-300" />
    </button>
    
    <!-- Menu Navigation (Opens on Click) -->
    <transition name="slide">
      <MenuNav v-if="isMenuOpen" @closeMenu="toggleMenu" class="fixed left-0 top-0 w-72 h-full bg-white shadow-lg p-5 flex flex-col" />
    </transition>
  </div>
</template>

<style scoped>
.acc-main{
  background-color: white;
  border-radius: 50%;
}
.slide-enter-active, .slide-leave-active {
  transition: transform 0.3s ease-in-out;
}
.slide-enter-from {
  transform: translateX(-100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>