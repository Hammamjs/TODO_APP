import { computed, type Ref } from 'vue';
import { useTodoStore } from '@/store/useTodos';
import type { TaskProps } from '@/types/Todo';

const useTaskList = (
  props: TaskProps
): {
  uppercaseValue: Ref<string>;
  handleDeleteTodo: (todoId: string) => void;
} => {
  const uppercaseValue = computed(() =>
    props.computedVal
      .split('-')
      .map((val) => val.charAt(0).toUpperCase() + val.slice(1))
      .join(' ')
  );

  const { deleteTodo } = useTodoStore();
  const handleDeleteTodo = (todoId: string) => {
    deleteTodo(todoId);
  };

  return {
    uppercaseValue,
    handleDeleteTodo,
  };
};

export default useTaskList;
