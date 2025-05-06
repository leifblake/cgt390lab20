import React, { useState } from 'react';
import responses from '../data/responses.json';

export default function Chatbox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! I’m your helper bot. Ask me anything about this app.' }
  ]);
  const [draft, setDraft] = useState('');

  const toggleOpen = () => setOpen(o => !o);

  const handleSend = () => {
    const text = draft.trim();
    if (!text) return;
    setMessages(ms => [...ms, { from: 'user', text }]);
    setDraft('');

    setTimeout(() => {
      const key = Object.keys(responses)
        .find(k => k !== 'default' && text.toLowerCase().includes(k));
      const reply = responses[key] || responses.default;
      setMessages(ms => [...ms, { from: 'bot', text: reply }]);
    }, 1000);
  };

  const styles = {
    toggle: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      backgroundColor: '#007bff',
      color: 'white',
      fontSize: '24px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
      zIndex: 1000,
    },
    window: {
      position: 'fixed',
      bottom: '90px',
      right: '24px',
      width: '300px',
      maxHeight: '400px',
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000,
    },
    header: {
      padding: '8px',
      backgroundColor: '#007bff',
      color: 'white',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      fontSize: '14px',
    },
    body: {
      flex: 1,
      padding: '8px',
      overflowY: 'auto',
      backgroundColor: '#f9f9f9',
    },
    messageBase: {
      marginBottom: '8px',
      padding: '6px 10px',
      borderRadius: '12px',
      maxWidth: '80%',
      wordWrap: 'break-word',
    },
    userMessage: {
      backgroundColor: '#007bff',
      color: 'white',
      alignSelf: 'flex-end',
    },
    botMessage: {
      backgroundColor: '#e1e1e1',
      color: '#333',
      alignSelf: 'flex-start',
    },
    inputContainer: {
      display: 'flex',
      borderTop: '1px solid #ddd',
    },
    input: {
      flex: 1,
      padding: '8px',
      border: 'none',
      borderBottomLeftRadius: '8px',
      outline: 'none',
    },
    sendButton: {
      padding: '0 16px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      borderBottomRightRadius: '8px',
      cursor: 'pointer',
    },
  };

  return (
    <>
      <button style={styles.toggle} onClick={toggleOpen}>
        {open ? '×' : '💬'}
      </button>

      {open && (
        <div style={styles.window}>
          <div style={styles.header}>
            <strong>Help Bot</strong>
          </div>

          <div style={styles.body}>
            {messages.map((m, i) => {
              const isUser = m.from === 'user';
              return (
                <div
                  key={i}
                  style={{
                    ...styles.messageBase,
                    ...(isUser ? styles.userMessage : styles.botMessage),
                  }}
                >
                  {m.text}
                </div>
              );
            })}
          </div>

          <div style={styles.inputContainer}>
            <input
              style={styles.input}
              type="text"
              value={draft}
              placeholder="Type a message..."
              onChange={e => setDraft(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
            />
            <button style={styles.sendButton} onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
}
