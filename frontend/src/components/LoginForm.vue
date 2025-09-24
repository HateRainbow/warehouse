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
  Form,
} from "@/components/ui/form";
import Input from "./ui/input/Input.vue";
import { Mail, Lock, Eye, EyeOff } from "lucide-vue-next";
import Button from "./ui/button/Button.vue";
import Card from "./ui/card/Card.vue";
import CardContent from "./ui/card/CardContent.vue";
import api from "@/api";
import { useRouter } from "vue-router";

const router = useRouter();
const showPassword = ref(false);
const isLoading = ref(false);
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
  isLoading.value = true;
  const { status, data } = await api.post<{
    verified: string;
    message: string;
  }>("/api/login", {
    email,
    password,
  });

  if (status !== 200) {
    isLoading.value = false;
    errorMessage.value = data.message;
    return;
  }

  if (data.verified) {
    router.push("/2fa-signup");
  }

  router.push("/login");
});
</script>

<template>
  <Card class="border-border/50 shadow-lg">
    <CardContent class="p-6">
      <Form v-bind="form">
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
            :disabled="isLoading"
          >
            {{ isLoading ? "Signing in..." : "Sign In" }}
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</template>
