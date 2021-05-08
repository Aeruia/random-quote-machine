import React from "react";
import axios from "axios";


export default class Quote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quotes: [],
            quote: '',
            author: '',
            error: ''
        }
    }

    getRandomIndex() {
        return Math.floor(Math.random() * 101)
    }

    getNewQuote = () => {
        this.setState({
            quote: this.state.quotes[this.getRandomIndex()].quote,
            author: this.state.quotes[this.getRandomIndex()].author,
        })
    }

    componentDidMount() {
        const options = {
            method: 'GET',
            url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
            headers: {
                'content-type': 'application/json'
            }
        };
        axios.request(options).then(response => {
            this.setState({
                quotes: response.data.quotes,
                quote: response.data.quotes[this.getRandomIndex()].quote,
                author: response.data.quotes[this.getRandomIndex()].author,
            })
        }).catch(() => this.setState({ error: 'I can not load a quote' }))
    }
    render() {
        let random = () => Math.floor(Math.random() * (255 - 40) + 40);
        let color = `rgb(${random()}, ${random()}, ${random()})`;
        return (
            <div id="quote-box" style={{ backgroundColor: color }}>
                <div id="text">
                    {this.state.quote}
                </div>
                <div id="author">
                    ~ {this.state.author} ~
                </div>
                <div className="buttons">
                    <button id="new-quote" onClick={this.getNewQuote}>New Quote</button>
                    <a id="tweet-quote" target="_blank" href={'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text='.concat(
                        encodeURIComponent('"' + this.state.quote + '" - ' + this.state.author))}><i className="fa fa-twitter"></i></a>
                </div>
            </div>
        )
    }
}

