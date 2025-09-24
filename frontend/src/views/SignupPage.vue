<script setup lang="ts">
import SignupForm from '@/components/SignupForm.vue'
import { Package, Warehouse, BarChart3, Truck } from 'lucide-vue-next'
</script>

<template>
  <div className="min-h-screen bg-background flex">
    <div className="hidden lg:flex lg:w-1/2 bg-primary text-primary-foreground p-12 flex-col justify-between">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary-foreground/10 rounded-lg">
          <Warehouse className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">WarehousePro</h1>
          <p className="text-primary-foreground/80 text-sm">Management System</p>
        </div>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold mb-4 text-balance">
            Transform Your Warehouse Management
          </h2>
          <p className="text-primary-foreground/90 text-lg leading-relaxed">
            Join thousands of businesses optimizing their warehouse operations with real-time
            tracking and analytics.
          </p>
        </div>

        <div className="grid gap-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary-foreground/10 rounded-lg mt-1">
              <BarChart3 className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Real-time Analytics</h3>
              <p className="text-primary-foreground/80 text-sm">
                Track performance metrics and optimize operations
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary-foreground/10 rounded-lg mt-1">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Inventory Control</h3>
              <p className="text-primary-foreground/80 text-sm">
                Automated stock management and low-stock alerts
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="p-2 bg-primary-foreground/10 rounded-lg mt-1">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold mb-1">Shipping Integration</h3>
              <p className="text-primary-foreground/80 text-sm">
                Connect with major carriers for seamless logistics
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-primary-foreground/60 text-sm">
        © 2025 WarehousePro. All rights reserved.
      </div>
    </div>

    <div className="flex-1 flex items-center justify-center p-8">
      <div className="w-full max-w-md">
        <div className="lg:hidden mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Warehouse className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">WarehousePro</h1>
              <p className="text-muted-foreground text-sm">Management System</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Create your account</h2>
          <p className="text-muted-foreground">
            Get started with your warehouse management solution
          </p>
        </div>

        <SignupForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?
            <RouterLink to="/login" className="text-primary hover:underline font-medium">
              Sign in here
            </RouterLink>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
