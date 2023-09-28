import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../pages-css/Input.css';

function CustomButton({ title, onPress, style }) {
  return (
    <button onClick={onPress} className={`buttonContainer ${style}`}>
      {title}
    </button>
  );
}

function InputPage() {
  const [context, setContext] = useState('');
  const [background, setBackground] = useState('');
  const [conditions, setConditions] = useState('');
  const [expectations, setExpectations] = useState('');

  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/chatpage', { state: { context, background,conditions  , expectations } });
  };

  return (
    <div className='centered-container'> {/* Apply centering styles here */}
      <div className='input-container'>
        <div className='textarea-wrapper'>
        <label className='label'>Context:</label>
        <textarea 
          className='inputBox'
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder='Can you briefly describe the situation? What is its current status and how has it developed?'
        />

        <label className='label'>Background:</label>
        <textarea 
          className='inputBox'
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          placeholder='Can you provide a little background of yourself?'
        />

        <label className='label'>Conditions:</label>
        <textarea 
          className='inputBox'
          value={conditions}
          onChange={(e) => setConditions(e.target.value)}
          placeholder='Do you have any existing medical conditions?'
        />

        <label className='label'>Expectations:</label>
        <textarea 
          className='inputBox'
          value={expectations}
          onChange={(e) => setExpectations(e.target.value)}
          placeholder='What do you hope to get out of this consultation?'
        />
      </div>
      
      <div className='button-centered-container'>
        <CustomButton
          title='SUBMIT'
          onPress={handleSubmit}
          style='submit-button-input'
        />
        </div>
      </div>
    </div>
  );
}

export default InputPage;