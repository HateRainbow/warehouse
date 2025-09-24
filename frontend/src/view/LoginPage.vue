<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
import { Warehouse, Shield, Users } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="bg-background flex min-h-screen">
    <div
      class="bg-primary text-primary-foreground hidden flex-col justify-between p-12 lg:flex lg:w-1/2"
    >
      <div class="flex items-center gap-3">
        <div class="bg-primary-foreground/10 rounded-lg p-2">
          <Warehouse class="h-8 w-8" />
        </div>
        <div>
          <h1 class="text-2xl font-bold">WarehousePro</h1>
          <p class="text-primary-foreground/80 text-sm">Management System</p>
        </div>
      </div>

      <div class="space-y-8">
        <div>
          <h2 class="mb-4 text-3xl font-bold text-balance">Streamline Your Warehouse Operations</h2>
          <p class="text-primary-foreground/90 text-lg leading-relaxed">
            Manage inventory, track shipments, and optimize your warehouse workflow with our
            comprehensive management platform.
          </p>
        </div>

        <div class="grid gap-6">
          <div class="flex items-start gap-4">
            <div class="bg-primary-foreground/10 mt-1 rounded-lg p-2">
              <Shield class="h-5 w-5" />
            </div>
            <div>
              <h3 class="mb-1 font-semibold">Secure & Reliable</h3>
              <p class="text-primary-foreground/80 text-sm">
                Enterprise-grade security with 99.9% uptime guarantee
              </p>
            </div>
          </div>

          <div class="flex items-start gap-4">
            <div class="bg-primary-foreground/10 mt-1 rounded-lg p-2">
              <Users class="h-5 w-5" />
            </div>
            <div>
              <h3 class="mb-1 font-semibold">Team Collaboration</h3>
              <p class="text-primary-foreground/80 text-sm">
                Multi-user access with role-based permissions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="text-primary-foreground/60 text-sm">
        © 2025 WarehousePro. All rights reserved.
      </div>
    </div>

    <div class="flex flex-1 items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="mb-8 text-center lg:hidden">
          <div class="mb-4 flex items-center justify-center gap-3">
            <div class="bg-primary/10 rounded-lg p-2">
              <Warehouse class="text-primary h-8 w-8" />
            </div>
            <div>
              <h1 class="text-2xl font-bold">WarehousePro</h1>
              <p class="text-muted-foreground text-sm">Management System</p>
            </div>
          </div>
        </div>

        <div class="mb-8">
          <h2 class="mb-2 text-2xl font-bold">Welcome back</h2>
          <p class="text-muted-foreground">Sign in to your warehouse management account</p>
        </div>

        <LoginForm />

        <div class="mt-6 text-center">
          <p class="text-muted-foreground text-sm">
            Don't have an account?
            <RouterLink to="/signup" class="text-primary font-medium hover:underline">
              Sign up here
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
