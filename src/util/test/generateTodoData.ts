import { Todo } from '@/redux/todos/todos.reducer';

export function generateTodos(count = 10): Todo[] {
  return new Array(count).fill(false).map((v, i)=> ({
    id: i.toFixed(10),
    title: `Todo ${i}`,
    done: Math.random() < 0.5 ? true : false,
    description: Math.random() < 0.5 ? undefined : `Description ${i}`
  }));
}