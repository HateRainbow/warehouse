<script setup lang="ts">
import HomePageHeader from "@/components/HomePageHeader.vue";
import SideBar from "@/components/PageSideBar.vue";
import SidebarProvider from "@/components/ui/sidebar/SidebarProvider.vue";
</script>

<template>
  <div class="flex min-h-screen w-screen">
    <SidebarProvider>
      <SideBar />
      <HomePageHeader />
    </SidebarProvider>
  </div>
</template>
