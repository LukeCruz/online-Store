import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductById, getProductsFromCategory } from '../services/api';

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

  handleClick = async () => {
    const { query } = this.state;
    const products = await getProductById(query);
    this.setState({ products,
      click: true });
  };

  listProducts = () => {
    const { products, click, checked, retProducts } = this.state;
    const { results } = products;
    if (checked === true) {
      console.log(retProducts);
      return (
        retProducts.results.map((e) => (
          <div key={ e.id } data-testid="product">
            <h6>{e.title}</h6>
            <img src={ e.thumbnail } alt={ e.title } />
            <h6>{e.price}</h6>
          </div>
        ))
      );
    }
    if (products.length === 0 && click === false) {
      return (
        <div data-testid="home-initial-message">
          <h2>Digite algum termo de pesquisa ou escolha uma categoria.</h2>
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
        <div key={ e.id } data-testid="product">
          <h6>{e.title}</h6>
          <img src={ e.thumbnail } alt={ e.title } />
          <h6>{e.price}</h6>
        </div>
      ))
    );
  };

  handleCheck = async (event) => {
    const { target } = event;
    const { value } = target;
    const ret = await getProductsFromCategory(value);
    this.setState({ checked: true,
      retProducts: ret });
  };

  render() {
    const { categories, query } = this.state;
    return (
      <div>
        {this.listProducts()}
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          Botao
        </Link>
        <div>
          <input
            data-testid="query-input"
            name="query"
            value={ query }
            onChange={ this.handleChange }
          />
          <button
            data-testid="query-button"
            type="submit"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </div>
        {this.categoryProducts}
        <div className="container">
          <aside className="categories">
            { categories.map((category, id) => (
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

    );
  }
}

export default List;
