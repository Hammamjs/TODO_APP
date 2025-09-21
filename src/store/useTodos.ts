import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { useAuthStore } from './useAuthStore';
import useTodosQuery from '@/composables/useTodosQuery';
import { useQueryClient } from '@tanstack/vue-query';
import { useToast } from 'vue-toast-notification';
import type { Status, Todo, TodoResponse } from '@/types/Todo';

export const useTodoStore = defineStore('todo', () => {
  const { isAuthenticated } = useAuthStore();
  const toast$ = useToast();

  // Guest users
  const todosDemo = ref<TodoResponse[]>([]);

  // Optimistic update
  const queryClient = useQueryClient();

  const { addTodoQuery, deleteTodoQuery, getTodosQuery, updateTodoQuery } =
    useTodosQuery();

  const { isLoading: isFetching, data: todos } = getTodosQuery();
  const { mutate: addTodoMutation, isPending: AddingTodo } =
    addTodoQuery(queryClient);
  const { mutate: deleteTodoMutation } = deleteTodoQuery(queryClient);
  const { mutate: updateTodoMutation } = updateTodoQuery(queryClient);

  // Actions

  // Authorized users

  const addTodo = (newTodo: Todo) => {
    if (!isAuthenticated) {
      todosDemo.value.push({
        ...newTodo,
        _id: Math.floor(Math.random() * 100000).toString(),
        status: 'pending',
        createdAt: new Date(),
      });

      toast$.warning(
        'Your Todo List well not saved please login , to track your progress'
      );
      return;
    }
    if (!newTodo.title.trim()) {
      throw new Error('Todo title cannot be empty');
    }
    addTodoMutation(newTodo);
  };

  const deleteTodo = async (todoId: string) => {
    if (!isAuthenticated) {
      todosDemo.value = todosDemo.value.filter((todo) => todo._id !== todoId);
      return;
    }
    deleteTodoMutation(todoId);
  };

  const updateTodo = async (id: string, status: Status) => {
    if (!isAuthenticated) {
      todosDemo.value = todosDemo.value.map((todo) =>
        todo._id === id
          ? {
              ...todo,
              status,
            }
          : todo
      );
      return;
    }
    updateTodoMutation({ _id: id, status });
  };

  // getters

  const getTodos = computed<Todo[]>(() => {
    const source = isAuthenticated ? todos.value.data : todosDemo.value;
    return [...source].sort(
      (a: TodoResponse, b: TodoResponse) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  });

  const getTodosByStatus = (status: Status): Todo[] =>
    getTodos.value.filter((todo: Todo) => todo.status === status);

  const todoCount = computed(() => getTodos.value.length);

  const completedTodo = computed(() => getTodosByStatus('completed'));
  const pendingTodo = computed(() => getTodosByStatus('pending'));
  const inProgressTodo = computed(() => getTodosByStatus('in-progress'));
  const isLoading = computed(() => isFetching.value);
  const isAddingTodo = computed(() => AddingTodo.value);

  const todoStats = computed(() => ({
    total: getTodos.value.length,
    completed: completedTodo.value.length,
    pending: pendingTodo.value.length,
    inProgress: inProgressTodo.value.length,
  }));

  const isEmpty = computed(() => getTodos.value.length === 0);

  return {
    // Data
    todos: getTodos,

    //Getters
    isEmpty,
    todoCount,
    completedTodo,
    pendingTodo,
    inProgressTodo,
    isLoading,
    todoStats,
    isAddingTodo,
    // actions
    addTodo,
    deleteTodo,
    updateTodo,
  };
});
