<script setup lang="ts">
import api from "@/api";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import Button from "./ui/button/Button.vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import CardDescription from "./ui/card/CardDescription.vue";
import CardHeader from "./ui/card/CardHeader.vue";
import CardTitle from "./ui/card/CardTitle.vue";
import Input from "./ui/input/Input.vue";

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, "Item name is required"),
    description: z.string().optional(),
    price: z.number().min(0, "Price cannot be negative"),
    quantity: z.number().min(0, "Quantity cannot be negative"),
    location: z.string().min(1, "Location is required"),
  }),
);

const form = useForm({ validationSchema: formSchema });

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await api.post("/api/auth/item", values);
    form.resetForm();
  } catch (err) {
    console.error(err);
  }
});

function onCancel() {
  form.resetForm();
}
</script>

<template>
  <Card class="mx-5 my-5 max-w-screen p-5">
    <CardHeader>
      <CardTitle>Add New Item</CardTitle>
      <CardDescription>
        Enter the details for the new warehouse item
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-4">
      <form @submit.prevent="onSubmit" class="space-y-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            name="name"
            :control="form.controlledValues"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>Item Name</FormLabel>
              <FormControl>
                <Input v-bind="field" placeholder="Item name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            name="description"
            :control="form.controlledValues"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input v-bind="field" placeholder="Item description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            name="price"
            :control="form.controlledValues"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input v-bind="field" type="number" placeholder="13.02" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            name="quantity"
            :control="form.controlledValues"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input v-bind="field" type="number" placeholder="Quantity" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>

          <FormField
            name="location"
            :control="form.controlledValues"
            v-slot="{ field }"
          >
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input v-bind="field" placeholder="Location (e.g., A-12)" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </div>

        <div class="flex gap-2">
          <Button type="submit" class="cursor-pointer">Add Item</Button>
          <Button
            type="button"
            variant="outline"
            class="cursor-pointer"
            @click="onCancel"
          >
            Cancel
          </Button>
        </div>
      </form>
    </CardContent>
  </Card>
</template>
