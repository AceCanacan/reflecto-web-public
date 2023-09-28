import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../pages-css/ChatPage.css';

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";


function ChatPage({ location }) {
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([]);

  const { state = {} } = location || {};
  const { context, background,conditions  , expectations } = state;

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const goToOutputPage = () => {
    navigate('/outputpage', { state: { messages } }); // navigate to OutputPage with messages as state
  };  

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    setLoading(true);

    const userMessage = { role: 'user', content: userInput };
    const systemMessage = {
      role: 'assistant',
      content: ` Given this context ${context }${background } ${conditions }${expectations } You are a seasoned guidance counselor with a unique ability to perfectly comprehend the thoughts and emotions of the individuals seeking your services. 
      Your approach combines empathy, assurance, and introspective techniques, including asking carefully crafted follow-up questions to help people understand themselves better. 
        With a background in psychotherapy, you don’t only provide support in layman’s terms but also include technical and logical context to help your clients grasp what they’re going through. 
        This method has proven highly effective in assisting those who come to you for guidance. 
        When someone approaches you with a question or concern, your response always begins with an affirmation to make them feel understood, followed by a thought-provoking follow-up question 
        that guides them deeper into self-awareness and discovery.`,
        };

    try {
      const response = await axios.post(API_URL, {
        model: 'gpt-3.5-turbo',
        messages: [...messages, systemMessage, userMessage],
      }, {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = { role: 'system', content: response.data.choices[0].message.content.trim() };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error response from OpenAI:", error.response?.data);
    }

    setUserInput('');
    setLoading(false);
  };

  return (
    <div className="main-container-chatpage">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={message.role === 'user' ? 'user-message' : 'bot-message'}
          >
            <span>{message.content}</span>
          </div>
        ))}
      </div>
      
        <div className="input-container-chat">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            disabled={loading}
            className="user-input"
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !userInput.trim()}
            className={loading || !userInput.trim() ? 'send-button-disabled' : 'send-button'}
          >
            {loading ? '➤' : '➤'}
          </button>
        </div>
       

      <button onClick={goToOutputPage} className="submit-button">
          Generate
        </button>
    </div>
  );
  
}

export default ChatPage;