import { string } from 'prop-types';
import React from 'react';

class Review extends React.Component {
    state = {
        
    }

    render() {
        const { email, message, rating } = this.props
        return (
            <div data-testid="product">
              <h2 data-testid="review-card-email" >Email:{email}</h2>
              <p data-testid="review-card-rating" >Mensagem{message}</p>
              <h3 data-testid="review-card-evaluation">Avaliação{rating}</h3>

            </div>
        );
    }
    
}



export default Review;
