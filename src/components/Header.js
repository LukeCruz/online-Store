import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cart from '../icons8-carrinho-de-compras-30.png';

class Header extends React.Component {
  render() {
    const { query, handleChange, handleClick, cartHeader, itensQuanti } = this.props;
    return (
      <div className="header-container">
        {cartHeader
          ? <Link to="/"> Fazer outra pesquisa </Link>
          : (
            <div>
              <input
                data-testid="query-input"
                name="query"
                value={ query }
                onChange={ handleChange }
                placeholder="O que está procurando?"
              />
              <button
                data-testid="query-button"
                type="submit"
                onClick={ handleClick }
              >
                Pesquisar
              </button>
            </div>)}
        <h1>Online Store</h1>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <div className="cartIcon">
            <div className="img-div">
              <img className="cart-icon-img" alt="cart-icon" src={ cart } />
            </div>
            <div className="quant-div">
              <p className="icon-quant" data-testid="shopping-cart-size">{itensQuanti}</p>
            </div>
          </div>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  query: PropTypes.string,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
}.isRequired;

export default Header;
