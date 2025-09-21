<template>
  <div
    class="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold text-gray-900">Forgot your password?</h2>
        <p class="mt-2 text-sm text-gray-600">
          Enter your email address and we'll send you a verification code to
          reset your password.
        </p>
      </div>

      <form @submit.prevent="handleForgotPassword" class="mt-8 space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email address"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {{ loading ? 'Sending...' : 'Send verification code' }}
        </button>

        <div class="text-center">
          <RouterLink
            to="/signin"
            class="text-sm text-blue-600 hover:text-blue-500"
          >
            Back to sign in
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import useForgotPassowrd from '@/composables/useForgotPassword';

const {
  RouterLink,
  loading,
  handleForgotPassword,
  email,
  forgotPasswordMutation,
  router,
} = useForgotPassowrd();
</script>
