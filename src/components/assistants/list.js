import KeyModal from './key_modal';
import ConfigModal from './modal';
import { Button, Col, ListGroup } from "react-bootstrap";

function Assistants({ setactiveAssistant, openAiClient, assistants, setAssitants }) {
  
  const createChat = async (assistantId, name, model, instructions) => {
    localStorage.getItem(assistants);
    if (!openAiClient) return;
    const assistant = await openAiClient.beta.assistants.create({
      name,
      instructions,
      model,
      tools: [{ type: "code_interpreter" }],
    });
    const newAssitants = [...assistants, { assistantId: assistant.id, name, model, instructions }];
    setAssitants(newAssitants)
    localStorage.setItem('assistants',JSON.stringify(newAssitants));
    setactiveAssistant(assistantId)
  }
  
  return (
    <Col xs={4}>
        <div className="sidebar-card">
          <div className="d-flex justify-content-between align-items-center">
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <h4 className="mb-0">{'Chats '}</h4>
              &nbsp; 
              &nbsp; 
              <KeyModal />
            </div>
            
            <ConfigModal onCreate={createChat} />
          </div>
          <hr />
          <ListGroup variant="flush" className="sidebar-list">
            {assistants.map((a) => (
                <ListGroup.Item  key={a.assistantId} className="list-item" style={{ display: "flex", padding: "10px", justifyContent: "space-between" }} >
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h6>{` ${a?.name}`}</h6>
                  </div>
                  <Button onClick={() => setactiveAssistant(a.assistantId)} variant="outline-primary" size="sm" style={{ marginLeft: "10px", maxHeight: "30px" }}>
                   Ver conversa
                 </Button>
                </ListGroup.Item>
            ))}
          </ListGroup>
         </div>
    </Col>
  );
}

export default Assistants;
