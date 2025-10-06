<script setup lang="ts">
import api from "@/api";
import HomePageHeader from "@/components/HomePageHeader.vue";
import ItemCards from "@/components/ItemCards.vue";
import Input from "@/components/ui/input/Input.vue";
import { useUserStore } from "@/stores/user-store";
import { useDebounceFn } from "@vueuse/core";
import { Search } from "lucide-vue-next";
import { onMounted, ref } from "vue";

const userStore = useUserStore();
const searchQuery = ref("");
const onSearch = useDebounceFn(() => {
  if (searchQuery.value.trim() === "") {
    return;
  }
}, 500);

onMounted(async () => {
  const { data } = await api.get<{
    message: string;
    user: {
      firstName: string;
      lastName: string;
      isAdmin: boolean;
      email: string;
    };
  }>("/api/auth/user-info");

  userStore.setUser({
    firstName: data.user.firstName,
    lastName: data.user.lastName,
    isAdmin: data.user.isAdmin,
    email: data.user.email,
  });
});
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-auto">
    <HomePageHeader />
    <main class="flex-1 overflow-auto">
      <div
        class="border-muted-foreground/10 mt-2 flex items-center gap-4 px-6 py-4"
      >
        <div class="relative w-full max-w-sm items-center">
          <Input
            v-model="searchQuery"
            @input="onSearch"
            id="search"
            type="text"
            placeholder="Search..."
            class="pl-10 focus:border-transparent focus:ring-0 focus:outline-none"
          />
          <span
            class="absolute inset-y-0 start-0 flex items-center justify-center px-2"
          >
            <Search class="text-muted-foreground size-6" />
          </span>
        </div>
      </div>
      <ItemCards :query="searchQuery" />
    </main>
  </div>
</template>
