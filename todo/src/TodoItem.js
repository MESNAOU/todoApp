import React, { useState } from 'react';
import { ListItem, ListItemText, IconButton, Paper, Divider } from '@mui/material';
import { Delete, CheckCircle } from '@mui/icons-material';
import { toggleTodo, deleteTodo } from './api';
import './css.css';
import EditTodoModal from './editPopUp';

const TodoItem = ({ todo, setTodos }) => {
  const [clicked, setClicked] = useState(false);


  const handleToggle = async () => {
    const updatedTodo = await toggleTodo(todo.todoID, {
      completed: !todo.completed
    });
    setTodos((prev) =>
      prev.map((t) => (t.todoID === todo.todoID ? updatedTodo : t))
    );
  };

  const handleDelete = async () => {
    await deleteTodo(todo.todoID);
    setTodos((prev) => prev.filter((t) => t.todoID !== todo.todoID));
  };

  return (
    <Paper elevation={3} sx={{ padding: 1, mt: 1 }} className='todo-item'> 
      <ListItem 
      secondaryAction={
        <>
          <IconButton edge="end" onClick={handleToggle}>
            <CheckCircle color={todo.completed ? 'primary' : 'default'} />
          </IconButton>
          <IconButton edge="end" onClick={handleDelete}>
            <Delete color='error'/>
          </IconButton>
        </>
      }>
        <ListItemText
        primary={todo.title}
        style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
        onClick={()=>setClicked(!clicked)}
        />
      </ListItem>
      {
          clicked &&
          <>
            <Divider sx={{mb: 2}}/>
            <ListItem >
              <ListItemText 
              align = 'center'
              primary={todo.description}
              />
            </ListItem>
            <ListItem>
              <EditTodoModal
              todo={todo}
              setTodos={ setTodos }
              />
            </ListItem>
          </>
        }
    </Paper>
  );
};

export default TodoItem;
