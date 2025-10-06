<script setup lang="ts">
import AddItemForm from "@/components/AddItemForm.vue";
import HomePageHeader from "@/components/HomePageHeader.vue";
import ItemCards from "@/components/ItemCards.vue";
import Input from "@/components/ui/input/Input.vue";
import { useDebounceFn } from "@vueuse/core";
import { Search } from "lucide-vue-next";
import { ref } from "vue";
import { searchUserByEmail, addUserToWarehouse, removeUserFromWarehouse } from "@/api.admin";

const searchQuery = ref("");
const onSearch = useDebounceFn(() => {
  if (searchQuery.value.trim() === "") {
    return;
  }
}, 500);

// Admin user management logic
const userEmail = ref("");
const foundUser = ref<any>(null);
const warehouseId = ref(""); // Set this to the current warehouse id as needed
const addRole = ref("LOGISTIC");
const addUserMessage = ref("");
const removeUserMessage = ref("");

async function handleSearchUser() {
  addUserMessage.value = "";
  removeUserMessage.value = "";
  try {
    const { data } = await searchUserByEmail(userEmail.value);
    foundUser.value = data.user;
  } catch (err: any) {
    foundUser.value = null;
    addUserMessage.value = err?.response?.data?.message || "User not found";
  }
}

async function handleAddUser() {
  addUserMessage.value = "";
  try {
    await addUserToWarehouse(userEmail.value, warehouseId.value, addRole.value);
    addUserMessage.value = "User added to warehouse.";
  } catch (err: any) {
    addUserMessage.value = err?.response?.data?.message || "Failed to add user.";
  }
}

async function handleRemoveUser() {
  removeUserMessage.value = "";
  try {
    await removeUserFromWarehouse(userEmail.value, warehouseId.value);
    removeUserMessage.value = "User removed from warehouse.";
  } catch (err: any) {
    removeUserMessage.value = err?.response?.data?.message || "Failed to remove user.";
  }
}
</script>

<template>
  <div class="hide-scrollbar hide-scrollbar flex h-screen w-screen flex-col overflow-auto">
    <HomePageHeader />
    <main class="flex-1">
      <div class="border-muted-foreground/10 mt-2 flex items-center gap-4 px-6 py-4">
        <div class="relative w-full max-w-sm items-center">
          <Input v-model="searchQuery" @input="onSearch" id="search" type="text" placeholder="Search..."
            class="pl-10 focus:border-transparent focus:ring-0 focus:outline-none" />
          <span class="absolute inset-y-0 start-0 flex items-center justify-center px-2">
            <Search class="text-muted-foreground size-6" />
          </span>
        </div>
      </div>
      <!-- Admin user management UI -->
      <div class="p-4 border rounded mb-4 max-w-xl mx-auto">
        <h2 class="font-bold mb-2">Warehouse User Management</h2>
        <div class="flex gap-2 mb-2">
          <Input v-model="userEmail" placeholder="User email" class="flex-1" />
          <button @click="handleSearchUser" class="px-3 py-1 bg-blue-500 text-white rounded">Search</button>
        </div>
        <div v-if="foundUser" class="mb-2">
          <div>User: {{ foundUser.firstName }} {{ foundUser.lastName }} ({{ foundUser.email }})</div>
        </div>
        <div class="flex gap-2 mb-2">
          <Input v-model="warehouseId" placeholder="Warehouse ID" class="flex-1" />
        </div>
        <div class="flex gap-2 mb-2">
          <select v-model="addRole" class="border rounded px-2 py-1">
            <option value="ADMIN">Admin</option>
            <option value="LOGISTIC">Logistic</option>
          </select>
          <button @click="handleAddUser" class="px-3 py-1 bg-green-500 text-white rounded">Add User</button>
          <button @click="handleRemoveUser" class="px-3 py-1 bg-red-500 text-white rounded">Remove User</button>
        </div>
        <div v-if="addUserMessage" class="text-green-600">{{ addUserMessage }}</div>
        <div v-if="removeUserMessage" class="text-red-600">{{ removeUserMessage }}</div>
      </div>
      <AddItemForm />
      <ItemCards :query="searchQuery" />
    </main>
  </div>
</template>
