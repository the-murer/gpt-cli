import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { Bolt } from 'lucide-react';

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

export default function KeyModal({ onCreate }) {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(localStorage.getItem('apiKey'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const setApiKey = () => {
    localStorage.setItem('apiKey', key);
    handleClose();
  }

  return (
    <div>
      <Button size='small' variant='outlined' onClick={handleOpen}>
        <Bolt />
      </Button>
      <Modal
        open={open}
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
