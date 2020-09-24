import React, { Component } from 'react'
import axios from "axios"
export class AddStock extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            operation: "Buy",
            price: 0,
            fee: 0,
            tradeDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postStock = async () => {
        if (parseFloat(this.state.amount) > 0 && parseFloat(this.state.price) > 0) {
            if (window.confirm(`Do you want to add a ${this.props.dataStock.symbol}`)) {

                const stock = this.props.dataStock
                const newStock = {
                    symbol: stock.symbol,
                    companyName: stock.displayName,
                    operation: this.state.operation,
                    amount: this.state.amount,
                    price: this.state.price,
                    fee: this.state.fee,
                    priceDate: this.state.tradeDate,
                    portfolio: this.props.portf._id
                }
                // this.props.postStock(newStock)
                await axios.post("http://localhost:8080/stock", newStock)
                console.log(newStock)
                alert("Stock added")
            } else alert("Operation canceled")
        } else alert("Add the info, please")
    }

    render() {
        const dataS = this.props.dataStock
        return (
            <div>
                {dataS !== undefined && Object.keys(dataS).length !== 0
                    ? <div>
                        <select id="select-input" name="operation" onChange={this.updateHandler}>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                        </select>
                        <input id="stock-amount" type="number" min="0" placeholder="Shares #" name="amount" value={this.state.name} onChange={this.updateHandler} />
                        <input id="stock-price" type="number" min="0" placeholder="Price $" name="price" value={this.state.name} onChange={this.updateHandler} />
                        <input id="stock-fee" type="number" min="0" placeholder="Fee $" name="fee" value={this.state.name} onChange={this.updateHandler} />
                        <input id="stock-date" type="date" placeholder="Date" name="tradeDate" value={this.state.name} onChange={this.updateHandler} />
                        <button onClick={this.postStock}>Add Stock</button>
                    </div>
                    : null}
            </div>
        )
    }
}

export default AddStock

