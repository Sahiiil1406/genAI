// src/ChatPage.js
import React, { useState } from 'react';
import axios from 'axios';
import './ChatPage.css'; // For styling

const ChatPage = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const handleInputChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (!message) return;

        // Add user message to the chat
        const newMessages = [...messages, { sender: 'User', text: message }];
        setMessages(newMessages);
        setMessage('');

        try {
            const response = await axios.post('YOUR_GEMINI_API_URL', { message });
            const botMessage = response.data.reply; // Adjust this based on the actual API response
            setMessages((prev) => [...prev, { sender: 'Bot', text: botMessage }]);
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div className="chat-container">
            <h1 className="chat-title">Pokémon Chat</h1>
            <div className="message-list">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender.toLowerCase()}`}>
                        <span>{msg.sender}: </span>
                        <span>{msg.text}</span>
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={message}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button onClick={handleSendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
