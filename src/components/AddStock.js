import React, { Component } from 'react'
import axios from "axios"
class AddStock extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            operation: "Buy",
            price: 0,
            percentFee: 0,
            tradeDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postStock = async () => {
        if (parseFloat(this.state.amount) > 0 && parseFloat(this.state.price) > 0) {
            if (window.confirm(`Do you want to ${this.state.operation}: ${this.props.stockData.symbol}`)) {
                const stock = this.props.stockData
                const newStock = {
                    symbol: stock.symbol,
                    companyName: stock.displayName,
                    operation: this.state.operation,
                    amount: this.state.amount,
                    price: this.state.price,
                    percentFee: this.state.percentFee,
                    priceDate: this.state.tradeDate,
                    portfolioName: this.props.portf.portfolioName,
                    portfolio: this.props.portf._id
                }
                if (this.state.operation === "Buy") {
                    const response = await axios.post("http://localhost:8080/stock", newStock)
                    if (response.data.message === "Failed") {
                        alert("Insufficient Funds")
                    }
                    else {
                        this.props.getPortfoliosDB()
                        alert("Stock added")
                    }
                }
                else if (this.state.operation === "Sell") {
                    const response = await axios.put("http://localhost:8080/stock", newStock)
                    if (response.data.message === "Failed") {
                        alert("Insufficient Stocks to Sell")
                    }
                    else {
                        this.props.getPortfoliosDB()
                        alert("Stock Sold")
                    }
                }
            } else alert("Operation Canceled")
        } else alert("Add the info, please")
    }

    handleSubmit = event => event.preventDefault()

    render() {
        const stockData = this.props.stockData
        return (
            <React.Fragment>
                {stockData !== undefined && Object.keys(stockData).length !== 0
                    ? <form onSubmit={this.handleSubmit}>
                        <label htmlFor="select-operation">Select an operation:</label>
                        <select id="select-operation" name="operation" onChange={this.updateHandler}>
                            <option value="Buy">Buy</option>
                            <option value="Sell">Sell</option>
                        </select>
                        <label htmlFor="stock-amount">Quantity:</label>
                        <input id="stock-amount" type="number" min="0" placeholder="Shares (#)" required name="amount" value={this.state.name} onChange={this.updateHandler} />
                        <label htmlFor="stock-price">Price:</label>
                        <input id="stock-price" type="number" min="0.00" placeholder="Price ($)" required name="price" value={this.state.name} onChange={this.updateHandler} />
                        <label>Fee:<input id="stock-fee" type="number" min="0" placeholder="Fee (%)" name="percentFee" value={this.state.name} onChange={this.updateHandler} /></label>
                        {/* <label>Date:<input id="stock-date" type="date" name="tradeDate" value={this.state.name} onChange={this.updateHandler} /></label> */}
                        <label>Date & Time:<input type="datetime-local" id="stock-date" name="tradeDate" value={this.state.name} onChange={this.updateHandler} /></label>
                        {/* <button onClick={this.postStock}>Add Stock</button> */}
                        <input type="reset" value="Add Stock" onClick={this.postStock} />
                        {/* <input type="submit" /> */}
                    </form>
                    : null}
            </React.Fragment>
        )
    }
}

export default AddStock

