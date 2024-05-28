import React, { useState } from 'react';
import { TextField, Button, Grid, Box } from '@mui/material';
import { addTodo } from './api';
import { v4 as uuidv4 } from 'uuid';

const AddTodo = ({ setTodos }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      const newTodo = await addTodo({
        todoID: uuidv4(),
        title,
        desc,
        completed: false,
      });
      setTodos((prev) => [...prev, newTodo]);
      setTitle('');
      setDesc('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', mb: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Description"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            fullWidth
            required
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" 
          sx={{
            height: 45,
            width: 115,
            display: 'block',
            marginLeft: 'auto',
          }}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AddTodo;
