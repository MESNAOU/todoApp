import React, { useEffect, useState } from 'react';
import TodoList from './TodoList';
import AddTodo from './AddTodo';
import { Container, Typography, Box, Divider } from '@mui/material';
import { fetchTodos } from './api';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todosFromServer = await fetchTodos();
      setTodos(todosFromServer);
    };
    getTodos();
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 3, mb: 1 }}>
        <Typography variant="h3" component="h1">
        New Todo
        </Typography>
      </Box>
      <AddTodo setTodos={setTodos} />
      <Divider sx={{mb: 2}}/>
      <Typography variant="h3" component="h1">
        Todo List
      </Typography>
      <TodoList todos={todos} setTodos={setTodos} />
    </Container>
  );
};

export default App;
