import apiInstance from './BaseUrl';

export const getTodosApi = async () => {
  const todos = await apiInstance.get('/tasks');
  return todos.data;
};

export const addTodoApi = async (newTodo: Todo) => {
  const todos = await apiInstance.post('/tasks', newTodo);
  return todos.data;
};

export const updateTodoApi = async (updatedTodo: Partial<Todo>) => {
  const todos = await apiInstance.put(`/tasks/${updatedTodo._id}`, updatedTodo);

  return todos.data;
};

export const deleteTodoApi = async (id: string) => {
  await apiInstance.delete(`/tasks/${id}`);
};
