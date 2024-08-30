import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  borderRadius: 2,
  p: 4,
};

export default function ConfigModal({ onCreate, isOpen, handleClose }) {
  const [name, setName] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [model, setModel] = React.useState('gpt-4o-mini');

  const createAssistant = () => {
    onCreate(name, model, instructions);
    setModel('gpt-4o-mini');
    setInstructions('');
    setName('');
    handleClose();
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Configure New Assistant
          </Typography>
          <TextField label="Name" variant="standard" fullWidth value={name} onChange={(e) => setName(e.target.value)} />
          <br />
          <br />
          <TextField label="Instructions" variant="standard" fullWidth value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          <br />
          <br />
          <TextField label="Model" variant="standard" fullWidth value={model} onChange={(e) => setModel(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button variant='contained' onClick={createAssistant}>
            Save
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
