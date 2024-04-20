import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './freedBackList.css';
function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all feedbacks from the backend
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8070/feedback/');
                console.log(response.data)
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }
        const generateStars = (rating) => {
          const stars = [];
          for (let i = 0; i < rating; i++) {
            stars.push(
              <span key={i} className="star">
                ★
              </span>
            );
          }
          return stars;
        };

       const generateDate = (date) => {
    try {
        
       
        const dateObject = date instanceof Date ? date : new Date(date);
        
      
        if (isNaN(dateObject.getTime())) {
            console.error('Invalid date provided:', date);
            return null; 
        }

        const isoDateString = dateObject.toISOString();
        
        
        const [dates, time] = isoDateString.split('T');

        
        return dates;
    } catch (error) {
        console.error('An error occurred while processing the date:', error);
        return null; 
    }
};








      return (
    <div className="feedback-container col">
        
        {feedbacks.length === 0 ? (
            <p>No feedbacks found.</p>
        ) : (
            <div className="feedback-container">
            <h2>All Feedbacks</h2>
            {feedbacks.length === 0 ? (
                <p>No feedbacks found.</p>
            ) : (
                <div className="card-container">
                    {feedbacks.map((feedback) => {
                        const { id, name, date, suggestions, rating } = feedback;

                        return (
                            <div className="card" key={id}>
                                <div className="card-header row">
                                    <div className="name col-6">{name}</div>
                                    
                                    <div className="date col-6">{generateDate(date)}</div>
                                </div>
                                <div className="card-body col">
                                    <div><p>{suggestions}</p></div>
                                    <div className="rating row">
                                        <div className="overall col-6">
                                            <span>Overall Rating</span>
                                        </div>
                                        <div className="rating-stars col-6">
                                            {generateStars(rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
        )}
        </div>
);

    }
export default FeedbackList;
