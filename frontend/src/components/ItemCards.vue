<script setup lang="ts">
import { onMounted, defineProps, ref, watch, computed } from "vue";
import Card from "./ui/card/Card.vue";
import CardHeader from "./ui/card/CardHeader.vue";
import CardTitle from "./ui/card/CardTitle.vue";
import { Package } from "lucide-vue-next";
import CardDescription from "./ui/card/CardDescription.vue";
import CardContent from "./ui/card/CardContent.vue";
import Badge from "./ui/badge/Badge.vue";
import Button from "./ui/button/Button.vue";
import api from "@/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUserStore } from "@/stores/user-store";
import { useRoute } from "vue-router";
import EditItemDialog from "./EditItemDialog.vue";

const { query } = defineProps<{
  query: string;
}>();

type ListOfItem = Array<{
  _id: string;
  name: string;
  quantity: number;
  location: string;
  category: string;
  description: string;
  price: number;
}>;
const items = ref<ListOfItem>([]);

const description = ref("All warehouse items");
const userStore = useUserStore();

watch(
  () => items.value.length,
  () => {
    description.value = query
      ? `Showing ${items.value.length}`
      : "All warehouse items";
  },
);

async function fetchItems(search: string) {
  const { data } = await api.get<{ message: string; items: ListOfItem }>(
    "/api/auth/item",
    { params: search ? { search } : {} },
  );
  items.value = data.items;
}

onMounted(() => fetchItems(query));

watch(
  () => query,
  (newQuery) => {
    fetchItems(newQuery);
  },
);

function getStatusColor(value: number): string {
  const num = typeof value === "number" ? value : parseInt(value);

  if (num > 10) return "bg-green-500 text-white";
  if (num <= 5) return "bg-red-400 text-white";
  return "bg-yellow-500 text-black";
}

const route = useRoute();
const isAdminRoute = computed(() => route.path.startsWith("/admin"));
</script>

<template>
  <Card class="mx-5 max-w-screen">
    <CardHeader>
      <CardTitle class="flex items-center gap-2">
        <Package class="h-5 w-5" />
        Warehouse Inventory
      </CardTitle>
      <CardDescription>{{ description }}</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="max-h-[calc(100vh-8rem)] space-y-4">
        <div
          v-for="item in items"
          :key="item._id"
          class="border-border flex items-center justify-between rounded-lg border p-4"
        >
          <div class="flex-1">
            <div class="mb-2 flex items-center gap-3">
              <h3 class="font-semibold">{{ item.name }}</h3>
              <Badge variant="outline">{{ item._id }}</Badge>
              <Badge :class="getStatusColor(item.quantity)">{{
                item.quantity > 10
                  ? "In Stock"
                  : item.quantity <= 5
                    ? "Low Stock"
                    : "Medium Stock"
              }}</Badge>
            </div>
            <p class="text-muted-foreground mb-2 text-sm">
              {{ item.description || "No description available." }}
            </p>
            <div class="text-muted-foreground flex items-center gap-4 text-sm">
              <span>Quantity: {{ item.quantity }}</span>
            </div>
          </div>

          <div class="my-4">
            <div class="text-bold flex flex-col gap-2 px-1">
              <span>Location: {{ item.location }}</span>
              <span>Price: ${{ item.price }}</span>
            </div>
            <div class="flex gap-2" v-if="isAdminRoute">
              <EditItemDialog
                :item="item"
                :onUpdated="() => fetchItems(query)"
              />

              <Button class="cursor-pointer" variant="outline" size="sm">
                Move
              </Button>
            </div>
          </div>
        </div>

        <div
          v-if="items.length === 0"
          class="text-muted-foreground py-8 text-center"
        >
          <Package class="mx-auto mb-4 h-12 w-12 opacity-50" />
          <p>No items found matching your search.</p>
        </div>
      </div>
    </CardContent>
  </Card>
</template>
