import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';

const TodoList = ({ todos, setTodos }) => (
    <List>
        {todos.map((todo, index) => (
            <TodoItem key={index} todo={todo} setTodos={setTodos} />
        ))}
    </List>
);

export default TodoList;
