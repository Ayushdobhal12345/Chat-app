import React from 'react';


const Message = ({ user, content }) => {
  const messageContent = typeof content === 'object' ? content.text : content;

  return (
    <div className={`message-container ${user === 'You' ? 'right' : 'left'}`}>
      <div className={`message-bubble ${user === 'You' ? 'user-message' : 'bot-message'}`}>
        <strong>{user}:</strong> <span>{messageContent}</span>
      </div>
    </div>
  );
};

export default Message;
