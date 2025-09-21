import {
  addTodoApi,
  deleteTodoApi,
  getTodosApi,
  updateTodoApi,
} from '@/api/todosApi';
import { useAuthStore } from '@/store/useAuthStore';
import type { Todo, TodoResponse } from '@/types/Todo';
import { QueryClient, useMutation, useQuery } from '@tanstack/vue-query';

const { user, isAuthenticated } = useAuthStore();

const useTodosQuery = () => {
  function getTodosQuery() {
    return useQuery({
      queryKey: ['getTodo'],
      queryFn: getTodosApi,
      staleTime: 1000 * 60 * 7,
      enabled: isAuthenticated,
      select: (res) => ({
        ...res,
        data: [...res.data].sort(
          (a: TodoResponse, b: TodoResponse) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
      }),
    });
  }

  function addTodoQuery(queryClient: QueryClient) {
    return useMutation<Todo, Error, Todo, { previousTodos: any }>({
      mutationKey: ['add-todo'],
      mutationFn: addTodoApi,
      onMutate: async (newTodo: Todo) => {
        await queryClient.cancelQueries({ queryKey: ['getTodos'] });
        const previousTodos = queryClient.getQueryData(['getTodos']);
        const optimisticUpdate: TodoResponse = {
          title: newTodo.title.trim(),
          _id: 'temp' + new Date().getTime().toString(),
          status: 'pending',
          user: user?._id,
          createdAt: new Date(),
        };

        queryClient.setQueryData(['getTodo'], (old: any) => ({
          status: old?.status,
          data: [...old.data, optimisticUpdate].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          ),
        }));
        return { previousTodos };
      },
      onError: (err, _newTodo, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(['getTodos'], context?.previousTodos);
        }
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['getTodo'] });
      },
    });
  }

  function deleteTodoQuery(queryClient: QueryClient) {
    return useMutation({
      mutationKey: ['delete-todo'],
      mutationFn: deleteTodoApi,
      onMutate: async (todoId) => {
        await queryClient.cancelQueries({ queryKey: ['getTodo'] });
        const previousTodos = queryClient.getQueryData(['getTodo']);
        queryClient.setQueryData(['getTodo'], (old: any) => ({
          status: 'Success',
          data: [...old.data].filter((todo: Todo) => todo._id !== todoId),
        }));
        return {
          previousTodos,
        };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getTodo'] });
      },
      onError: (err, _todoId, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(['getTodo'], context?.previousTodos);
        }
      },
    });
  }

  function updateTodoQuery(queryClient: QueryClient) {
    return useMutation({
      mutationFn: updateTodoApi,
      onMutate: async ({ _id, status }) => {
        await queryClient.cancelQueries({ queryKey: ['getTodo'] });
        const previousTodos = queryClient.getQueryData(['getTodo']);

        queryClient.setQueryData(['getTodo'], (old: any) => {
          const updatedData = old.data.map((todo: Todo) =>
            todo._id === _id
              ? {
                  ...todo,
                  status,
                }
              : todo
          );
          return {
            status: 'Success',
            data: updatedData,
          };
        });
        return { previousTodos };
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['getTodo'] });
      },
      onError: (err, _todo, context) => {
        if (context?.previousTodos) {
          queryClient.setQueryData(['getTodo'], context.previousTodos);
        }
      },
    });
  }

  return {
    getTodosQuery,
    addTodoQuery,
    deleteTodoQuery,
    updateTodoQuery,
  };
};

export default useTodosQuery;
