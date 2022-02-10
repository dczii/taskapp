import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const CreateTask = ({ open, handleClose, onSubmit, isLoading }) => {
  const [task, setTask] = useState('');
  const [owner, setOwner] = useState('');
  useEffect(() => {
    setTask('');
    setOwner('');
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <h2 style={{ textAlign: 'center' }}>CREATE TASK</h2>
        <TextField
          label='Task'
          size='small'
          fullWidth
          style={{ marginBottom: 8 }}
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <TextField
          label='Owner'
          size='small'
          fullWidth
          style={{ marginBottom: 16 }}
          value={owner}
          onChange={(e) => setOwner(e.target.value)}
        />
        <LoadingButton
          loading={isLoading}
          fullWidth
          variant='contained'
          onClick={() => onSubmit(task, owner)}
        >
          Submit
        </LoadingButton>
      </Box>
    </Modal>
  );
};
