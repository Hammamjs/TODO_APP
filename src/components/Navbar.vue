<template>
  <nav class="bg-white shadow-sm border-b">
    <div class="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
      <h1 class="text-xl font-semibold text-gray-800">My Todo List</h1>
      <div class="flex items-center gap-4">
        <span class="text-sm text-gray-600" v-if="user._id"
          >Welcome, {{ user.name }}</span
        >
        <router-link to="/signin" class="text-sm text-gray-600" v-else>
          <span class="text-gray-400 hover:text-gray-600 font-bold"
            >Signin</span
          >
        </router-link>
        <button
          @click="() => handleLogout(user.email)"
          class="text-sm text-red-400 hover:text-red-700"
          v-if="user._id"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useLogoutMutation } from '@/composables/useAuthQuery';
import { useAuthStore } from '@/store/useAuthStore';

const { user } = useAuthStore();
const { mutate: handleLogout } = useLogoutMutation();
</script>
