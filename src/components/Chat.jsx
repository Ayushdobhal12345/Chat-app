import React, { useState, useEffect, useRef } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import Anthropic from '@anthropic-ai/sdk';

// Use environment variable for API key
const anthropic = new Anthropic({
<<<<<<< HEAD
  apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
=======
  apiKey: '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',
>>>>>>> 8798b7f62f1699f9a4d160bd42c5d729914a542c
  dangerouslyAllowBrowser: true,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const messageEndRef = useRef(null); // Reference for scrolling

  const sendMessage = async (userMessage) => {
    setMessages(prevMessages => [...prevMessages, { user: 'You', content: userMessage }]);
    setLoading(true); // Set loading to true

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 300,
        messages: [{ role: 'user', content: userMessage }],
      });

      const botMessageArray = response.content;
      const botMessage = Array.isArray(botMessageArray) && botMessageArray.length > 0
        ? botMessageArray[0]
        : 'No response from the bot';

      setMessages(prevMessages => [
        ...prevMessages,
        { user: 'Bot', content: botMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { user: 'Bot', content: 'Error fetching response' },
      ]);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Scroll to the bottom of the message list when messages change
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="welcome-banner">Welcome to AI Chat Box...</div>
      <div className="message-list">
        {messages.map((msg, index) => (
          <Message key={index} user={msg.user} content={msg.content} />
        ))}
        {loading && <div className="loading-message">Loading...</div>}
        <div ref={messageEndRef} /> {/* Reference for scrolling */}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;
