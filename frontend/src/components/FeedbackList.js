import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FeedbackList() {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>All Feedbacks</h2>
            {feedbacks.length === 0 ? (
                <p>No feedbacks found.</p>
            ) : (
                <div className='card'>
                    <div className='card-header row'>
                        <div className='name col-6'>name</div>
                        <div className='date col-6'>date</div>
                    </div>
                    <div className='card-body col'>
                        <div>
                            
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FeedbackList;
