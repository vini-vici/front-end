import { Todo } from '@/components/todos/todo.component';

export function generateTodos(count = 10): Todo[] {
  return Array.from({ length: count }, ((v, i) => ({
    id: i.toFixed(10),
    title: `Todo ${i}`,
    done: Math.random() < 0.5 ? true : false,
    description: Math.random() < 0.5 ? undefined : `Description ${i}`
  })));
}