import React, { Component } from 'react'

export class StockSearch extends Component {
    constructor() {
        super()
        this.state = {
            stock: ""
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

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

export default StockSearch

