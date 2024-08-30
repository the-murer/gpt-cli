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

export default function KeyModal({ isOpen, handleClose }) {
  const [key, setKey] = React.useState(localStorage.getItem('apiKey'));

  const setApiKey = () => {
    localStorage.setItem('apiKey', key);
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
            Set your OpenAI KEY
          </Typography>
          <TextField label="OpenAI Key" variant="standard" fullWidth value={key} onChange={(e) => setKey(e.target.value)} />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 10 }}>
          <Button variant='contained' onClick={setApiKey}>
            Save
          </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
