import React, { Component } from 'react'
import SearchStock from './SearchStock'
export class SaveStock extends Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            operation: "Buy",
            price: "",
            fee: 0,
            tradeDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getStockData = async (symbol) => { await this.props.getStockData(symbol) }

    postStock = () => {
        const stock = this.props.stock[0]
        const newStock = {
            symbol: stock.symbol,
            companyName: stock.displayName,
            operation: this.state.operation,
            totalAmount: this.state.amount,
            price: this.state.price,
            fee: this.state.fee,
            priceDate: this.state.tradeDate,
            portfolio: this.props.portf._id
        }
        this.props.postStock(newStock)
        console.log(newStock)
    }

    render() {
        const stock = this.props.stock
        return (
            <div>
                <h3>Add Stock to the Portfolio</h3>
                <SearchStock getStockData={this.getStockData} />
                {stock.map(m =>
                    <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice}</div>)}
                <select id="select-input" name="operation" onChange={this.updateHandler}>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
                <input id="stock-amount" type="number" placeholder="Shares #" name="amount" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-price" type="number" placeholder="Price $" name="price" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-fee" type="number" placeholder="Fee $" name="fee" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-date" type="date" placeholder="Date" name="tradeDate" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postStock}>Add Stock</button>
            </div>
        )
    }
}

export default SaveStock

