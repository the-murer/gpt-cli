import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Button } from '@mui/material';
import { Copy, CopyCheck } from 'lucide-react';

const Message = ({ message }) => {
  const [copied, setCopied] = useState(null)

  const parseContent = (content) => {
    const codeRegex = /```(\w+)?\n([\s\S]*?)```/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = codeRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', content: content.slice(lastIndex, match.index) });
      }
      parts.push({
        type: 'code',
        language: match[1] || 'javascript',
        content: match[2].trim()
      });
      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < content.length) {
      parts.push({ type: 'text', content: content.slice(lastIndex) });
    }

    return parts;
  };

  const renderPart = (part, index) => {
    if (part.type === 'text') {
      return part.content.split('\n').map((text, i) => (
        <React.Fragment key={`${index}-${i}`}>
          {text}
          <br />
        </React.Fragment>
      ));
    } else if (part.type === 'code') {
      return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Editor
            key={`${index}-code`}
            language={part.language}
            value={part.content}
            theme="vs-dark"
            height="200px"
            
            />
          <Button
            style={{ width: '110px', marginTop: '5px' }}
            variant='outlined'
            onClick={() => {
              setCopied(index)
              setTimeout(() => setCopied(null), 5000)
            }}
          >
            {copied === index ? <CopyCheck /> : <Copy />}
            {copied === index ? ' Copied' : ' Copy'}
          </Button>
        </div>
      );
    }
  };

  const parsedContent = parseContent(message.content);
  return (
    <div style={{ textAlign: message.isUser ? "right" : "left", margin: "8px" }}>
      <div
        style={{
          color: message.isUser ? "#ffffff" : "#000000",
          backgroundColor: message.isUser ? "#1186fe" : "#eaeaea",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {parsedContent.map((part, index) => renderPart(part, index))}
      </div>
    </div>
  );
};

export default Message;
