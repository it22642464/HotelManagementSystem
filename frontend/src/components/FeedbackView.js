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
        rating: 0, 
    });

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                console.log('ID:', id); // Log the id parameter
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

    const handleSubmit = async () => {
        try {
            navigate(`/feedback/update/${id}`); 
        } catch (error) {
            console.error("Error updating feedback:", error);
        }
    };

    const handleDeleteFeedback = async () => {
        try {
            await axios.delete(`http://localhost:8070/feedback/delete/${id}`);
            
            navigate('/');
        } catch (error) {
            console.error("Error deleting feedback:", error);
        }
    };
    const handleOk = () => {
        navigate('/feedback'); // Navigate to FeedbackList page when OK button is clicked
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!feedback) {
        return <div>No feedback found.</div>;
    }

    return (
        
        <div className="feedback-view-container">
        <h2 className="feedback-title">Feedback Details</h2>
        
        <div className="feedback-details">
            <div className="feedback-item">
                <span className="feedback-label">Name:</span> {feedback.name}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Email:</span> {feedback.email}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Duration of Stay:</span> {feedback.duration}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">How Did You Hear About Our Hotel:</span> {feedback.howDidYouHear}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Quality Rating:</span> {feedback.quality}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Cleanliness Rating:</span> {feedback.cleanliness}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Food Rating:</span> {feedback.food}
            </div>
            <div className="feedback-item">
                <span className="feedback-label">Staff Rating:</span> {feedback.staff}
            </div>
            <div className="feedback-item">
                    <span className="feedback-label">Overall Rating:</span> {feedback.rating} ★  {/* Display overall rating */}
                </div>
            <div className="feedback-item">
                <span className="feedback-label">Suggestions:</span> {feedback.suggestions}
            </div>
        </div>
        
        <div className="feedback-actions">
            <button className="feedback-button update-button" onClick={handleSubmit}>
                Edit  
            </button>
            <button className="feedback-button delete-button" onClick={handleDeleteFeedback}>
                Delete 
            </button>
            <button className="feedback-button ok-button" onClick={handleOk}>
                    OK
                </button>
        </div>
    </div>
       
    );
}

export default FeedbackView;
