import ChatInterface from './components/chat/chat';
import Assistants from './components/assistants/list';
import { useEffect, useState } from 'react';
import OpenAI from 'openai';
import { Container } from '@mui/material';
import NavbarComponent from './components/header';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [assistantId, setAssistant] = useState()
  const [assistants, setAssistants] = useState(localStorage.getItem('assistants') ? JSON.parse(localStorage.getItem('assistants')) : [])
  const [openAiClient, setOpenAiClient] = useState()


  const setactiveAssistant = (assistant) => {
    setAssistant(assistant);
  }

  useEffect(() => {
    const apiKey = localStorage.getItem('apiKey')
    if (apiKey) {
      const openai = new OpenAI({ apiKey: apiKey, dangerouslyAllowBrowser: true });
      setOpenAiClient(openai)
    }
  }, [])


  return (
    <div style={{ backgroundColor: "#222244", height: "100vh" }}>
      <NavbarComponent  openAiClient={openAiClient} assistants={assistants} setAssitants={setAssistants} setactiveAssistant={setactiveAssistant} />
      <Container style={{ height: "80%", width: "90%", backgroundColor: "white", padding: "20px", borderRadius: "10px" }}>
        <div style={{ display: "flex", flexDirection: "row" }}>  
        {window.innerWidth > 967 && (
          <Assistants 
            openAiClient={openAiClient} 
            setactiveAssistant={setactiveAssistant}
            assistants={assistants}
            setAssitants={setAssistants}
            />
          )}
        <ChatInterface 
          openAiClient={openAiClient} 
          activeAssistant={assistantId} 
          setActiveAssistant={setactiveAssistant}
          assistants={assistants}
          setAssistants={setAssistants}
        />
        </div>
      </Container>
      </div>
  );
}

export default App;
