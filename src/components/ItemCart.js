import React from "react";

class ItemCart extends React.Component {
  render () {
    const { item } = this.props
    return (
      <div>
        <h1>{item.title}</h1>
        <h2>{item.quant}</h2>
      </div>
    )
  }
}

export default ItemCart