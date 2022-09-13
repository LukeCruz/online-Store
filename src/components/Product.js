import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import Header from './Header';
import Form from './Form';
import Review from './Review';

class Product extends React.Component {
  state = {
    details: {},
    attributes: [],
    imgUrl: '',
    reviews: [],
    trueFalse: false
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    const getItem = localStorage.getItem(id)
    const json = JSON.parse(getItem)
    if (json !== null) {
      this.setState({trueFalse: true,
      reviews: json}, () => {
        console.log(this.state, 'asdasd')}
    )}
    const details = await getProductDetails(id);
    const { attributes, pictures } = details;
    const pictureToRender = pictures[Math.floor(Math.random() * pictures.length)];
    this.setState({
      details,
      attributes,
      imgUrl: pictureToRender.url,
    });
  }

  clickSla = (event) => {
    console.log(event.target.value);
    const element = JSON.parse(event.target.value);
    const getItem = localStorage.getItem('cartProducts');
    let json = JSON.parse(getItem);
    if (json !== null) {
      let trueFalse = false;
      json.forEach((e) => {
        if (e.title === element.title) {
          e.quant += 1;
          localStorage.setItem('cartProducts', JSON.stringify(json));
          trueFalse = true;
        }
      });
      if (trueFalse === false) {
        element.quant = 1;
        json.push(element);
        localStorage.setItem('cartProducts', JSON.stringify(json));
      }
    }
    if (json === null) {
      json = [];
      element.quant = 1;
      console.log('null json');
      json.push(element);
      localStorage.setItem('cartProducts', JSON.stringify(json));
    }
  };

  render() {
    const { details, attributes, imgUrl, reviews, trueFalse } = this.state;
    const { title, price, thumbnail } = details;
    const cartHeader = true;
    const { match } = this.props;
    const { params } = match;
    const { id } = params;
    return (
      <div data-testid="product">
        <Header cartHeader={ cartHeader } />
        <div className="product-details">
          <div className="img-title-product">
            <p data-testid="product-detail-name">{title}</p>
            <img data-testid="product-detail-image" src={ thumbnail } alt={ title } />
          </div>
          <h3 data-testid="product-detail-price">{`Preço: R$: ${price}`}</h3>
          <div className="details-img-container">
            <ul>
              {attributes.map((element) => (
                <li key={ element.name }>{`${element.name}: ${element.value_name}`}</li>
              ))}
              <button
                data-testid="product-detail-add-to-cart"
                type="button"
                onClick={ this.clickSla }
                value={ JSON.stringify(details) }
              >
                Adicionar ao Carrinho
              </button>
            </ul>
            <img src={ imgUrl } alt={ title } />
          </div>
          <Link to="/cart">
            <button
              type="button"
            >
              Ver Carrinho
            </button>
          </Link>
        </div>
        <Form id={id} cartHeader={cartHeader}/>
        {
          trueFalse && reviews.map((e) => {
            return (
              <Review email={e.email} message={e.text} rating={e.rating}/>
            )
          })
        }
      </div>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
  obj: PropTypes.shape({ root: PropTypes.string }).isRequired,
};

export default Product;
