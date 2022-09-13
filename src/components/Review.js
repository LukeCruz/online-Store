import React from 'react';

class Review extends React.Component {
  render() {
    const { email, message, rating } = this.props;
    return (
      <div data-testid="product">
        <p data-testid="review-card-email">
          Email:
          { email }
        </p>
        <p data-testid="review-card-rating">
          Mensagem
          { message }
        </p>
        <p data-testid="review-card-evaluation">
          Avaliação
          { rating }
        </p>
      </div>
    );
  }
}

export default Review;
