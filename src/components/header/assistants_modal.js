import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { ListGroup } from 'react-bootstrap';

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

export default function AssistantModal({ assistants, setactiveAssistant, isOpen, handleClose }) {
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Assistants
          </Typography>
        <ListGroup variant="flush" className="sidebar-list">
          {assistants.map((a) => (
              <ListGroup.Item  key={a.assistantId} className="list-item" style={{ display: "flex", padding: "10px", justifyContent: "space-between" }} >
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <h6>{` ${a?.name}`}</h6>
                </div>
                <Button onClick={() => setactiveAssistant(a.assistantId)} size='small' variant='outlined' style={{ marginLeft: "10px", maxHeight: "30px" }}>
                 Chat
               </Button>
              </ListGroup.Item>
          ))}
        </ListGroup>
        </Box>
      </Modal>
    </div>
  );
}
