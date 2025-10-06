<script setup lang="ts">
import api from "@/api";
import { defineProps } from "vue";
import Button from "./ui/button/Button.vue";

const props = defineProps<{
  id: string;
  onUpdated?: () => void;
}>();

async function deleteItem(id: string) {
  try {
    await api.delete(`/api/auth/item/${props.id}`);
    props.onUpdated?.();
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}
</script>

<template>
  <Button
    class="cursor-pointer"
    @click="deleteItem(id)"
    variant="outline"
    size="sm"
  >
    Delete
  </Button>
</template>
