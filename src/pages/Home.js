import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Home.css'; // Adjust the import path as per your project structure
import icon from '../assets/reflecto.png';

function Home() {
  const navigate = useNavigate();
  
  return (
    <div className="home-container">
      <img src={icon} alt="Medgpt Icon" className="icon" />
      <h2 className="large-text">Reflecto</h2>
      <h2 className="small-text">Self Reflection with AI</h2>
      <div className="button-container">
        <button className="button" onClick={() => navigate('/input')}>Start</button>
      </div>
    </div>
  );
}

export default Home;
