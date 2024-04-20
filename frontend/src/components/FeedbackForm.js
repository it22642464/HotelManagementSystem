import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StarRating from './StarRating';

import './styles.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    duration: '',
    howDidYouHear: '',
    quality: '',
    cleanliness: '',
    food: '',
    staff: '',
    suggestions: '',
    rating: 0,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setFormData({ ...formData, rating });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8070/feedback/add', formData);
      console.log('Feedback submitted successfully!', response.data);
      setFormData({
        name: '',
        email: '',
        duration: '',
        howDidYouHear: '',
        quality: '',
        cleanliness: '',
        food: '',
        staff: '',
        suggestions: '',
        rating: 0,
      });
      navigate(`/feedback/${response.data._id}`);
    } catch (error) {
      console.error('Error submitting feedback:', error);
      if (error.response) {
        console.log('Response data:', error.response.data);
      }
    }
  };


  return (
   
    <div className="form-container">
            <h2>Feedback Form</h2>
            <p1> Hotel Elephant Bay</p1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="duration-input">
                    <label>Duration of Your Stay (in days):</label>
                    <input type="number" name="duration" value={formData.duration} onChange={handleChange} min="1" required className="feedback-input"/>
                </div>
                <div>
                    <label>How Did You Hear About Our Hotel:</label>
                    <input type="text" name="howDidYouHear" value={formData.howDidYouHear} onChange={handleChange} required />
                </div>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td></td>
                                <td><label>Poor</label></td>
                                <td><label>Satisfactory</label></td>
                                <td><label>Good</label></td>
                                <td><label>Very Good</label></td>
                                <td><label>Excellent</label></td>
                            </tr>
                            <tr>
                                <td><label>Quality:</label></td>
                                <td><input type="radio" name="quality" value="poor" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="satisfactory" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="very_good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="quality" value="excellent" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Cleanliness:</label></td>
                                <td><input type="radio" name="cleanliness" value="poor" onChange={handleChange} required /></td>
                                <td><input type="radio" name="cleanliness" value="satisfactory" onChange={handleChange} required /></td>
                                <td><input type="radio" name="cleanliness" value="good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="cleanliness" value="very_good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="cleanliness" value="excellent" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Food:</label></td>
                                <td><input type="radio" name="food" value="poor" onChange={handleChange} required /></td>
                                <td><input type="radio" name="food" value="satisfactory" onChange={handleChange} required /></td>
                                <td><input type="radio" name="food" value="good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="food" value="very_good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="food" value="excellent" onChange={handleChange} required /></td>
                            </tr>
                            <tr>
                                <td><label>Staff:</label></td>
                                <td><input type="radio" name="staff" value="poor" onChange={handleChange} required /></td>
                                <td><input type="radio" name="staff" value="satisfactory" onChange={handleChange} required /></td>
                                <td><input type="radio" name="staff" value="good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="staff" value="very_good" onChange={handleChange} required /></td>
                                <td><input type="radio" name="staff" value="excellent" onChange={handleChange} required /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <label>Overall Rating:</label>
                    <StarRating rating={formData.rating} onChange={handleRatingChange} />
                </div>

                <div>
                    <label>Any Suggestions:</label>
                    <textarea name="suggestions" value={formData.suggestion} onChange={handleChange} rows="4"></textarea>
                </div>
                <button type="submit">Submit Feedback</button>
            </form>
        </div>
    );
}

export default FeedbackForm;
