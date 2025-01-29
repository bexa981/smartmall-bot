<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import CategoryIcon from '../assets/icons/category.png';
const router = useRouter();

const categories = ref([
    { name: "Вытяжки", image: CategoryIcon },
    { name: "Duxovkalar", image: CategoryIcon },
    { name: "Микроволновки", image: CategoryIcon },
    { name: "Konditsionerlar", image: CategoryIcon }
]);

const scrollContainer = ref(null);

onMounted(() => {
    if (scrollContainer.value) {
        // Enable horizontal scrolling with mouse wheel
        scrollContainer.value.addEventListener("wheel", (event) => {
            event.preventDefault();
            scrollContainer.value.scrollLeft += event.deltaY;
        });

        // Enable touch scrolling for mobile devices
        let isDown = false;
        let startX;
        let scrollLeft;

        scrollContainer.value.addEventListener("mousedown", (e) => {
            isDown = true;
            scrollContainer.value.classList.add("active");
            startX = e.pageX - scrollContainer.value.offsetLeft;
            scrollLeft = scrollContainer.value.scrollLeft;
        });

        scrollContainer.value.addEventListener("mouseleave", () => {
            isDown = false;
            scrollContainer.value.classList.remove("active");
        });

        scrollContainer.value.addEventListener("mouseup", () => {
            isDown = false;
            scrollContainer.value.classList.remove("active");
        });

        scrollContainer.value.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.value.offsetLeft;
            const walk = (x - startX) * 2; // Adjust scroll speed
            scrollContainer.value.scrollLeft = scrollLeft - walk;
        });
    }
});

// Navigate to category detail page
const goToCategoryDetail = (categoryName) => {
    router.push({
        name: 'CategoryDetail',
        query: { category: categoryName }
    });
};
</script>

<template>
    <div class="relative">
        <!-- Scrollable Container -->
        <div ref="scrollContainer"
            class="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2 cursor-grab active:cursor-grabbing">
            <div v-for="(category, index) in categories" :key="index"
                class="flex flex-col items-center snap-center cursor-pointer" @click="goToCategoryDetail(category.name)">
                <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img :src="category.image" alt="Category Image" class="w-full h-full object-cover rounded-lg" />
                </div>
                <span class="text-sm text-center mt-2 whitespace-nowrap">{{ category.name }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}

/* Enable smooth touch-based scrolling */
.cursor-grab {
    cursor: grab;
}

.cursor-grabbing {
    cursor: grabbing;
}
</style>
