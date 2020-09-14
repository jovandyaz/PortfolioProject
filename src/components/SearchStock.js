import React, { Component } from 'react'

export class SearchStock extends Component {
    constructor() {
        super()
        this.state = {
            stock: ""
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })
    
    // postStock = async () => {
    //     let stock = this.state.dataStock[0]
    //     // function toDateTime(secs) { return new Date(1970, 0, 1).setSeconds(secs) }
    //     const toDateTime = (secs) => { return new Date(1970, 0, 1).setSeconds(secs) }
    //     let postStock = {
    //         totalAmount: 1,
    //         symbol: stock.symbol,
    //         companyName: stock.displayName,
    //         price: stock.regularMarketPrice,
    //         datePrice: toDateTime(stock.regularMarketTime),
    //         portfolio: "5f5ed6b9b0ad7013f62751ba"
    //     }
    //     await axios.post("http://localhost:8080/stock", postStock)
    //     this.getStockDB()
    // }

    getStockData = async () => {
        this.props.getStockData(this.state.stock)
    }

    render() {
        const stock = this.props.stock
        return (
            <div>
                <h3>Get Stock from API</h3>
                <input id="stock-input" type="text" placeholder="Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Get</button>
                {stock.map(m => <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice} <button onClick={this.props.postStock}>Save</button></div>)}
            </div>
        )
    }
}

export default SearchStock