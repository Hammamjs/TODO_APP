<template>
  <form @submit.prevent="handleAddNewTodo" class="md:flex gap-2 w-full">
    <input
      v-model="title"
      type="text"
      placeholder="Enter your task..."
      class="md:flex-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      class="px-4 py-2 md:mt-0 mt-4 w-full md:w-fit text-xs text-nowrap bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {{ isAddingTodo ? 'task adding...' : 'Add Task' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import useAddTodoInput from '@/composables/useAddTodoInput';

const { handleAddNewTodo, isAddingTodo, title } = useAddTodoInput();
</script>
