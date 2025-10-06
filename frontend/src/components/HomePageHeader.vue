<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";
import { Warehouse } from "lucide-vue-next";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { RouterLink, useRoute } from "vue-router";
import ProfileSideBar from "./ProfileSideBar.vue";
import Button from "./ui/button/Button.vue";

const userStore = useUserStore();
const { fullName, isAdmin } = storeToRefs(userStore);

const route = useRoute();

// compute the button text based on the route
const adminButtonText = computed(() => {
  if (route.path === "/") return "Admin Panel";
  if (route.path === "/admin") return "Employee Dashboard";
  return "Dashboard";
});

// compute the route to go to when button clicked
const adminButtonLink = computed(() => {
  if (route.path === "/") return "/admin";
  if (route.path === "/admin") return "/";
  return "/";
});
</script>

<template>
  <header
    class="mx-auto flex h-20 w-screen items-center justify-between bg-gray-50 px-4 font-sans shadow-sm sm:px-6 lg:px-8"
  >
    <div class="flex items-center gap-4">
      <Warehouse class="h-8 w-8 text-teal-700 lg:h-11 lg:w-11" />
      <h2 class="text-3xl font-bold text-gray-900">Warehouse</h2>
    </div>
    <div
      class="flex items-center gap-3 text-center font-extrabold text-gray-900 lg:gap-6 lg:text-4xl"
    >
      <Button v-if="isAdmin" variant="outline" size="sm">
        <RouterLink :to="adminButtonLink">{{ adminButtonText }}</RouterLink>
      </Button>
      <p>{{ fullName }}</p>
      <ProfileSideBar />
    </div>
  </header>
</template>
