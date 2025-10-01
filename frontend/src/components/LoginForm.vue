<script setup lang="ts">
import { ref } from "vue";
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
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import api from "@/api";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { useUserStore } from "@/stores/user-store";

const userStore = useUserStore();

const router = useRouter();
const showPassword = ref(false);
const errorMessage = ref("");
const zodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(2).max(50),
});

const formSchema = toTypedSchema(zodSchema);

const form = useForm({
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(async ({ password, email }) => {
  console.log("SUbmiting");
  const { status, data } = await api.post<{
    message: string;
    firstName: string;
    lastName: string;
    email: string;
    twoFactorEnabled: boolean;
  }>("/api/login", {
    email,
    password,
  });

  console.log(`status is ${status}`);

  if (status !== 200) {
    errorMessage.value = data.message;
    return;
  }

  userStore.setUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    twoFactorEnabled: data.twoFactorEnabled,
  });

  if (data.twoFactorEnabled) {
    router.push("/2fa-signup");
  }

  router.push("/");
});
</script>

<template>
  <Card class="border-border/50 shadow-lg">
    <CardContent class="p-6">
      <form @submit.prevent="onSubmit" class="space-y-6">
        <FormField
          :control="form.controlledValues"
          name="email"
          v-slot="{ field }"
        >
          <FormItem>
            <FormLabel class="text-sm font-medium">Email Address</FormLabel>
            <FormControl>
              <div class="relative">
                <Mail
                  class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                />
                <Input
                  v-bind="field"
                  placeholder="Enter your email"
                  class="h-11 pl-10"
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <FormField
          :control="form.controlledValues"
          name="password"
          v-slot="{ field }"
        >
          <FormItem>
            <FormLabel class="text-sm font-medium">Password</FormLabel>
            <FormControl>
              <div class="relative">
                <Lock
                  class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                />
                <Input
                  v-bind="field"
                  :type="showPassword ? 'text' : 'password'"
                  placeholder="Enter your password"
                  class="h-11 pr-10 pl-10"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer transition-colors"
                >
                  <component
                    :is="showPassword ? EyeOff : Eye"
                    class="h-4 w-4"
                  />
                </button>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        </FormField>

        <div class="flex justify-end">
          <span class="text-primary text-sm font-medium hover:underline">
            Forgot password?
          </span>
        </div>

        <Button
          type="submit"
          class="h-11 w-full cursor-pointer font-medium"
          :disabled="!form.isSubmitting"
        >
          {{ form.isSubmitting ? "Sign In" : "Signing in..." }}
        </Button>
      </form>
    </CardContent>
  </Card>
</template>
