<script setup lang="ts">
import { Smartphone, QrCode } from "lucide-vue-next";
import { Alert, AlertDescription } from "@/components/ui/alert";
import api from "@/api";
import QrcodeVue from "qrcode.vue";
import { ref, onMounted } from "vue";

const { prevStep, isPrevDisabled } = defineProps<{
  prevStep: () => void;
  isPrevDisabled: boolean;
}>();

const qrCodeUrl = ref("");

onMounted(async () => {
  try {
    const { status, data } = await api.get<{ qr: string }>(
      "/api/auth/setup-2fa",
    );
    if (status === 200 && data.qr) {
      qrCodeUrl.value = data.qr;
    } else {
      console.error("Failed to fetch QR code");
    }
  } catch (error) {
    console.error("Error fetching 2FA setup data:", error);
  }
});
</script>

<template>
  <div class="space-y-6">
    <div class="flex justify-center">
      <div
        class="border-muted-foreground/20 rounded-lg border-2 border-dashed bg-white p-4"
      >
        <!-- Render QR code if available, else placeholder -->
        <qrcode-vue
          v-if="qrCodeUrl"
          :value="qrCodeUrl"
          :size="192"
          :level="'M'"
        />
        <div
          v-else
          class="text-muted-foreground flex h-48 w-48 items-center justify-center"
        >
          Loading QR code...
        </div>
      </div>
    </div>

    <div class="space-y-4">
      <Alert>
        <Smartphone class="h-4 w-4" />
        <AlertDescription>
          <strong>Step 1:</strong> Install an authenticator app like Google
          Authenticator, Authy, or Microsoft Authenticator on your mobile
          device.
        </AlertDescription>
      </Alert>

      <Alert>
        <QrCode class="h-4 w-4" />
        <AlertDescription>
          <strong>Step 2:</strong> Open your authenticator app and scan the QR
          code above to add your warehouse account.
        </AlertDescription>
      </Alert>
    </div>
    <div class="flex flex-col gap-3 sm:flex-row">
      <Button
        @click="prevStep()"
        class="flex-1 gap-2"
        :disabled="isPrevDisabled"
      >
        I've scanned the code
        <ArrowRight class="h-4 w-4" />
      </Button>
    </div>
  </div>
</template>
