<script setup lang="ts">
import api from "@/api";
import Button from "@/components/ui/button/Button.vue";
import Card from "@/components/ui/card/Card.vue";
import PinInput from "@/components/ui/pin-input/PinInput.vue";
import PinInputGroup from "@/components/ui/pin-input/PinInputGroup.vue";
import PinInputSlot from "@/components/ui/pin-input/PinInputSlot.vue";
import { Shield, Smartphone } from "lucide-vue-next";
import { ref } from "vue";
const digit = ref<string[]>([]);
const isLoading = ref(false);
const handleComplete = async (e: string[]) => {
  const secret = e.join();

  await api.post("/");
};
</script>

<template>
  <div class="space-y-6">
    <div class="w-full max-w-md space-y-6">
      <div class="space-y-2 text-center">
        <div class="flex justify-center">
          <div
            class="bg-primary/10 flex h-16 w-16 items-center justify-center rounded-full"
          >
            <Shield class="text-primary h-8 w-8" />
          </div>
        </div>
        <h1 class="text-2xl font-bold text-balance">
          Warehouse Security Verification
        </h1>
        <p class="text-muted-foreground text-pretty">
          Enter the 6-digit code from your authenticator app to access the
          warehouse management system
        </p>
        <Card class="flex-col border-2">
          <CardHeader class="p-4 text-center">
            <CardTitle class="flex items-center justify-center gap-2 text-lg">
              <Smartphone class="h-5 w-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent class="flex items-center justify-center space-y-10 p-4">
            <PinInput
              class="flex gap-3"
              id="pin-input"
              v-model="digit"
              placeholder="○"
              @complete="handleComplete"
            >
              <PinInputGroup>
                <PinInputSlot
                  v-for="(id, index) in 5"
                  :key="id"
                  :index="index"
                />
              </PinInputGroup>
            </PinInput>
            <Button
              type="submit"
              class="h-12 w-full text-base font-semibold"
              :disabled="isLoading"
            >
              {{ isLoading ? "Verifying..." : "Verify & Continue" }}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
