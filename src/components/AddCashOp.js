import React, { Component } from 'react'
import axios from "axios"
class AddCashOp extends Component {
    constructor() {
        super()
        this.state = {
            operation: "Deposit",
            amount: 0,
            operationDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postCash = async () => {
        if (parseFloat(this.state.amount) > 0) {
            if (window.confirm(`Do you want to do a ${this.state.operation} of $${this.state.amount}?`)) {
                const cash = {
                    portfolio: this.props.portf._id,
                    operation: this.state.operation,
                    amount: this.state.amount,
                    operationDate: this.state.operationDate,
                }
                const response = await axios.post("http://localhost:8080/cash", cash)
                console.log(response)
                if (response.data.message === "Failed") {
                    alert("Insufficient funds")
                }
                else {
                    this.props.getPortfoliosDB()
                    alert("Operation done")
                }
            } else alert("Operation canceled")
        } else alert("Add an amount, please")
    }

    handleSubmit = event => event.preventDefault()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h3>Manage cash in this portfolio</h3>
                <label htmlFor="cash-input">Amount:</label>
                <input id="cash-input" type="number" min="0" placeholder="$" name="amount" value={this.state.name} onChange={this.updateHandler} />
                <select id="select-input" name="operation" onChange={this.updateHandler}>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                    {/* <option value="Dividend">Dividend</option> */}
                    {/* <option value="Sold">Sold</option> */}
                </select>
                <label htmlFor="cash-date">Date:</label>
                <input id="cash-date" type="datetime-local" name="operationDate" value={this.state.name} onChange={this.updateHandler} />
                {/* <button onClick={this.postCash}>Update Cash</button> */}
                <input type="reset" value="Update Cash" onClick={this.postCash} />
            </form>
        )
    }
}

export default AddCashOp