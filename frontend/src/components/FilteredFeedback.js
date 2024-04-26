import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './freedBackList.css';

function FilteredFeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch all feedbacks from the backend
        const fetchFeedbacks = async () => {
            try {
                const response = await axios.get('http://localhost:8070/feedback/');
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Error fetching feedbacks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchFeedbacks();
    }, []);

    // Filter feedbacks with 4 or 5 stars ratings
    const filteredFeedbacks = feedbacks.filter(feedback => {
        const rating = feedback.rating;
        return rating === 4 || rating === 5;
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    // Function to generate stars for the rating
    const generateStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="star">★</span>);
        }
        return stars;
    };

    // Function to format date to 'YYYY-MM-DD' format
    const formatDate = (date) => {
        const dateObj = new Date(date);
        return dateObj.toISOString().split('T')[0];
    };

    return (
        <div className="feedback-container">
            <h3 className="allhead">Feedbacks with Ratings 4 and 5 Stars</h3>

            {/* Display filtered feedbacks */}
            <div className="card-container">
                {filteredFeedbacks.length === 0 ? (
                    <p>No feedbacks found with 4 or 5 stars ratings.</p>
                ) : (
                    filteredFeedbacks.map((feedback) => {
                        const { id, name, date, suggestions, rating } = feedback;

                        return (
                            <div className="card" key={id}>
                                <div className="card-header row">
                                    <div className="name col-8">{name}</div>
                                    <div className="date col-4">{formatDate(date)}</div>
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
                    })
                )}
            </div>
        </div>
    );
}

export default FilteredFeedbackList;
