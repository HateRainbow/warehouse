<script setup lang="ts">
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
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { defineProps } from "vue";
import * as z from "zod";
import Button from "./ui/button/Button.vue";
import DialogClose from "./ui/dialog/DialogClose.vue";
import Input from "./ui/input/Input.vue";

const props = defineProps<{
  item: {
    _id: string;
    name: string;
    description?: string;
    location: string;
    quantity: number;
    price: number;
  };
  onUpdated?: () => void;
}>();

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional(),
    location: z.string().min(1).optional(),
    price: z.preprocess(
      (val) => (val === "" || val == null ? undefined : Number(val)),
      z.number().nonnegative().optional(),
    ),
    quantity: z.preprocess(
      (val) => (val === "" || val == null ? undefined : Number(val)),
      z.number().nonnegative().optional(),
    ),
  }),
);

const form = useForm({
  validationSchema: formSchema,
  initialValues: { ...props.item },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    await api.put<{ message: string }>(
      `/api/auth/item/${props.item._id}`,
      values,
    );
    props.onUpdated?.();
  } catch (err) {
    console.error(err);
  }
});
</script>

<template>
  <Dialog>
    <DialogTrigger as-child>
      <Button class="cursor-pointer" variant="outline" size="sm">Edit</Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogDescription>
          Update item details below and click save.
        </DialogDescription>
      </DialogHeader>

      <form @submit.prevent="onSubmit" class="grid gap-4 py-4">
        <FormField
          name="name"
          :control="form.controlledValues"
          v-slot="{ field }"
        >
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl><Input v-bind="field" /></FormControl>
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
            <FormControl><Input v-bind="field" /></FormControl>
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
            <FormControl><Input v-bind="field" /></FormControl>
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
            <FormControl><Input type="number" v-bind="field" /></FormControl>
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
            <FormControl><Input type="number" v-bind="field" /></FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <DialogFooter>
          <DialogClose as-child>
            <Button type="submit" class="w-full cursor-pointer"
              >Save Changes</Button
            >
          </DialogClose>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
