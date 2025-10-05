<script setup lang="ts">
import { defineProps } from "vue";
import api from "@/api";

const props = defineProps<{
    id: string;
}>();

async function deleteItem(id: string) {
    try {
        await api.delete(`/api/auth/admin/delete-item/${props.id}`);
    } catch (error) {
        console.error("Error deleting item:", error);
    }
}
</script>

<template>
    <Button class="cursor-pointer" @click="deleteItem(id)" variant="outline" size="sm">
        Delete
    </Button>
</template>
