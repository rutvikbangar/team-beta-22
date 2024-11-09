import React, { useState } from "react";
import './AichatBot.css';

export default function AichatBot() {
    const [mychat, setMychat] = useState('');
    const [chatMessages, setChatMessages] = useState([]);
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    const generator = async () => {
        if (!mychat.trim()) {
            alert("Please enter a message.");
            return;
        }

        try {
            console.log('loading');
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [{ text: mychat }]
                            }
                        ]
                    })
                }
            );

            const data = await response.json();
            const content = data.candidates[0].content; 
            setChatMessages([...chatMessages, { user: mychat, bot: content.parts[0].text }]);
            setMychat(''); // Clear input after sending
        } catch (error) {
            console.error("Error generating content:", error);
        }
    };

    return (
        <div className="chat-container">
            <h1 style={{textAlign:'center'}}>MoodMate</h1>
            <div className="chat-box">
                {chatMessages.map((message, index) => (
                    <div key={index} className="chat-message">
                        <p className="user-message"><strong>User:</strong> {message.user}</p>
                        <p className="bot-message"><strong>MoodMate:</strong> {message.bot}</p>
                    </div>
                ))}
            </div>
            <input 
                type="text" 
                value={mychat} 
                onChange={(e) => setMychat(e.target.value)} 
                placeholder="Type your message..." 
                className="chat-input"
            />
            <button onClick={generator} className="chat-button">Generate</button>
        </div>
    );
}
