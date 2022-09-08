import React from 'react';
import { getCategories } from '../services/api';

class List extends React.Component {
  state = {
    products: [],
    categories: [],
  };

  async componentDidMount() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { products, categories } = this.state;
    console.log(products);
    return (
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
        <div>
          {products.length === 0
            ? (
              <div data-testid="home-initial-message">
                Digite algum termo de pesquisa ou escolha uma categoria.
              </div>
            )
            : <div>teste</div>}
        </div>
      </div>
    );
  }
}

export default List;
