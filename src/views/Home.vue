<script setup>
import { ref, computed } from 'vue';
import '../assets/tailwind.css';
import Account from '../components/Account.vue';
// import Location from '../components/Location.vue';
import Support from '../components/Support.vue';
import Search from '../components/Search.vue';
import Category from '../components/Category.vue';
import Products from '../components/Products.vue';
import MenuCategory from '../components/MenuCategory.vue';
import TotalPrice from '../components/TotalPrice.vue';

const search = ref('');
const categories = ref(["Вытяжки", "Duxovkalar", "Mikrovolnovkalar", "Muzlatgichlar"]);
const selectedCategory = ref("Вытяжки");
const products = ref([]);
</script>

<template>
  <div class="p-2 bg-white-50 min-h-screen">
    <nav class="flex justify-between items-center">
      <Account />
      <!-- <Location /> -->
      <h2 class="text-green-800 text-2xl smartm font-bold">Smartmall</h2>
      <Support />
    </nav>

    <main class="flex flex-col">
      <Search v-model="search" />
      <Category :categories="categories" v-model:selectedCategory="selectedCategory" />
      <Products :products="products" :selectedCategory="selectedCategory" :search="search" />
      <MenuCategory />
      <TotalPrice />
    </main>

  </div>
</template>

<style scoped>
.smartm {
  font-family: "Righteous", serif;
}
</style>
