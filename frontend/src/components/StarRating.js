import React, { useState } from 'react';
import PropTypes from 'prop-types';

function StarRating({ rating, onChange }) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex) => {
    onChange(starIndex);
  };

  const handleStarMouseEnter = (starIndex) => {
    setHoverRating(starIndex);
  };

  const handleStarMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      {Array.from({ length: 5 }, (_, index) => {
        const starIndex = index + 1;
        return (
          <span
            key={starIndex}
            className={`star ${starIndex <= (hoverRating || rating) ? 'filled' : ''}`}
            onClick={() => handleStarClick(starIndex)}
            onMouseEnter={() => handleStarMouseEnter(starIndex)}
            onMouseLeave={handleStarMouseLeave}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StarRating;
