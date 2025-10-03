<script setup lang="ts">
import api from "@/api";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import PinInput from "@/components/ui/pin-input/PinInput.vue";
import PinInputGroup from "@/components/ui/pin-input/PinInputGroup.vue";
import PinInputSlot from "@/components/ui/pin-input/PinInputSlot.vue";
import { Smartphone } from "lucide-vue-next";
import { ref } from "vue";
import { useRouter } from "vue-router";
import CardFooter from "./ui/card/CardFooter.vue";

const { nextStep } = defineProps<{
  nextStep?: () => void;
}>();

const router = useRouter();

const digitRef = ref<string[]>(Array(6).fill(""));
const errorMessage = ref("");
const isLoading = ref(false);

const resetDigits = () => {
  digitRef.value = Array(6).fill("");
};

const handleComplete = async (digit: string[]) => {
  isLoading.value = true;
  errorMessage.value = "";

  const secret = digit.map((d) => (d.match(/^\d$/) ? d : "")).join("");

  if (secret.length !== 6) {
    errorMessage.value = "Please enter a valid 6-digit code.";
    resetDigits();
    isLoading.value = false;
    return;
  }
  try {
    const { data } = await api.post<{ message: string; verified: boolean }>(
      "/api/auth/verify-2fa",
      { token: secret },
    );

    if (data.verified) {
      router.push("/");
    } else {
      errorMessage.value = data.message || "Invalid code. Please try again.";
      resetDigits();
    }
  } catch (err: any) {
    errorMessage.value =
      err?.response?.data?.message || "Something went wrong. Please try again.";
    resetDigits();
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="bg-gra block w-max items-center justify-center space-y-6 bg-gray-50"
  >
    <div class="w-full max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <div class="flex justify-center"></div>
        <h1 class="text-2xl font-bold text-balance">
          Warehouse Security Verification
        </h1>
        <p class="text-muted-foreground text-pretty">
          Enter the 6-digit code from your authenticator app to access the
          warehouse management system
        </p>
        <Card class="border-2">
          <CardHeader class="p-2 text-center">
            <CardTitle class="flex items-center justify-center gap-1 text-lg">
              <Smartphone class="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent class="grid items-center justify-center">
            <form
              @submit.prevent="handleComplete(digitRef)"
              class="items-center justify-center space-y-3 p-2"
            >
              <PinInput
                class="flex gap-3"
                id="pin-input"
                v-model="digitRef"
                placeholder="○"
              >
                <PinInputGroup>
                  <PinInputSlot
                    v-for="index in 6"
                    :key="index"
                    :index="index - 1"
                  />
                </PinInputGroup>
              </PinInput>
              <p
                v-if="errorMessage"
                class="text-center font-sans text-sm font-bold text-red-400"
              >
                {{ errorMessage }}
              </p>
              <Button
                type="submit"
                class="h-12 w-full cursor-pointer text-base font-semibold"
                :disabled="isLoading"
              >
                {{ isLoading ? "Verifying..." : "Verify & Continue" }}
              </Button>
            </form>
          </CardContent>
          <CardFooter v-if="nextStep" class="p-4">
            <Button
              variant="outline"
              class="h-10 w-full cursor-pointer text-sm font-semibold"
              @click="nextStep()"
              :disabled="isLoading"
            >
              Back
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  </div>
</template>
