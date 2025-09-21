import { ref } from 'vue';
import { useTodoStore } from '@/store/useTodos';
import { storeToRefs } from 'pinia';

const useTodoApp = () => {
  const todosStore = useTodoStore();

  const { inProgressTodo, completedTodo, pendingTodo, todoStats, isLoading } =
    storeToRefs(todosStore);

  const colors = ref({
    pending: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200',
    inProgress: 'bg-blue-100 text-blue-700 hover:bg-blue-200',
    completed: 'bg-green-100 text-green-700 hover:bg-green-200',
  });

  return {
    colors,
    inProgressTodo,
    completedTodo,
    pendingTodo,
    todoStats,
    isLoading,
  };
};

export default useTodoApp;
