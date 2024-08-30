import { KeyRound } from 'lucide-react';
import KeyModal from './key_modal';
import ConfigModal from './modal';
import { Col, ListGroup } from "react-bootstrap";
import { useState } from 'react';
import { Button } from '@mui/material';

function Assistants({ setactiveAssistant, openAiClient, assistants, setAssitants }) {
  const [isOpenConfig, setIsOpenConfig] = useState(false);
  const [isOpenKey, setIsOpenKey] = useState(false);

  const handleOpenConfig = () => setIsOpenConfig(true);
  const handleCloseConfig = () => setIsOpenConfig(false);

  const handleOpenKey = () => setIsOpenKey(true);
  const handleCloseKey = () => setIsOpenKey(false);
  
  
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
    <Col sm={4}>
      <KeyModal isOpen={isOpenKey} handleClose={handleCloseKey} />
      <ConfigModal onCreate={createChat} isOpen={isOpenConfig} handleClose={handleCloseConfig} />
      <div className="sidebar-card">
        <div className="d-flex justify-content-between align-items-center">
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <h4 className="mb-0">{'Chats '}</h4>
            &nbsp; 
            &nbsp; 
            <Button size='small' variant='outlined' onClick={handleOpenKey}>
              <KeyRound />
            </Button>
          </div>
          <Button onClick={handleOpenConfig}>Create Assitant</Button>
        </div>
        <hr />
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
      </div>
    </Col>
  );
}

export default Assistants;
