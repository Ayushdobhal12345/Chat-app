import React, { useState } from 'react';
import ChatInput from './ChatInput';
import Message from './Message';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: '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',
  dangerouslyAllowBrowser: true,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (userMessage) => {
    setMessages([...messages, { user: 'You', content: userMessage }]);

    try {
      const response = await anthropic.messages.create({
        model: 'claude-3-5-sonnet-20240620',
        max_tokens: 300,
        messages: [{ role: 'user', content: userMessage }],
      });

      console.log('API Response:', response); // Log the full response for debugging

      // Check if the response contains the message array
      const botMessage = response?.content?.[0] || 'No response from the bot';

      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Bot', content: botMessage },
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { user: 'Bot', content: 'Error fetching response' },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="message-list">
        {messages.map((msg, index) => (
          <Message key={index} user={msg.user} content={msg.content} />
        ))}
      </div>
      <ChatInput onSend={sendMessage} />
    </div>
  );
};

export default Chat;
