
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TextField, Button, Container, Grid, CircularProgress } from "@mui/material";
import Message from "./Message";
import { Trash } from "lucide-react";

function generateRandomString() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const ChatInterface = ({ openAiClient, activeAssistant, setActiveAssistant, setAssistants, assistants }) => {
  const [isWaiting, setIsWaiting] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const initChatBot = useCallback(async () => {
    const thread = await openAiClient.beta.threads.create();
    localStorage.setItem(`${activeAssistant}:info`, JSON.stringify({ thread, storedMessages: [] }));
    setThread(thread);
  }, [openAiClient, activeAssistant]);
  
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  

  useEffect(() => {
    if (!openAiClient || !activeAssistant) return;
    
    const assistantInfo = localStorage.getItem(`${activeAssistant}:info`);

    if (assistantInfo?.length) {
      const { thread, storedMessages } = JSON.parse(assistantInfo) 
    
      setThread(thread)
      setMessages(storedMessages);
    } else {
      initChatBot();
    }
  }, [openAiClient, activeAssistant, initChatBot]);

  const handleSendMessage = async () => {
    setIsWaiting(true);
    const newMessages = [...messages, { content: input, isUser: true, id: generateRandomString() }];
    setMessages(newMessages)
    setInput("");
  
    await openAiClient.beta.threads.messages.create(thread.id, { role: "user", content: input });
    const run = await openAiClient.beta.threads.runs.create(thread.id, { assistant_id: activeAssistant });
    let response = await openAiClient.beta.threads.runs.retrieve(thread.id, run.id);
  
    while (response.status === "in_progress" || response.status === "queued") {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      response = await openAiClient.beta.threads.runs.retrieve(thread.id, run.id);
    }
  
    setIsWaiting(false);
  
    const messageList = await openAiClient.beta.threads.messages.list(thread.id);
    const lastMessage = messageList.data.filter((message) => message.run_id === run.id && message.role === "assistant").pop();
  
    if (lastMessage) {
      const storedMessages = [...newMessages, { content: lastMessage.content[0]["text"].value, isUser: false, id: generateRandomString() }];
      setMessages(storedMessages);
      localStorage.setItem(`${activeAssistant}:info`, JSON.stringify({ thread, storedMessages }));
    } else {
      setMessages(newMessages);
    }
  };

  const removeAssitant = async () => {
    const assistantInfo = localStorage.getItem(`${activeAssistant}:info`);
    if (assistantInfo?.length) {
      const newAssistants = assistants.filter((assistant) => assistant.assistantId !== activeAssistant);
      localStorage.removeItem(`${activeAssistant}:info`);
      localStorage.setItem('assistants', JSON.stringify(newAssistants));
      setAssistants(newAssistants);
      setActiveAssistant(null);
    }
  }
  

  if (!activeAssistant) {
    return (
      <Container className="sm-9">
        <h2>Select one assistant</h2>
      </Container>
    );
  }
  return (
    <Container className="sm-9">
      <h2>
        {assistants?.find((assistant) => assistant.assistantId === activeAssistant)?.name}
      <Button color="error" onClick={removeAssitant}>
        <Trash />
      </Button>
      </h2>
      <hr />
      <div style={{ height: '60vh', overflow: 'scroll' }}>
        {messages.map((message) => (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: message.isUser ? "flex-end" : "flex-start"
            }}
            key={message.id}
          >
            <Message message={message} />
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "15px", bottom: "0" }}>
        <TextField
          style={{ marginRight: "10px" }}
          label="Write your message"
          variant="outlined"
          fullWidth
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) =>  e.key === "Enter" ? handleSendMessage() : null }
        />
        <Grid item>
          <Button
            style={{ height: "50px", marginTop: "3px" }}
            variant="contained"
            color="primary"
            disabled={isWaiting}
            onClick={() => {
              handleSendMessage(input);
              setInput("");
            }}
          >
            Enviar
            {isWaiting && <CircularProgress size={24} style={{ marginLeft: "10px" }} />}
          </Button>
        </Grid>
      </div>
    </Container>
  );
};

export default ChatInterface;
