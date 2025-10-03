import { createRouter, createWebHistory } from "vue-router";
import SignupPage from "./SignupPage.vue";
import WareHouse from "./Warehouse.vue";
import AdminPanel from "./AdminPanel.vue";
import LoginPage from "./LoginPage.vue";
import TwoFactorLogin from "./TwoFactorLogin.vue";
import TwoFactorSetup from "./TwoFactorSetup.vue";
import api from "@/api";
import { useUserStore } from "@/stores/user-store";

async function requireAuth(to: any, from: any, next: any) {
  const userStore = useUserStore(); // ✅ call inside the guard

  try {
    const { status } = await api.get("/api/auth");

    if (status !== 200) return next("/login");

    try {
      const { data } = await api.get<{ message: string; isAdmin: boolean }>(
        "/api/auth/check-admin",
      );
      userStore.setAdmin(data.isAdmin);
    } catch {
      userStore.setAdmin(false);
    }

    next();
  } catch {
    next("/login");
  }
}

async function requireAdmin(to: any, from: any, next: any) {
  try {
    const { status } = await api.get("/api/auth/check-admin");
    if (status !== 200) next("/");
    next();
  } catch {
    next("/");
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/signup", component: SignupPage },
    { path: "/login", component: LoginPage },
    {
      path: "/",
      beforeEnter: requireAuth,
      children: [
        { path: "", component: WareHouse },
        { path: "admin", component: AdminPanel, beforeEnter: requireAdmin },
        { path: "setup-2fa", component: TwoFactorSetup },
        { path: "verify-2fa", component: TwoFactorLogin },
      ],
    },
  ],
});

export default router;
