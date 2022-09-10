import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductById, getProductsFromCategory } from '../services/api';
import Card from './Card';

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
    const { cartProducts } = this.state
    const element = JSON.parse(event.target.value)
    const getItem = localStorage.getItem("cartProducts")
    let json = JSON.parse(getItem)
    if (json !== null) {
      let trueFalse = false
      json.map((e) => {
        if (e.title === element.title) {
          e.quant += 1
          localStorage.setItem("cartProducts", JSON.stringify(json))
          trueFalse = true
        }
      })
      if (trueFalse === false) {
        element.quant = 1
        json.push(element)
        localStorage.setItem("cartProducts", JSON.stringify(json))
      }
    }
    if (json === null) {
      json = []
      element.quant = 1
      console.log('null json')
      json.push(element)
      localStorage.setItem("cartProducts", JSON.stringify(json))
      
    }
  }

  listProducts = () => {
    const { products, click, checked, retProducts } = this.state;
    const { results } = products;
    if (checked === true) {
      return (
        retProducts.results.map((e) => (
          <div>
            <Card
              key={ e.id }
              thumbnail={ e.thumbnail }
              title={ e.title }
              price={ e.price }
            />
            <button
            type='button'
            onClick={this.clickSla}>
              Adicionar ao carrinho
            </button>
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
        <Card
          key={ e.id }
          id={ e.id }
          thumbnail={ e.thumbnail }
          title={ e.title }
          price={ e.price }
        />
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
