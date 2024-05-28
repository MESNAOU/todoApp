import React, { useState } from 'react';
import { Button, TextField, Modal, Paper, Grid } from '@mui/material';
import { updateTodo } from './api';

const EditTodoModal = ({ todo, setTodos }) => {
  const [open, setOpen] = useState(false);
  const [editedTodo, setEditedTodo] = useState(todo);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTodo({
      ...editedTodo,
      [name]: value,
    });
  };

  const handleSave = () => {
    updateTodo(editedTodo);
    console.log(editedTodo)
    setTodos((prev) =>
        prev.map((t) => (t.todoID === todo.todoID ? editedTodo : t))
      );
    handleClose();
  };

  const handleCancel = () => {
    handleClose();
  };

  return (
    <>
      <Button variant="contained" color='warning'
          sx={{
            height: 45,
            width: 115,
            display: 'block',
            marginLeft: 'auto',
          }}
          onClick={handleOpen}
          >
            Edit
          </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <Paper sx={{ width: '100%', maxWidth: 'sm', padding: 2 }}>
            <h2 id="modal-title">Edit Todo</h2>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                    id="title"
                    label="Title"
                    fullWidth
                    required
                    variant="outlined"
                    value={editedTodo.title}
                    onChange={handleInputChange}
                    name="title"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    value={editedTodo.description}
                    onChange={handleInputChange}
                    name="description"
                    fullWidth
                    required
                    />
                </Grid>
            </Grid>
          <Button onClick={handleSave} sx={{mt: 1}}>Save</Button>
          <Button onClick={handleCancel} sx={{mt: 1}}>Cancel</Button>
        </Paper>
      </Modal>
    </>
  );
};

export default EditTodoModal;