import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Card extends React.Component {
  render() {
    const { id, title, thumbnail, price } = this.props;
    return (
      <div data-testid="product">
        <h6>{ title }</h6>
        <img src={ thumbnail } alt={ title } />
        <h6>{ price }</h6>
        <Link to={ `/product/${id}` }>
          <p data-testid="product-detail-link" type="button">Mais detalhes</p>
        </Link>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
