<script setup>
import { ref, computed } from 'vue';
import '../assets/tailwind.css';
import Account from '../components/Account.vue';
import Location from '../components/Location.vue';
import Support from '../components/Support.vue';
import Search from '../components/Search.vue';
import Category from '../components/Category.vue';
import Products from '../components/Products.vue';
import MenuCategory from '../components/MenuCategory.vue';
import TotalPrice from '../components/TotalPrice.vue';

const search = ref('');
const categories = ref(["Вытяжки", "Duxovkalar", "Mikrovolnovkalar", "Muzlatgichlar"]);
const selectedCategory = ref("Вытяжки");
const products = ref([
  { name: "Кухонная вытяжка Artel-1160", price: "1,800,000", image: "https://via.placeholder.com/150", category: "Вытяжки" },
  { name: "Микроволновка Samsung", price: "2,500,000", image: "https://via.placeholder.com/150", category: "Mikrovolnovkalar" }
]);
</script>

<template>
  <div class="p-4 bg-white-50 min-h-screen">
    <nav class="flex justify-between items-center">
      <Account />
      <Location />
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

<style scoped></style>
