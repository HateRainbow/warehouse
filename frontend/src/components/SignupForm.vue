<script setup lang="ts">
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
import Card from "./ui/card/Card.vue";
import {
  EyeIcon,
  EyeOffIcon,
  Mail,
  Lock,
  User,
  Building,
} from "lucide-vue-next";
import api from "@/api";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CardContent from "./ui/card/CardContent.vue";
import Button from "./ui/button/Button.vue";

const zodSchema = z
  .object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
const isSubmitting = ref(false);
const error = ref("");
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const router = useRouter();
const formSchema = toTypedSchema(zodSchema);
const form = useForm({
  initialValues: {
    confirmPassword: "",
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  },
  validationSchema: formSchema,
});

const onSubmit = form.handleSubmit(
  async ({ firstName, lastName, password, email }) => {
    isSubmitting.value = true;
    const { status, data } = await api.post<{
      message: string;
    }>("/api/signup", {
      lastName,
      firstName,
      email,
      password,
    });

    if (status !== 200) {
      isSubmitting.value = false;
      error.value = data.message;
      return;
    }

    router.push("/login");
  },
);
</script>

<template>
  <Card class="border-border/50 shadow-lg">
    <CardContent class="p-6">
      <Form :validation-schema="zodSchema">
        <form @submit="onSubmit" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <FormField name="firstName" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel class="text-sm font-medium">First Name</FormLabel>
                <FormControl>
                  <div class="relative">
                    <User
                      class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                    />
                    <Input
                      placeholder="John"
                      class="h-11 pl-10"
                      v-model="field.value"
                      :disabled="isSubmitting"
                    />
                  </div>
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>

            <FormField name="lastName" v-slot="{ field, errorMessage }">
              <FormItem>
                <FormLabel class="text-sm font-medium">Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Doe"
                    class="h-11"
                    v-model="field.value"
                    :disabled="isSubmitting"
                  />
                </FormControl>
                <FormMessage>{{ errorMessage }}</FormMessage>
              </FormItem>
            </FormField>
          </div>

          <FormField name="email" v-slot="{ field, errorMessage }">
            <FormItem>
              <FormLabel class="text-sm font-medium">Email Address</FormLabel>
              <FormControl>
                <div class="relative">
                  <Mail
                    class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                  />
                  <Input
                    placeholder="john.doe@company.com"
                    class="h-11 pl-10"
                    v-model="field.value"
                    :disabled="isSubmitting"
                  />
                </div>
              </FormControl>
              <FormMessage>{{ errorMessage }}</FormMessage>
            </FormItem>
          </FormField>

          <FormField name="password" v-slot="{ field, errorMessage }">
            <FormItem>
              <FormLabel class="text-sm font-medium">Password</FormLabel>
              <FormControl>
                <div class="relative">
                  <Lock
                    class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                  />
                  <Input
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Create a strong password"
                    class="h-11 pr-10 pl-10"
                    v-model="field.value"
                    :disabled="isSubmitting"
                  />
                  <button
                    type="button"
                    class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer transition-colors"
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

          <!-- Confirm Password -->
          <FormField name="confirmPassword" v-slot="{ field, errorMessage }">
            <FormItem>
              <FormLabel class="text-sm font-medium"
                >Confirm Password</FormLabel
              >
              <FormControl>
                <div class="relative">
                  <Lock
                    class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform"
                  />
                  <Input
                    :type="showConfirmPassword ? 'text' : 'password'"
                    placeholder="Confirm your password"
                    class="h-11 pr-10 pl-10"
                    v-model="field.value"
                    :disabled="isSubmitting"
                  />
                  <button
                    type="button"
                    class="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer transition-colors"
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

          <!-- ERROR message -->
          <FormField name="agreeToTerms" v-slot="{ field, errorMessage }">
            <FormItem class="flex flex-row items-start space-y-0 space-x-3">
              <FormControl>
                <Checkbox v-model="field.value" :disabled="isSubmitting" />
              </FormControl>
              <div class="space-y-1 leading-none">
                <FormMessage>{{ errorMessage }}</FormMessage>
              </div>
            </FormItem>
          </FormField>

          <Button
            type="submit"
            class="h-11 w-full cursor-pointer font-medium"
            :disabled="isSubmitting"
          >
            {{ isSubmitting ? "Creating Account..." : "Create Account" }}
          </Button>
        </form>
      </Form>
    </CardContent>
  </Card>
</template>
