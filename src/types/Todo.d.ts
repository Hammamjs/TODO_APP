type Status = 'pending' | 'in-progress' | 'completed';

type Todo = {
  title: string;
  status?: Status;
  date?: Date;
  user: string;
  _id?: string;
};

interface TodoResponse extends Todo {
  createdAt: Date;
}

export interface TaskProps {
  computedVal: Status;
  statusButton: { BtnName: string; status: Status; classStyle: string }[];
  divColor: string;
  textColor: string;
  bgColor: string;
  todos: Todo[];
  todosLength: number;
}
