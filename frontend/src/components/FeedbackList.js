import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './freedBackList.css';
import { useNavigate } from 'react-router-dom';

function FeedbackList() {
    const [feedbacks, setFeedbacks] = useState([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [searchDate, setSearchDate] = useState('');

    useEffect(() => {
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

    const handleSearchDateChange = (e) => {
        setSearchDate(e.target.value);
    };

    const filteredFeedbacks = searchDate
        ? feedbacks.filter(feedback => new Date(feedback.date).toISOString().split('T')[0] === searchDate)
        : feedbacks;

    const generateStars = (rating) => {
        const stars = [];
        for (let i = 0; i < rating; i++) {
            stars.push(<span key={i} className="star">★</span>);
        }
        return stars;
    };

   
    
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="feedback-container">
            <h3 className="allhead">All Feedbacks</h3>

            <div className="search-container">
                <label htmlFor="search-date">Search by Date:</label>
                <input
                    type="date"
                    id="search-date"
                    value={searchDate}
                    onChange={handleSearchDateChange}
                />
            </div>

            <div className="card-container">
                {filteredFeedbacks.length === 0 ? (
                    <p>No feedbacks found for the selected date.</p>
                ) : (
                    filteredFeedbacks.map((feedback) => {
                        const { id, name, date, suggestions, rating } = feedback;

                        return (
                            <div className="card" key={id}>
                                <div className="card-header row">
                                    <div className="name col-8">{name}</div>
                                    <div className="date col-4">{new Date(date).toLocaleDateString()}</div>
                                </div>
                                <div className="card-body col">
                                    <div><p>{suggestions}</p></div>
                                    <div className="rating row">
                                        <div className="overall col-6">
                                            <span>Overall Rating:</span>
                                        </div>
                                        <div className="rating-stars col-6">
                                            {generateStars(rating)}
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer">
                                   
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

export default FeedbackList;
//btn delete-btn