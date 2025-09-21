<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Reset your password</h2>
        <p class="mt-2 text-sm text-gray-600">Enter your new password below</p>
      </div>

      <form @submit.prevent="handleResetPassword" class="mt-8 space-y-6">
        <div class="space-y-4">
          <div>
            <CustomInput
              autocomplete="new-password"
              id="password"
              label="New Password"
              v-model="form.password"
              placeholder="Enter your new password"
              type="password"
            />
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
            <CustomInput
              id="passwordConfirmation"
              label="Confirm Password"
              v-model="form.confirmPassword"
              placeholder="Enter Password Confirmation"
              type="password"
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

        <button
          type="submit"
          :disabled="isPending || !isFormValid"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ isPending ? 'Resetting password...' : 'Reset password' }}
        </button>

        <div class="text-center">
          <RouterLink
            to="/signin"
            :replace="true"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to sign in
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useResetPassword from '@/composables/useResetPassword';

const {
  CustomInput,
  RouterLink,
  handleResetPassword,
  isFormValid,
  isPending,
  form,
  passwordStrength,
} = useResetPassword();
</script>
