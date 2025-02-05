<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; // Ensure this is correctly set up
import CategoryIcon from '../assets/icons/category.png';

const router = useRouter();
const categories = ref([]);
const scrollContainer = ref(null);

// **Fetch categories from Firestore**
const fetchCategories = async () => {
    try {
        // console.log("Fetching categories...");
        const categoriesSnapshot = await getDocs(collection(db, "categories"));
        categories.value = categoriesSnapshot.docs.map(doc => ({
            id: doc.id,  // Use ID as the category name
            image: doc.data().image || CategoryIcon // Default image if missing
        }));
        // console.log("✅ Categories Fetched:", categories.value);
    } catch (error) {
        console.error("🔥 Firebase Error:", error.message);
    }
};

// **Enable smooth horizontal scrolling**
onMounted(() => {
    fetchCategories();

    if (scrollContainer.value) {
        scrollContainer.value.addEventListener("wheel", (event) => {
            event.preventDefault();
            scrollContainer.value.scrollLeft += event.deltaY;
        });

        let isDown = false;
        let startX, scrollLeft;

        scrollContainer.value.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX - scrollContainer.value.offsetLeft;
            scrollLeft = scrollContainer.value.scrollLeft;
        });

        scrollContainer.value.addEventListener("mouseleave", () => isDown = false);
        scrollContainer.value.addEventListener("mouseup", () => isDown = false);

        scrollContainer.value.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - scrollContainer.value.offsetLeft;
            const walk = (x - startX) * 2;
            scrollContainer.value.scrollLeft = scrollLeft - walk;
        });
    }
});

// **Navigate to category detail page**
const goToCategoryDetail = (categoryId) => {
    router.push({
        name: 'CategoryDetail',
        query: { category: categoryId }
    });
};
</script>

<template>
    <div class="relative">
        <!-- Scrollable Container -->
        <div ref="scrollContainer"
            class="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory py-4 px-2 cursor-grab active:cursor-grabbing">
            <div v-for="category in categories" :key="category.id"
                class="flex cat-main flex-col items-center snap-center cursor-pointer"
                @click="goToCategoryDetail(category.id)">
                
                <div class="w-22 h-20 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    <img :src="category.image" alt="Category Image" class="w-full h-full object-cover rounded-lg" />
                </div>
                <span class="text-sm text-center mt-2 ">{{ category.id }}</span>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Hide scrollbar */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.cat-main{
    box-shadow: 0px 2px 6px rgb(171, 170, 170);
    padding:3px;
    border-radius: 7px;
    height: 120px;
    width: 100px;
    background-color: white;
    transition: .3s;
}
.cat-main:hover{
    box-shadow: 1px 2px 7px gray;
}
.cat-main span{
 width: 100px;
}
/* Enable smooth touch-based scrolling */
.cursor-grab {
    cursor: grab;
}

.cursor-grabbing {
    cursor: grabbing;
}
</style>

