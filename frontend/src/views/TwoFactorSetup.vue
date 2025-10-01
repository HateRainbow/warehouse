<script setup lang="ts">
import ScanQrComponent from "@/components/ScanQrComponent.vue";
import TwoFactorAuth from "@/components/TwoFactorComponent.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import Stepper from "@/components/ui/stepper/Stepper.vue";
import StepperDescription from "@/components/ui/stepper/StepperDescription.vue";
import StepperIndicator from "@/components/ui/stepper/StepperIndicator.vue";
import StepperItem from "@/components/ui/stepper/StepperItem.vue";
import StepperSeparator from "@/components/ui/stepper/StepperSeparator.vue";
import StepperTitle from "@/components/ui/stepper/StepperTitle.vue";
import StepperTrigger from "@/components/ui/stepper/StepperTrigger.vue";

import { QrCode, Shield, ShieldCheck } from "lucide-vue-next";
import { ref } from "vue";

const stepIndex = ref(1);
const steps = [
  {
    step: 1,
    title: "Scan QR Code",
    description: "Use your authenticator app to scan the QR code.",
    icon: QrCode,
  },
  {
    step: 2,
    title: "Verify Setup",
    description: "Add the code from your authenticator app to verify.",
    icon: ShieldCheck,
  },
];
</script>

<template>
  <div
    class="bg-background flex min-h-screen flex-col items-center justify-center p-4"
  >
    <div class="w-full max-w-2xl space-y-6">
      <div class="space-y-2 text-center">
        <div class="flex justify-center">
          <div
            class="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <Shield class="text-primary h-8 w-8" />
          </div>
        </div>
        <h1 class="text-2xl font-bold text-balance">
          Setup Two-Factor Authentication
        </h1>
        <p class="text-muted-foreground text-pretty">
          Secure your warehouse access with an additional layer of protection
        </p>
      </div>

      <Stepper
        v-slot="{ nextStep, isPrevDisabled }"
        v-model="stepIndex"
        class="block"
      >
        <div class="flex w-full items-center justify-between">
          <StepperItem
            v-for="item in steps"
            :key="item.step"
            :step="item.step"
            class="flex-1"
          >
            <StepperTrigger class="flex flex-col items-center gap-2 text-black">
              <StepperIndicator>
                <component :is="item.icon" class="h-5 w-5" />
              </StepperIndicator>
              <StepperTitle>{{ item.title }}</StepperTitle>
              <StepperDescription class="text-center text-sm">
                {{ item.description }}
              </StepperDescription>
            </StepperTrigger>
            <StepperSeparator
              v-if="item.step !== steps[steps.length - 1].step"
              class="bg-muted mx-2 h-0.5 flex-1"
            />
          </StepperItem>
        </div>

        <Card class="mt-6 w-full items-center border-2">
          <CardContent>
            <ScanQrComponent
              v-if="stepIndex === 1"
              :nextStep="nextStep"
              :isPrevDisabled="isPrevDisabled"
            />
            <TwoFactorAuth :nextStep="nextStep" v-if="stepIndex === 2" />
          </CardContent>
        </Card>
      </Stepper>
    </div>
  </div>
</template>
