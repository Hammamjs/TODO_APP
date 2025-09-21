<template>
  <div class="bg-white rounded-lg shadow-sm">
    <div class="p-4 border-b" :class="divColor">
      <h3 class="font-medium flex items-center gap-2" :class="textColor">
        <div class="w-3 h-3 bg-blue-500 rounded-full" :class="bgColor"></div>
        {{ uppercaseValue }}
        ({{ todosLength }})
      </h3>
    </div>
    <div class="p-4 space-y-3">
      <div
        v-for="todo in todos"
        :key="todo._id"
        class="p-3 border border-blue-200 rounded-md"
        :class="
          todo.status === 'pending'
            ? 'bg-yellow-50'
            : todo.status === 'in-progress'
            ? 'bg-blue-50'
            : 'bg-green-50'
        "
      >
        <div class="flex justify-between items-start mb-2">
          <p
            class="text-sm font-medium text-gray-800"
            :class="todo.status === 'completed' ? 'line-through' : ''"
          >
            {{ todo.title }}
          </p>
          <button
            @click.prevent="() => todo._id && handleDeleteTodo(todo._id)"
            class="text-red-500 hover:text-red-700 text-xs"
          >
            ×
          </button>
        </div>
        <div class="flex gap-2">
          <StatusButton
            v-for="state in statusButton"
            :status-btn="state.BtnName"
            :class-style="state.classStyle"
            :status="state.status"
            :todo-id="todo._id as string"
          />
        </div>
      </div>
      <div v-if="todosLength === 0" class="text-center text-gray-500 py-8">
        No tasks {{ computedVal }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTaskList from '@/composables/useTaskList';
import type { TaskProps } from '@/types/Todo';
import { defineAsyncComponent, toRefs } from 'vue';

const StatusButton = defineAsyncComponent(() => import('./StatusButton.vue'));

const props = defineProps<TaskProps>();

const { handleDeleteTodo, uppercaseValue } = useTaskList(props);

const {
  bgColor,
  computedVal,
  divColor,
  statusButton,
  textColor,
  todos,
  todosLength,
} = toRefs(props);
</script>
