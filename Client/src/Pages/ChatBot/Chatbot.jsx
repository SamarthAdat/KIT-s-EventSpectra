
import { useState } from 'react';
import axios from 'axios';
import { IoMdSend } from "react-icons/io";

function Chatbot() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [question, setQuestion] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [error, setError] = useState('');

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (!selectedCategory) {
        setError('Please select a category');
        return;
      }

      const formData = new FormData();
      formData.append('category', selectedCategory);
      formData.append('question', question);

      const response = await axios.post('http://localhost:5002/process_question', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const newChat = { question, response: response.data.response };
      setChatHistory([...chatHistory, newChat]);
      setQuestion('');
    } catch (error) {
      setError('Error processing request');
      console.error('Error processing request:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && e.shiftKey) {
      handleSubmit(e);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', backgroundColor: '#333', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)', color: '#fff' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>EventBuddy</h1>
      <form onSubmit={handleSubmit} >
        <div style={{ marginBottom: '20px' }}>
          <select value={selectedCategory} onChange={handleCategoryChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #fff', backgroundColor: '#444', color: '#fff' }}>
            <option value="">Select Category</option>
            <option value="Clubs">Clubs</option>
            <option value="Events">Events</option>
            <option value="Companies">Companies</option>
          </select>
        </div>

        
              <div
  style={{
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #fff',
    backgroundColor: '#444',
    color: '#fff',
    minHeight: '200px',
    marginTop: '20px',
    fontFamily: 'Arial, sans-serif',
    overflowY: 'auto',
    whiteSpace: 'pre-wrap', 
  }}
>
  {chatHistory.map((item, index) => (
    <div key={index}>
      <span style={{ color: 'red' }}>Question:</span> {item.question}<br />
      <span style={{ color: 'green' }}>Response:</span> {item.response}<br />
    </div>
  ))}
</div>

        {error && <p style={{ color: '#ff0000', marginTop: '10px', textAlign: 'center' }}>{error}</p>}
      <div className='flex gap-2'>

    
        <label style={{ display: 'block', marginBottom: '10px' }}>
          Enter your question:
          <input value={question} onChange={(e) => setQuestion(e.target.value)} onKeyPress={handleKeyPress} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #fff', backgroundColor: '#444', color: '#fff', minHeight: '50px' }}  />
        </label>
        <button type="submit" style={{ backgroundColor: 'white', borderRadius: '10%', padding: '15px', margin: '20px', border: 'none', cursor: 'pointer', marginLeft:'5px'}}>
          <IoMdSend style={{ fontSize: '24px', color: '#333' }} />
        </button>

        </div>
      </form>
    </div>
  );
}

export default Chatbot;
