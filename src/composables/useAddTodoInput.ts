import { useAuthStore } from '@/store/useAuthStore';
import { useTodoStore } from '@/store/useTodos';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const useAddTodoInput = () => {
  const title = ref('');

  const todoStore = useTodoStore();

  const { user } = useAuthStore();

  const { addTodo } = todoStore;
  const { isAddingTodo } = storeToRefs(todoStore);
  const handleAddNewTodo = () => {
    if (!title.value.trim()) return;
    addTodo({ title: title.value, user: user._id ?? 'temp' });
    title.value = '';
  };

  return { title, isAddingTodo, handleAddNewTodo };
};

export default useAddTodoInput;
