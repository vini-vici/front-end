import config from '@/config.json';
import { Todo } from '@/redux/todos/todos.reducer';

export async function listTodos(token: string): Promise<Todo[]> {
  return fetch(config.API,{
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => {
      if(res.ok) return res.json();
      throw Error('Bad request response.' + res.status + ' ' + res.statusText);
    });
}

export async function addTodo(todo: Omit<Todo, 'id'>, token: string): Promise<string> {
  return fetch(config.API, {
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'PUT',
    body: JSON.stringify(todo)
  })
    .then(async res => {
      const idString = await res.json();
      return idString;
    });
}

export async function updateTodo(id: string, data: Partial<Todo>, token: string): Promise<Todo> {
  return fetch(config.API + id, {
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
    .then(res => {
      if(res.ok) return res.json();
      throw Error(`Bad request response. ${res.status} ${res.statusText}`);
    });
}

export async function deleteTodo(id: string, token: string): Promise<boolean> {
  const response = await fetch(config.API + id, {
    mode: 'cors',
    headers: {
      Authorization: `Bearer ${token}`
    },
    method: 'DELETE'
  });
  return response.ok;
}