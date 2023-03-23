import React from 'react';
import PropTypes from 'prop-types';
import Review from './Review';

class Form extends React.Component {
  state = {
    email: '',
    message: '',
    rating: '',
    emptyReview: false,
    reviews: [],
  };

  componentDidMount() {
    const { id } = this.props;
    const getItem = localStorage.getItem(id);
    const json = JSON.parse(getItem);
    if (json !== null) {
      this.setState({
        reviews: json,
      });
    }
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  StarRating = () => {
    const totalStars = 5;
    return (
      <div className="star-rating">
        {[...Array(totalStars)].map((star, index) => {
          index += 1;
          return (
            <label htmlFor="star-button" key={ index }>
              <input
                data-testid={ `${index}-rating` }
                type="radio"
                id="star-button"
                key={ index }
                onClick={ this.handleChange }
                value={ index }
                name="rating"
              />
              {index}
            </label>
          );
        })}
      </div>
    );
  };

  clearState = () => {
    this.setState({
      email: '',
      message: '',
      rating: '',
      emptyReview: false,
    });
  };

  saveRating = () => {
    const { email, message, rating } = this.state;
    const { id } = this.props;
    const verifyInputs = email.length > 0 && rating.length > 0;
    const verifyEmail = email.includes('@');
    const validateAll = verifyEmail && verifyInputs;
    const rateObj = {
      email,
      rating,
      message,
    };

    if (validateAll) {
      this.setState((prev) => ({
        emptyReview: false,
        reviews: [...prev.reviews, rateObj],
      }), () => {
        const { reviews } = this.state;
        localStorage.setItem(id, JSON.stringify(reviews));
      });
      this.clearState();
    } else {
      this.setState({ emptyReview: true });
    }
  };

  render() {
    const { email, message, emptyReview, reviews } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            data-testid="product-detail-email"
            value={ email }
            onChange={ this.handleChange }
            required
          />
          {this.StarRating()}
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(Opcional)"
            name="message"
            value={ message }
            onChange={ this.handleChange }
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={ this.saveRating }
          >
            Avaliar
          </button>
          {
            emptyReview && <p data-testid="error-msg">Campos inválidos</p>
          }
        </form>
        {reviews.map((e, index) => (
          <Review
            key={ index }
            email={ e.email }
            message={ e.message }
            rating={ e.rating }
          />
        ))}
      </div>
    );
  }
}

Form.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Form;
