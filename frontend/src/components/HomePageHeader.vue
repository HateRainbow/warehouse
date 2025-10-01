<script setup lang="ts">
import { Warehouse } from "lucide-vue-next";
import ProfileSideBar from "./ProfileSideBar.vue";
</script>

<template>
  <header
    class="mx-auto flex h-16 w-screen items-center justify-between bg-gray-50 px-4 font-sans shadow-sm sm:px-6 lg:px-8"
  >
    <div class="flex items-center gap-4">
      <Warehouse class="h-8 w-8 text-teal-700 lg:h-11 lg:w-11" />
      <h2 class="text-3xl font-bold text-gray-900">Warehouse</h2>
    </div>
    <div
      class="text-1xl flex items-center justify-center gap-3 text-center font-extrabold text-gray-900 lg:gap-6 lg:text-4xl"
    >
      <p>Pial Al Mamun</p>
      <ProfileSideBar />
    </div>
  </header>
</template>
