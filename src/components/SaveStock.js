import React, { Component } from 'react'
export class SaveStock extends Component {
    constructor() {
        super()
        this.state = {
            stock: "",
            amount: "",
            op: "Buy",
            price: "",
            fee: "",
            tradeDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getStockData = async () => { this.props.getStockData(this.state.stock) }

    postStock = () => {
        const stock = this.props.stock[0]
        const newStock = {
            symbol: stock.symbol,
            companyName: stock.displayName,
            operation: this.state.op,
            totalAmount: this.state.amount,
            price: this.state.price,
            fee: this.state.fee,
            datePrice: this.state.tradeDate,
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
                <input id="stock-input" type="text" placeholder="Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Get</button>
                {stock.map(m =>
                    <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice}</div>)}
                <select id="select-input" name="op" onChange={this.updateHandler}>
                    <option value="Buy">Buy</option>
                    <option value="Sell">Sell</option>
                </select>
                <input id="stock-amount" type="number" placeholder="Shares #" name="amount" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-price" type="number" placeholder="Price $" name="price" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-fee" type="number" placeholder="Fee $" name="fee" value={this.state.name} onChange={this.updateHandler} />
                <input id="stock-fee" type="date" placeholder="Date" name="date" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postStock}>Add</button>
            </div>
        )
    }
}

export default SaveStock

