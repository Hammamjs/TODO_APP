<template>
  <button
    @click="() => handleUpdateTodo(status)"
    class="px-2 py-1 text-xs rounded capitalize"
    :class="classStyle"
  >
    {{ statusBtn }}
  </button>
</template>

<script setup lang="ts">
import { useTodoStore } from '@/store/useTodos';
import type { Status } from '@/types/Todo';

interface ButtonProps {
  statusBtn: string;
  classStyle: string;
  status: Status;
  todoId: string;
}

const { statusBtn, classStyle, todoId } = defineProps<ButtonProps>();

const { updateTodo } = useTodoStore();

const handleUpdateTodo = (status: Status) => {
  updateTodo(todoId, status);
};
</script>

<style scoped></style>
