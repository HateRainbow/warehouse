<script setup lang="ts">
import api from "@/api";
import AddItemForm from "@/components/AddItemForm.vue";
import HomePageHeader from "@/components/HomePageHeader.vue";
import ItemCards from "@/components/ItemCards.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import CardHeader from "@/components/ui/card/CardHeader.vue";
import CardTitle from "@/components/ui/card/CardTitle.vue";
import Input from "@/components/ui/input/Input.vue";
import { useDebounceFn } from "@vueuse/core";
import { Search } from "lucide-vue-next";
import { computed, ref } from "vue";
import { useRoute } from "vue-router";

const searchQuery = ref("");
const onSearch = useDebounceFn(() => {
  if (searchQuery.value.trim() === "") {
    return;
  }
}, 500);
</script>

<template>
  <div class="flex h-screen w-screen flex-col overflow-hidden">
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
      <AddItemForm />
      <ItemCards :query="searchQuery" />
    </main>
  </div>
</template>
