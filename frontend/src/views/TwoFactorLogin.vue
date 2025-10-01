<script setup lang="ts">
import TwoFactorComponent from "@/components/TwoFactorComponent.vue";
import { Shield } from "lucide-vue-next";
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
      </div>
      <TwoFactorComponent />
    </div>
  </div>
</template>
