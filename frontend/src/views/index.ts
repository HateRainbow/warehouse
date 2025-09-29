import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "./SignupPage.vue";
import WareHouse from "./Warehouse.vue";
import AdminPanel from "./AdminPanel.vue";
import api from "@/api";
import LoginPage from "./LoginPage.vue";
import TwoFactorSetup from "./TwoFactorSetup.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/signup",
      component: SignupPage,
    },
    { path: "/login", component: LoginPage },

    {
      path: "/",
      beforeEnter: async (to, from, next) => {
        try {
          const { status } = await api.get("/api/auth");

          if (status !== 200) {
            next("/login");
          }
          next();
        } catch (error) {
          next("/login");
        }
      },
      children: [
        { path: "", component: WareHouse },
        { path: "admin", component: AdminPanel },
        { path: "setup-2fa", component: TwoFactorSetup },
      ],
    },
  ],
});

export default router;
