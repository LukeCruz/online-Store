import { string } from 'prop-types';
import React from 'react';

class Form extends React.Component {
    state = {
        email: '',
        message: '',
        rating: 0,
        setRating: 0,
        emptyReview: false,
    }

    setRating = ({target}) => {
        const { value } = target
        this.setState({
            setRating: value
        })
    }
    
    saveRating = () => {
        const { id } = this.props;
        const {email, message, setRating} =  this.state
        
        if (email === "" || message === "" || setRating === 0) {
          this.setState({emptyReview: true})
          console.log('entrou if')
          return
        }

        if (localStorage.getItem(id) === null) {
            const emptyArray = []
            localStorage.setItem(id, JSON.stringify(emptyArray))
        }
        const JsonOfReviews = localStorage.getItem(id)
        const reviews = JSON.parse(JsonOfReviews)
        const rating = {
            email: email,
            text: message,
            rating: setRating
        }
        
        reviews.push(rating)

        localStorage.setItem(id, JSON.stringify(reviews))

        this.setState({
            email: '',
            message: '',
            rating: 0,
            setRating: 0,
            emptyReview: false,
        })

    }

    StarRating = () => {
        const { rating, setRating } = this.state
        return (
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        
                        <button
                            data-testid={`${index}-rating`}
                            type="button"
                            id='star-button'
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            onClick={this.setRating}
                            value={index}
                            >&#9733;
                        </button>
                    );
                })}
            </div>
        );
    };

    handleChange = ({ target }) => {
        const { value, name } = target
        this.setState({
            [name]: value
        })
    };


    render() {
        const { email, message, emptyReview } = this.state;

        return (
            <div data-testid="product">

                <form>
                    <input type="email" placeholder="Email" name="email" data-testid="product-detail-email" value={email} onChange={this.handleChange} ></input>
                    {this.StarRating()}
                    <textarea data-testid="product-detail-evaluation" placeholder="Mensagem(Opcional)" name="message" value={message} onChange={this.handleChange} ></textarea>
                <button data-testid="submit-review-btn" type="button" onClick={this.saveRating}>Avaliar</button>
                </form>
                {
                  emptyReview && <p data-testid="error-msg">Campos inválidos</p>
                }
            </div>
        );
    }
}



export default Form;
