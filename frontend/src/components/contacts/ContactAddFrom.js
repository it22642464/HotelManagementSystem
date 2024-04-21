import React, { useState } from 'react';
import axios from 'axios';

function ContactAddForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    massage: '',
   
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/contacts/add', formData);
      console.log('Feedback submitted successfully!', response.data);
      setFormData({
        name: '',
        email: '',
        subject: '',
        massage: ''

      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };


  return (
   
    <div className="contactform-container">
            <h2> Contact us</h2>
            
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>subject:</label>
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
                </div>
                <div>
                    <label>Question:</label>
                    <textarea name="massage" value={formData.massage} onChange={handleChange} rows="10" cols="50" required></textarea>

                </div>
                
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ContactAddForm;
