<script setup lang="ts">
import api from "@/api";
import ScanQrComponent from "@/components/ScanQrComponent.vue";
import TwoFactorAuth from "@/components/TwoFactorAuth.vue";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import CardContent from "@/components/ui/card/CardContent.vue";
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from "@/components/ui/stepper";

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
      <!-- Header -->
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

      <!-- Stepper -->
      <Stepper v-slot="{ prevStep, isPrevDisabled }" v-model="stepIndex">
        <!-- Horizontal Stepper Header -->
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
            <!-- Only show separator between steps -->
            <StepperSeparator
              v-if="item.step !== steps[steps.length - 1].step"
              class="bg-muted mx-2 h-0.5 flex-1"
            />
          </StepperItem>
        </div>
      </Stepper>

      <!-- Step Content (Below Stepper) -->
      <Card class="mt-6 border-2">
        <CardContent>
          <template v-if="stepIndex === 1">
            <ScanQrComponent
              :prevStep="prevStep"
              :isPrevDisabled="isPrevDisabled"
            />
          </template>
          <template v-else-if="stepIndex === 2">
            <TwoFactorAuth />
          </template>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
