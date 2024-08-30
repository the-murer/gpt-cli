import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Box, Typography, Modal } from "@mui/material";

import logo from '../../logo.png';
import ConfigModal from "../assistants/modal";
import KeyModal from "../assistants/key_modal";
import AssistantModal from "./assistants_modal";
import ImagesModal from "./images_modal";

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

export default function NavbarComponent({ openAiClient, assistants, setAssitants, setactiveAssistant }) {
  const [openInfo, setOpenInfo] = useState(false);
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const [isOpenKey, setIsOpenKey] = useState(false);
  const [isOpenAssistant, setOpenAssistant] = useState(false);
  const [isOpenImage, setOpenImage] = useState(false);

  const handleOpenConfig = () => setIsOpenConfig(true);
  const handleCloseConfig = () => setIsOpenConfig(false);

  const handleOpenKey = () => setIsOpenKey(true);
  const handleCloseKey = () => setIsOpenKey(false);
  
  const handleOpenInfo = () => setOpenInfo(true);
  const handleCloseInfo = () => setOpenInfo(false);
  
  const handleOpenAssistant = () => setOpenAssistant(true);
  const handleCloseAssistant = () => setOpenAssistant(false);
  
  const handleOpenImage = () => setOpenImage(true);
  const handleCloseImage = () => setOpenImage(false);


  const createChat = async (name, model, instructions) => {
    localStorage.getItem(assistants);
    if (!openAiClient) return;
    try {
      
      const assistant = await openAiClient.beta.assistants.create({
        name,
        instructions,
        model,
        tools: [{ type: "code_interpreter" }],
      });
      console.log("🚀 ~ createChat ~ name:", name)
      const newAssitants = [...assistants, { assistantId: assistant.id, name, model, instructions }];
      setAssitants(newAssitants)
      localStorage.setItem('assistants',JSON.stringify(newAssitants));
      console.log("🚀 ~ createChat ~ assistant:", assistant)
      setactiveAssistant(assistant.id)
    } catch (error) {
      console.error(error.message); 
    }
  }

  return (
    <Navbar bg="black" className="mb-4" expand="lg">
      <Navbar.Brand className="text-light" href="/">    
        <img width={40} src={logo} className="logo" alt="logo" />
        {' GPT CLi'}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link onClick={handleOpenConfig} className="text-light">Create Assistant</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link onClick={handleOpenKey} className="text-light">Configure</Nav.Link>
        </Nav>
        <Nav className="mr-auto">
          <Nav.Link onClick={handleOpenImage} className="text-light">Images</Nav.Link>
        </Nav>
        {window.innerWidth < 967 && (<Nav className="mr-auto">
          <Nav.Link onClick={handleOpenAssistant} className="text-light">Assistant</Nav.Link>
        </Nav>)}
        <Nav className="mr-auto">
          <Nav.Link onClick={handleOpenInfo} className="text-light">Info</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <ConfigModal onCreate={createChat} isOpen={isOpenConfig} handleClose={handleCloseConfig} />
      <KeyModal isOpen={isOpenKey} handleClose={handleCloseKey} />
      <AssistantModal assistants={assistants} setactiveAssistant={setactiveAssistant} isOpen={isOpenAssistant} handleClose={handleCloseAssistant} />
      <ImagesModal openAiClient={openAiClient} isOpen={isOpenImage} handleClose={handleCloseImage} /> 
      <Modal
        open={openInfo}
        onClose={handleCloseInfo}
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
