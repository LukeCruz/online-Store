import React from 'react';

class List extends React.Component {
  state = {
    products: [],
  };

  render() {
    const { products } = this.state;
    console.log(products);
    return (
      <div>
        {products.length === 0
          ? (
            <div data-testid="home-initial-message">
              Digite algum termo de pesquisa ou escolha uma categoria.
            </div>
          )
          : <div>teste</div>}
      </div>
    );
  }
}

export default List;
