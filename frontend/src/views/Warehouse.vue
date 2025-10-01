<script setup lang="ts">
import HomePageHeader from "@/components/HomePageHeader.vue";
import Input from "@/components/ui/input/Input.vue";
import { Search } from "lucide-vue-next";
</script>

<template>
  <div class="flex h-screen w-screen flex-col">
    <HomePageHeader />

    <div
      class="border-muted-foreground/10 mt-2 flex items-center gap-4 px-6 py-4"
    >
      <div class="relative w-full max-w-sm items-center">
        <Input
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
  </div>
</template>
