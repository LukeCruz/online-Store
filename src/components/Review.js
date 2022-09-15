import React from 'react';
import PropTypes from 'prop-types';

class Review extends React.Component {
  render() {
    const { email, message, rating } = this.props;
    return (
      <div>
        <p data-testid="review-card-email">
          { email }
        </p>
        <p data-testid="review-card-rating">
          { message }
        </p>
        <p data-testid="review-card-evaluation">
          { rating }
        </p>
      </div>
    );
  }
}

Review.propTypes = {
  email: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default Review;
