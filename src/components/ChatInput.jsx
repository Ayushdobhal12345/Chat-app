import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) { // Ensure the input is not just whitespace
      onSend(input);
      setInput(''); // Clear the input after sending
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') { // Check if the Enter key is pressed
      e.preventDefault(); // Prevent the default behavior (like adding a new line)
      handleSend(); // Call the send function
    }
  };

  return (
    <div className="chat-input">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown} // Add the key down event
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default ChatInput;
