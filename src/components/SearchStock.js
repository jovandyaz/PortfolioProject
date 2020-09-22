import React, { Component } from 'react'

export class SearchStock extends Component {
    constructor() {
        super()
        this.state = {
            stock: ""
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getStockData = async () => { await this.props.getStockData(this.state.stock) }

    render() {
        const stock = this.props.stock
        return (
            <div>
                <input id="stock-input" type="text" placeholder="Search Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Get</button>
                {stock !== undefined
                    ? stock.map(m => <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice} <button onClick={this.props.postStock}>Save</button></div>)
                    : null}
            </div>
        )
    }
}

export default SearchStock