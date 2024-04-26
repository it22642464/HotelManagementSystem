import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function FeedbackView() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(true);
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
        rating: 0
    });

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                console.log('ID:', id);
                if (!id) {
                    throw new Error('ID parameter is missing');
                }
                const response = await axios.get(`http://localhost:8070/feedback/get/${id}`);
                setFeedback(response.data);
                setFormData(response.data); 
            } catch (error) {
                console.error("Error fetching feedback:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeedback();
    }, [id]);
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8070/feedback/update/${id}`, formData);
            console.log('Feedback updated successfully!', response.data);
            //setFormData(response.data);
            setFeedback(response.data); 
            navigate(`/feedback`);
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    };

    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!feedback) {
        return <div>No feedback found.</div>;
    }

    return (
        
     
   
            <div className="form-container">
              <h2>Edit Feedback Form</h2>
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
                                <td><input
                                    type="radio"
                                    name="quality"
                                    value="poor"
                                    onChange={handleChange}
                                    checked={formData.quality === "poor"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="quality"
                                    value="satisfactory"
                                    onChange={handleChange}
                                    checked={formData.quality === "satisfactory"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="quality"
                                    value="good"
                                    onChange={handleChange}
                                    checked={formData.quality === "good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="quality"
                                    value="very_good"
                                    onChange={handleChange}
                                    checked={formData.quality === "very_good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="quality"
                                    value="excellent"
                                    onChange={handleChange}
                                    checked={formData.quality === "excellent"}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <td><label>Cleanliness:</label></td>
                                <td><input
                                    type="radio"
                                    name="cleanliness"
                                    value="poor"
                                    onChange={handleChange}
                                    checked={formData.cleanliness === "poor"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="cleanliness"
                                    value="satisfactory"
                                    onChange={handleChange}
                                    checked={formData.cleanliness === "satisfactory"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="cleanliness"
                                    value="good"
                                    onChange={handleChange}
                                    checked={formData.cleanliness === "good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="cleanliness"
                                    value="very_good"
                                    onChange={handleChange}
                                    checked={formData.cleanliness === "very_good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="cleanliness"
                                    value="excellent"
                                    onChange={handleChange}
                                    checked={formData.cleanliness === "excellent"}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <td><label>Food:</label></td>
                                <td><input
                                    type="radio"
                                    name="food"
                                    value="poor"
                                    onChange={handleChange}
                                    checked={formData.food === "poor"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="food"
                                    value="satisfactory"
                                    onChange={handleChange}
                                    checked={formData.food === "satisfactory"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="food"
                                    value="good"
                                    onChange={handleChange}
                                    checked={formData.food === "good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="food"
                                    value="very_good"
                                    onChange={handleChange}
                                    checked={formData.food === "very_good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="food"
                                    value="excellent"
                                    onChange={handleChange}
                                    checked={formData.food === "excellent"}
                                    required
                                /></td>
                            </tr>
                            <tr>
                                <td><label>Staff:</label></td>
                                <td><input
                                    type="radio"
                                    name="staff"
                                    value="poor"
                                    onChange={handleChange}
                                    checked={formData.staff === "poor"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="staff"
                                    value="satisfactory"
                                    onChange={handleChange}
                                    checked={formData.staff === "satisfactory"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="staff"
                                    value="good"
                                    onChange={handleChange}
                                    checked={formData.staff === "good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="staff"
                                    value="very_good"
                                    onChange={handleChange}
                                    checked={formData.staff === "very_good"}
                                    required
                                /></td>
                                <td><input
                                    type="radio"
                                    name="staff"
                                    value="excellent"
                                    onChange={handleChange}
                                    checked={formData.staff === "excellent"}
                                    required
                                /></td>
                            </tr>
                        </tbody>
                    </table>
        </div>      
        <div>
                    <label>Overall Rating:</label>
                    <select name="rating" value={formData.rating} onChange={handleChange} required>
                        <option value="1">1 ★</option>
                        <option value="2">2 ★</option>
                        <option value="3">3 ★</option>
                        <option value="4">4 ★</option>
                        <option value="5">5 ★</option>
                    </select>
                </div>
        
        
        
        
                <div>
                  <label>Any Suggestions:</label>
                  <textarea name="suggestions" value={formData.suggestions} onChange={handleChange} rows="4"></textarea>
                </div>
                <button type="submit" >Edit Feedback</button>
              </form>
              <div id="responseMessage" style={{ display: 'none' }}></div>
            </div>
         
          );
        }
       


export default FeedbackView;
