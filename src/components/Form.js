import React from 'react';
import Review from './Review';

class Form extends React.Component {
  state = {
    email: '',
    message: '',
    rating: 0,
    setRating: 0,
    emptyReview: false,
    reviews: [],
  };

  setRating = ({ target }) => {
    const { value } = target;
    this.setState({
      setRating: value,
    });
  };

  saveRating = () => {
    const { id } = this.props;
    const { email, message, setRating } = this.state;

    if (email === '' || message === '' || setRating === 0) {
      this.setState({ emptyReview: true });
      console.log('entrou if');
      return;
    }

    if (localStorage.getItem(id) === null) {
      const emptyArray = [];
      localStorage.setItem(id, JSON.stringify(emptyArray));
    }
    const JsonOfReviews = localStorage.getItem(id);
    const reviews = JSON.parse(JsonOfReviews);
    const rating = {
      email,
      text: message,
      rating: setRating,
    };

    reviews.push(rating);

    localStorage.setItem(id, JSON.stringify(reviews));
    this.setState({
      reviews,
      email: '',
      message: '',
      rating: 0,
      setRating: 0,
      emptyReview: false,
    });
  };

  StarRating = () => {
    const { rating } = this.state;
    return (
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <label htmlFor='star-button' key={index}>
              <input
                data-testid={`${index}-rating`}
                type="radio"
                id="star-button"
                key={index}
                onClick={this.setRating}
                value={index}
                required
              />
              {index}
            </label>
          );
        })}
      </div>
    );
  };

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { email, message, emptyReview, reviews } = this.state;
    const { trueFalse } = this.props;
    return (
      <div data-testid="product">
        <form>
          <input
            type="email"
            placeholder="Email"
            name="email"
            data-testid="product-detail-email"
            value={email}
            onChange={this.handleChange}
            required
          />
          {this.StarRating()}
          <textarea
            data-testid="product-detail-evaluation"
            placeholder="Mensagem(Opcional)"
            name="message"
            value={message}
            onChange={this.handleChange}
          />
          <button
            data-testid="submit-review-btn"
            type="button"
            onClick={this.saveRating}
          >
            Avaliar
          </button>
        </form>
        {
          emptyReview && <p data-testid="error-msg">Campos inválidos</p>
        }
        {reviews.map((e) => (
          <Review
            key={e.email}
            email={e.email}
            message={e.text}
            rating={e.rating}
          />
        ))
        }
      </div>
    );
  }
}

export default Form;
