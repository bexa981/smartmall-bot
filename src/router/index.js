import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import ProductDetail from "../views/ProductDetail.vue";
import CategoryDetail from "../views/CategoryDetail.vue";
import Cart from "../views/Cart.vue";
import SupportChat from "../views/SupportChat.vue";
import SearchDetail from "../views/SearchDetail.vue";
import OrderMain from "../views/OrderMain.vue";
const routes = [
  { path: "/", component: Home },

  {
    path: "/product-detail",
    name: "ProductDetail",
    component: ProductDetail,
    props: (route) => ({
      name: route.query.name,
      price: route.query.price,
      image: route.query.image,
    }),
  },

  {
    path: "/category-detail",
    name: "CategoryDetail",
    component: CategoryDetail,
    props: (route) => ({
      category: route.query.category,
    }),
  },

  {
    path: "/cart",
    name: "Cart",
    component: Cart, // Add Cart.vue page
  },

  {
    path: "/support-chat",
    name: "SupportChat",
    component: SupportChat, // Support chat component
  },

  {
    path: "/search-detail",
    name: "SearchDetail",
    component: SearchDetail,
  },
  {
    path: "/personal-settings",
    name: "PersonalSettings",
    component: () => import("../views/account-info/PersonalSettings.vue"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/account-info/Orders.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("../views/account-info/Favorites.vue"),
  },
  {
    path: "/addresses",
    name: "Addresses",
    component: () => import("../views/account-info/Addresses.vue"),
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("../views/account-info/Notifications.vue"),
  },
  {
    path: "/language",
    name: "Language",
    component: () => import("../views/account-info/Language.vue"),
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("../views/account-info/AboutUs.vue"),
  },
  {
    path: "/map-select",
    name: "MapSelect",
    component: () => import("../views/MapSelect.vue"),
  },
  { path: "/order-main", component: OrderMain },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
