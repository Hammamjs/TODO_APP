<template>
  <form @submit.prevent="handleAddNewTodo" class="flex gap-2 w-full">
    <input
      v-model="title"
      type="text"
      placeholder="Enter your task..."
      class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {{ isAddingTodo ? 'task adding...' : 'Add Task' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import useAddTodoInput from '@/composables/useAddTodoInput';

const { handleAddNewTodo, isAddingTodo, title } = useAddTodoInput();
</script>
