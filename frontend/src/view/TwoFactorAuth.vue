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
const handleComplete = (e: string[]) => {
  const secret = e.join();
};
</script>

<template>
  <div
    className="min-h-screen bg-background flex items-center justify-center p-4"
  >
    <div className="w-full max-w-md space-y-6">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <div
            className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"
          >
            <Shield className="w-8 h-8 text-primary" />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-balance">
          Warehouse Security Verification
        </h1>
        <p className="text-muted-foreground text-pretty">
          Enter the 6-digit code from your authenticator app to access the
          warehouse management system
        </p>
        <Card className="border-2">
          <CardHeader className="text-center p-4">
            <CardTitle
              className="flex items-center justify-center gap-2 text-lg"
            >
              <Smartphone className="w-5 h-5" />
              Two-Factor Authentication
            </CardTitle>
          </CardHeader>
          <CardContent
            className="space-y-10 flex items-center justify-center p-4"
          >
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
              className="w-full h-12 text-base font-semibold"
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
