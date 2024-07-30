import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Box, Typography, Modal } from "@mui/material";

import logo from '../../logo.png';

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

export default function NavbarComponent() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Navbar bg="black" className="mb-4" expand="lg">
      <Navbar.Brand className="text-light" href="/">    
        <img width={40} src={logo} className="logo" alt="logo" />
        {' GPT CLi'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleOpen} className="text-light">Info</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            GPT-CLI
          </Typography>
          <hr />
          <Typography id="modal-modal-title" variant="p" component="p">
            Simple based openAi client, easy to use.
            <br />
            Set your openAi key, and create persistable assistants that persists on local storage.
            <br />
            <br />
            I DONT MAKE USE OF YOUR KEY, ALL THE APLICATION DATA REMAINS IN LOCAL STORAGE
          </Typography>
        </Box>
      </Modal>
    </Navbar>
  );
}
