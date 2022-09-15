import React from 'react';
import { Redirect } from 'react-router-dom';
import Header from './Header';

class Checkout extends React.Component {
  state = {
    cartItem: [],
    trueFalse: false,
    emptyCheckout: false,
    emptyCart: false,
    fullName: '',
    paymentRadio: '',
    email: '',
    cpf: '',
    tel: '',
    cep: '',
    adress: '',
    redirect: false,
  };

  componentDidMount() {
    const getItem = localStorage.getItem('cartProducts');
    const json = JSON.parse(getItem);
    this.setState({ cartItem: json }, () => {
      if (json !== null) {
        this.setState({ trueFalse: true });
      } else {
        this.setState({ emptyCart: true, trueFalse: false });
      }
    });
  }

  handleChange = ({ target }) => {
    const { value, name } = target;
    this.setState({
      [name]: value,
    });
  };

  submitCheckout = () => {
    const { email, fullName, cpf, cep, adress, tel, paymentRadio } = this.state;
    const verifyInputs = fullName.length > 0
      && email.length > 0
      && cpf.length > 0
      && cep.length > 0
      && adress.length > 0
      && tel.length > 0
      && paymentRadio !== '';
    if (!verifyInputs) {
      this.setState({ emptyCheckout: true });
    } else {
      this.setState({ cartItem: [] });
      localStorage.removeItem('cartProducts');
      this.setState({ redirect: true });
    }
  };

  render() {
    const { cartItem,
      trueFalse,
      email,
      fullName,
      cpf,
      cep,
      adress,
      tel,
      emptyCheckout,
      emptyCart,
      redirect } = this.state;
    const cartHeader = true;
    return (
      <div>
        {redirect && <Redirect to="/" />}
        <Header cartHeader={ cartHeader } />
        <div className="page-checkout-container">
          <h1>Checkout</h1>
          {emptyCart
            ? <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
            : trueFalse && cartItem.map((e, index) => (
              <div key={ index }>
                {e.title}
              </div>
            ))}
          <form>
            <input
              type="text"
              name="fullName"
              data-testid="checkout-fullname"
              placeholder="Nome Completo"
              value={ fullName }
              onChange={ this.handleChange }
              required
            />
            <input
              type="email"
              name="email"
              data-testid="checkout-email"
              placeholder="Email"
              value={ email }
              onChange={ this.handleChange }
              required
            />
            <input
              type="text"
              name="cpf"
              data-testid="checkout-cpf"
              placeholder="CPF"
              value={ cpf }
              onChange={ this.handleChange }
              required
            />
            <input
              type="tel"
              name="tel"
              data-testid="checkout-phone"
              placeholder="Telefone"
              value={ tel }
              onChange={ this.handleChange }
              required
            />
            <input
              type="text"
              name="cep"
              data-testid="checkout-cep"
              placeholder="CEP"
              value={ cep }
              onChange={ this.handleChange }
              required
            />
            <input
              type="text"
              name="adress"
              data-testid="checkout-address"
              placeholder="Endereço"
              value={ adress }
              onChange={ this.handleChange }
              required
            />
            <h3> Forma de Pagamento: </h3>
            <label htmlFor="boleto">
              Boleto
              <input
                value="Boleto"
                type="radio"
                name="paymentRadio"
                id="boleto"
                data-testid="ticket-payment"
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="visa">
              Visa
              <input
                value="Visa"
                type="radio"
                name="paymentRadio"
                id="visa"
                data-testid="visa-payment"
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="master">
              MasterCard
              <input
                value="MasterCard"
                type="radio"
                name="paymentRadio"
                id="master"
                data-testid="master-payment"
                onChange={ this.handleChange }
                required
              />
            </label>
            <label htmlFor="elo">
              Elo
              <input
                value="Elo"
                type="radio"
                name="paymentRadio"
                data-testid="elo-payment"
                id="elo"
                onChange={ this.handleChange }
                required
              />
            </label>
            <button
              type="button"
              data-testid="checkout-btn"
              onClick={ this.submitCheckout }
            >
              Enviar Formulário
            </button>
            {emptyCheckout && <p data-testid="error-msg">Campos inválidos</p>}
          </form>
        </div>
      </div>
    );
  }
}

export default Checkout;
