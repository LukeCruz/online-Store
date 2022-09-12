import React from 'react';
import { getCategories, getProductById, getProductsFromCategory } from '../services/api';
import Card from './Card';
import Header from './Header';

class List extends React.Component {
  state = {
    products: [],
    categories: [],
    query: '',
    click: false,
    retProducts: [],
    checked: false,
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  handleChange = (event) => {
    const { target } = event;
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  clickSla = (event) => {
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

  listProducts = () => {
    const { products, click, checked, retProducts } = this.state;
    const { results } = products;
    if (checked === true) {
      return (
        retProducts.results.map((e) => (
          <div className="product-card" key={ e.title }>
            <Card
              key={ e.id }
              thumbnail={ e.thumbnail }
              title={ e.title }
              price={ e.price }
            />
            <button
              type="button"
              data-testid="product-add-to-cart"
              value={ JSON.stringify(e) }
              onClick={ this.clickSla }
            >
              Adicione ao carrinho
            </button>
          </div>
        ))
      );
    }
    if (products.length === 0 && click === false) {
      return (
        <div data-testid="home-initial-message">
          <h3>Digite algum termo de pesquisa ou escolha uma categoria.</h3>
        </div>
      );
    }
    if (results.length === 0 && click === true) {
      return (
        <h2>Nenhum produto foi encontrado</h2>
      );
    }
    return (
      results.map((e) => (
        <div className="product-card" key={ e.title }>
          <Card
            key={ e.id }
            id={ e.id }
            thumbnail={ e.thumbnail }
            title={ e.title }
            price={ e.price }
          />
          <button
            type="button"
            data-testid="product-add-to-cart"
            value={ JSON.stringify(e) }
            onClick={ this.clickSla }
          >
            Adicione ao carrinho
          </button>

        </div>

      ))
    );
  };

  handleCheck = async (event) => {
    const { target } = event;
    const { value } = target;
    const ret = await getProductsFromCategory(value);
    this.setState({
      checked: true,
      retProducts: ret,
    });
  };

  handleClick = async () => {
    const { query } = this.state;
    const products = await getProductById(query);
    this.setState({
      products,
      click: true,
    });
  };

  render() {
    const { categories, query } = this.state;
    return (
      <div className="page-container">
        <Header
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          query={ query }
        />
        <div className="main-container">
          <div className="list-products">
            {this.listProducts()}
          </div>
          {this.categoryProducts}
          <div className="container">
            <aside className="categories">
              {categories.map((category, id) => (
                <label key={ id } data-testid="category" htmlFor="category">
                  <input
                    onClick={ this.handleCheck }
                    key={ id }
                    type="radio"
                    id="category"
                    name="category"
                    value={ category.id }
                  />
                  {category.name}
                </label>
              ))}
            </aside>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
