<script setup lang="ts">
import SidebarProvider from "./ui/sidebar/SidebarProvider.vue";
</script>

<template>
  <SidebarProvider
    ><div class="mx-2 flex w-screen justify-between p-2">
      <div class="min-w-0 flex-1">
        <h2
          class="text-2xl/7 font-bold text-black sm:truncate sm:text-3xl sm:tracking-tight"
        >
          Back End Developer
        </h2>
        <div
          class="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6"
        ></div>
      </div>
      <div class="mt-5 flex lg:mt-0 lg:ml-4">
        <User />
      </div>
    </div>
  </SidebarProvider>
</template>
