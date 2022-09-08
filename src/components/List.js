import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductById } from '../services/api';

class List extends React.Component {
  state = {
    products: [],
    categories: [],
    query: '',
    click: false,
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
      click: true }, () => {
      console.log(products);
    });
  };

  listProducts = () => {
    const { products, click } = this.state;
    const { results } = products;
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
        <div className="container">
          <aside className="categories">
            { categories.map((category, id) => (
              <label key={ id } data-testid="category" htmlFor="category">
                <input
                  key={ id }
                  type="radio"
                  id="category"
                  name="category"
                  value={ category }
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
