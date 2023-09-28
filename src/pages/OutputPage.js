import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../pages-css/OutputPage.css'; // Adjust the import path as per your project structure

const API_URL = 'https://api.openai.com/v1/chat/completions';
const API_KEY = "INSERT API KEY";

const OutputPage = ({ messages }) => {
  const location = useLocation();
  const { state } = location;

  const [summary, setSummary] = useState({ date: '', content: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      try {
        setLoading(true);
        const userMessages = state.messages.filter((message) => message.role !== 'system');

        const response = await axios.post(
          API_URL,
          {
            model: 'gpt-3.5-turbo',
            messages: [
              ...userMessages,
              {
                role: 'user',
                content: `Based on the conversation provided above, please give a comprehensive psychotherapeutic analysis. Your response should include:

                1.	Summary of the Conversation:
              Provide a brief overview of the main points of the conversation and the topics discussed.
                2.	Analysis of the Conversation:
              Provide an analysis of the conversation from a psychotherapeutic perspective, focusing on the emotional and cognitive aspects observed in the dialogue. Identify any recurring themes, patterns of behavior, or indications of underlying thoughts or feelings.
                3.	Recommendations for Improvement:
              Offer suggestions on what the individual(s) can work on to foster better mental health and well-being. Outline potential steps or strategies that may contribute to personal development and improved communication. Please maintain a respectful and non-judgmental tone.`,
              },
            ],
          },
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const fetchedSummary = {
          date: new Date().toISOString(),
          content: response.data.choices[0].message.content.trim(),
        };
        setSummary(fetchedSummary);
        setLoading(false);
      } catch (error) {
        console.error('Error response from OpenAI:', error.response?.data);
        setLoading(false);
      }
    };

    if (state && state.messages) getSummary();
  }, [state]);

  return (
    <div className="container">
      {loading ? (
        <div className="loader">Loading...</div>
      ) : (
        <div className="outputBox">
          <p className="summaryText">{summary.content}</p>
          {summary.content && (
            <Link to="/">
              <button className="doneButton">Done</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
  
};

export default OutputPage;
