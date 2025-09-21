<template>
  <div v-if="isLoading">
    <Loader />
  </div>
  <div v-else>
    <div class="min-h-screen bg-gray-50">
      <!-- Navigation -->
      <Navbar />

      <div class="max-w-4xl mx-auto p-6">
        <!-- Add New Todo -->
        <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 class="text-lg font-medium mb-4">Add New Task</h2>
          <div class="flex gap-3">
            <AddToDoInput />
          </div>
        </div>

        <!-- Todo Lists by Status -->

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Pending Tasks -->
          <TaskList
            :todos="pendingTodo"
            :todos-length="todoStats.pending"
            computed-val="pending"
            div-color="bg-yellow-50"
            bg-color="bg-yellow-500"
            text-color="text-yellow-800"
            :status-button="[
              {
                BtnName: 'start',
                status: 'in-progress',
                classStyle: colors.pending,
              },
              {
                BtnName: 'complete',
                status: 'completed',
                classStyle: colors.completed,
              },
            ]"
          />

          <!-- In Progress Task -->
          <TaskList
            :todos="inProgressTodo"
            :todos-length="todoStats.inProgress"
            div-color="bg-blue-50"
            bg-color="bg-blue-800"
            text-color="text-blue-800"
            computed-val="in-progress"
            :status-button="[
              {
                BtnName: 'pause',
                status: 'pending',
                classStyle: colors.pending,
              },
              {
                BtnName: 'complete',
                status: 'completed',
                classStyle: colors.completed,
              },
            ]"
          />

          <!-- Completed Tasks -->
          <TaskList
            :todos="completedTodo"
            :todos-length="todoStats.completed"
            div-color="bg-green-50"
            bg-color="bg-green-700"
            text-color="text-green-700"
            computed-val="completed"
            :status-button="[
              {
                BtnName: 'reopen',
                status: 'pending',
                classStyle: colors.pending,
              },
              {
                BtnName: 'resume',
                status: 'in-progress',
                classStyle: colors.pending,
              },
            ]"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useTodoApp from '@/composables/useTodo';
import { defineAsyncComponent } from 'vue';

// Import lazy load
const Navbar = defineAsyncComponent(() => import('@/components/Navbar.vue'));
const AddToDoInput = defineAsyncComponent(
  () => import('@/components/AddToDoInput.vue')
);
const TaskList = defineAsyncComponent(
  () => import('@/components/TaskList.vue')
);

const Loader = defineAsyncComponent(() => import('@/components/ui/Loader.vue'));

const {
  colors,
  completedTodo,
  inProgressTodo,
  isLoading,
  pendingTodo,
  todoStats,
} = useTodoApp();
</script>
