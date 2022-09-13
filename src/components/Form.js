import { string } from 'prop-types';
import React from 'react';

class Form extends React.Component {
    state = {
        email: '',
        message: '',
        rating: 0,
        setRating: 0
    }

    setRating = ({target}) => {
        const { value } = target
        console.log(value)
        this.setState({
            setRating: value
        })
    }
    
    saveRating = () => {
        const { id } = this.props;
        console.log(typeof(id))
        const {email, message, setRating} =  this.state
        console.log(localStorage.getItem(id))

        if (localStorage.getItem(id) === null) {
            const emptyArray = []
            localStorage.setItem(id, JSON.stringify(emptyArray))
        }
        const JsonOfReviews = localStorage.getItem(id)
        const reviews = JSON.parse(JsonOfReviews)
        console.log(reviews)
        const rating = {
            email: email,
            text: message,
            rating: setRating
        }
        
        reviews.push(rating)

        localStorage.setItem(id, JSON.stringify(reviews))

    }

    StarRating = () => {
        const { rating, setRating } = this.state
        return (
            <div className="star-rating">
                {[...Array(5)].map((star, index) => {
                    index += 1;
                    return (
                        
                        <button
                            type="button"
                            id='star-button'
                            key={index}
                            className={index <= rating ? "on" : "off"}
                            onClick={this.setRating}
                            value={index}
                            >&#9733;
                            {/* <p value={index} className="star">&#9733;</p> */}
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
        const { email, message } = this.state;

        return (
            <div data-testid="product">

                <form>
                    <input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} ></input>
                    {this.StarRating()}
                    <textarea placeholder="Mensagem(Opcional)" name="message" value={message} onChange={this.handleChange} ></textarea>
                <button type="button" onClick={this.saveRating}>Avaliar</button>
                </form>
            </div>
        );
    }
}



export default Form;
