<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Input from "./ui/input/Input.vue";
import Button from "./ui/button/Button.vue";

import { EyeIcon, EyeOffIcon, Mail, Lock, User } from "lucide-vue-next";

import Sheet from "./ui/sheet/Sheet.vue";
import SheetTitle from "./ui/sheet/SheetTitle.vue";
import SheetContent from "./ui/sheet/SheetContent.vue";
import SheetTrigger from "./ui/sheet/SheetTrigger.vue";
import SheetDescription from "./ui/sheet/SheetDescription.vue";
import SheetFooter from "./ui/sheet/SheetFooter.vue";
import SheetClose from "./ui/sheet/SheetClose.vue";

import Avatar from "./ui/avatar/Avatar.vue";
import { User as UserIcon } from "lucide-vue-next";

const router = useRouter();

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref("");

const has2FA = ref(false);

const formSchema = toTypedSchema(
  z
    .object({
      firstName: z.string().min(2, "First name must be at least 2 characters"),
      lastName: z.string().min(2, "Last name must be at least 2 characters"),
      email: z.string().email("Please enter a valid email address"),
      password: z.string().min(8, "Password must be at least 8 characters"),
      confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
);

const { handleSubmit, resetForm, isSubmitting } = useForm({
  validationSchema: formSchema,
});

const onSubmit = handleSubmit(async (values) => {
  try {
    console.log("Updating profile with", values);

    error.value = "";
    alert("Profile updated successfully!");
  } catch (err: any) {
    error.value = err?.response?.data?.message || "Update failed";
    resetForm({ values: {} });
  }
});

const enable2FA = () => {
  router.push("setup-2fa");
};
</script>

<template>
  <Sheet>
    <SheetTrigger as-child>
      <Avatar class="h-8 w-8 cursor-pointer bg-gray-300 lg:h-10 lg:w-10">
        <UserIcon class="h-6 w-6 text-gray-700 lg:h-8 lg:w-8" />
      </Avatar>
    </SheetTrigger>

    <SheetContent class="px-2 pt-8">
      <SheetTitle>Edit Profile</SheetTitle>
      <SheetDescription>
        Update your profile information here. Click save when done.
      </SheetDescription>

      <form @submit.prevent="onSubmit" class="mt-4 space-y-6">
        <div class="grid grid-cols-2 gap-4">
          <FormField
            name="firstName"
            v-slot="{ field, errorMessage, componentField }"
          >
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <div class="relative">
                  <User
                    class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                  />
                  <Input
                    v-model="field.value"
                    placeholder="John"
                    v-bind="componentField"
                    class="h-11 pl-10"
                    :disabled="isSubmitting"
                  />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <FormField
            name="lastName"
            v-slot="{ field, errorMessage, componentField }"
          >
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  v-model="field.value"
                  v-bind="componentField"
                  placeholder="Doe"
                  class="h-11"
                  :disabled="isSubmitting"
                />
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>
        </div>

        <FormField
          name="email"
          v-slot="{ field, errorMessage, componentField }"
        >
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <div class="relative">
                <Mail
                  class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <Input
                  v-bind="componentField"
                  v-model="field.value"
                  placeholder="john.doe@company.com"
                  class="h-11 pl-10"
                  :disabled="isSubmitting"
                />
              </div>
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField
          name="password"
          v-slot="{ field, errorMessage, componentField }"
        >
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <div class="relative">
                <Lock
                  class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <Input
                  v-model="field.value"
                  v-bind="componentField"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Create a strong password"
                  class="h-11 pr-10 pl-10"
                  :disabled="isSubmitting"
                />
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  @click="showPassword = !showPassword"
                >
                  <component
                    :is="showPassword ? EyeOffIcon : EyeIcon"
                    class="h-4 w-4"
                  />
                </button>
              </div>
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <FormField
          name="confirmPassword"
          v-slot="{ field, errorMessage, componentField }"
        >
          <FormItem>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl>
              <div class="relative">
                <Lock
                  class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
                />
                <Input
                  v-model="field.value"
                  v-bind="componentField"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  placeholder="Confirm your password"
                  class="h-11 pr-10 pl-10"
                  :disabled="isSubmitting"
                />
                <button
                  type="button"
                  class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <component
                    :is="showConfirmPassword ? EyeOffIcon : EyeIcon"
                    class="h-4 w-4"
                  />
                </button>
              </div>
            </FormControl>
            <FormMessage>{{ errorMessage }}</FormMessage>
          </FormItem>
        </FormField>

        <Button
          type="submit"
          class="h-11 w-full cursor-pointer font-medium"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Saving..." : "Save changes" }}
        </Button>

        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
      </form>

      <!-- 2FA Enable Button -->
      <div class="mt-6">
        <Button
          v-if="!has2FA"
          variant="outline"
          class="w-full cursor-pointer"
          @click="enable2FA"
        >
          Enable 2FA
        </Button>
        <p v-else class="text-sm font-medium text-green-600">2FA is enabled</p>
      </div>

      <SheetFooter>
        <SheetClose as-child>
          <Button class="mt-6 w-full cursor-pointer">Close</Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
