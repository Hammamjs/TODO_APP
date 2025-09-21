<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Create your account</h2>
        <p class="mt-2 text-sm text-gray-600">
          Or
          <button
            @click="switchToSignIn"
            class="font-medium text-blue-600 hover:text-blue-500"
          >
            sign in to existing account
          </button>
        </p>
      </div>

      <form @submit.prevent="handleSignUp" class="mt-8 space-y-6">
        <div class="space-y-4">
          <Input
            id="name"
            v-model="r$.$value.name"
            type="text"
            required
            placeholder="Enter your full name"
            label="Full Name"
          />

          <Input
            id="email"
            v-model="r$.$value.email"
            type="email"
            required
            placeholder="Enter your email"
            label="Email Address"
          />

          <div>
            <div class="mt-1 relative">
              <Input
                id="password"
                v-model="r$.$value.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="Create a password"
                autocomplete="new-password"
                label="Password"
              />
            </div>
            <div class="mt-1">
              <div class="flex items-center space-x-1 text-xs">
                <div
                  :class="
                    passwordStrength.length >= 8
                      ? 'text-green-600'
                      : 'text-gray-400'
                  "
                >
                  ✓ 8+ characters
                </div>
                <div
                  :class="
                    passwordStrength.hasNumber
                      ? 'text-green-600'
                      : 'text-gray-400'
                  "
                >
                  ✓ Number
                </div>
                <div
                  :class="
                    passwordStrength.hasSpecial
                      ? 'text-green-600'
                      : 'text-gray-400'
                  "
                >
                  ✓ Special char
                </div>
              </div>
            </div>
          </div>

          <div>
            <Input
              id="confirmPassword"
              v-model="r$.$value.confirmPassword"
              type="password"
              required
              placeholder="Confirm your password"
              label="Confirm Password"
            />

            <div
              v-if="
                form.confirmPassword && form.password !== form.confirmPassword
              "
              class="mt-1 text-xs text-red-600"
            >
              Passwords do not match
            </div>
          </div>
        </div>

        <div class="flex items-center">
          <input
            id="terms"
            v-model="form.acceptTerms"
            type="checkbox"
            required
            class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label for="terms" class="ml-2 block text-sm text-gray-900">
            I agree to the
            <a href="#" class="text-blue-600 hover:text-blue-500"
              >Terms of Service</a
            >
            and
            <a href="#" class="text-blue-600 hover:text-blue-500"
              >Privacy Policy</a
            >
          </label>
        </div>

        <button
          type="submit"
          :disabled="isPending || !isFormValid"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isPending ? 'Creating account...' : 'Create account' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
import useSignup from '@/composables/useSignup';

const Input = defineAsyncComponent(() => import('@/components/Input.vue'));

const {
  r$,
  handleSignUp,
  isFormValid,
  isPending,
  passwordStrength,
  showPassword,
  switchToSignIn,
  form,
} = useSignup();
</script>
