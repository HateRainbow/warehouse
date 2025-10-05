<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useForm, Form as VeeForm, Field as VeeField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";
import Input from "./ui/input/Input.vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import Button from "./ui/button/Button.vue";

import { EyeIcon, EyeOffIcon, Mail, Lock, User } from "lucide-vue-next";
import api from "@/api";

const router = useRouter();
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const error = ref("");

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

const onSubmit = handleSubmit(
  async ({ firstName, lastName, email, password }) => {
    try {
      const { status, data } = await api.post<{ message: string }>(
        "/api/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
      );

      if (status !== 200) {
        error.value = data.message;
        return;
      }

      router.push("/login");
    } catch (err: any) {
      error.value = err?.response?.data?.message || "Signup failed";
      resetForm({ values: {} });
    }
  },
);
</script>

<template>
  <Card class="border-border/50 shadow-lg">
    <CardContent class="p-6">
      <form @submit.prevent="onSubmit" class="space-y-6">
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
          class="h-11 w-full font-medium"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Creating Account..." : "Create Account" }}
        </Button>

        <p v-if="error" class="mt-2 text-sm text-red-500">{{ error }}</p>
      </form>
    </CardContent>
  </Card>
</template>
