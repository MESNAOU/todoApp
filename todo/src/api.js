const API_URL = 'https://9kk8fgkdmc.execute-api.us-east-1.amazonaws.com/dev';

export const fetchTodos = async () => {
  try {
    const response = await fetch(`${API_URL}/todos`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const todos = await response.json();
    return todos.Items;
  } catch (error) {
    console.error('Failed to fetch todos:', error);
    throw error;
  }
};

export const addTodo = async (todo) => {
  const response = await fetch(`${API_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  return await response.json();
};

export const updateTodo = async (todo) => {
  const response = await fetch(`${API_URL}/todos/${todo.todoID}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const rep = response.json();
  console.log(rep)
  return rep
};

export const toggleTodo = async (id, completed) => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(completed),
  });
  const response = await fetch(`${API_URL}/todos/${id}`);
  const todos = await response.json();
  return todos.Item;
};

export const deleteTodo = async (id) => {
  await fetch(`${API_URL}/todos/${id}`, {
    method: 'DELETE',
  });
};
