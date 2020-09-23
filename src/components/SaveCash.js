import React, { Component } from 'react'

export class SaveCash extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: "",
            operation: "Deposit",
            amount: 0,
            operationDate: new Date()
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postCash = () => {
        if (this.state.amount !== "" && parseFloat(this.state.amount) > 0) {
            if (window.confirm(`Do you want to do a ${this.state.operation} of $${this.state.amount}?`)) {
                const cash = {
                    portfolio: this.props.portf._id,
                    operation: this.state.operation,
                    amount: this.state.amount,
                    operationDate: this.state.operationDate,
                }
                this.props.postCash(cash)
                console.log(cash)
                alert("Operation done")
            } else alert("Operation canceled")
        } else alert("Add an amount, please")
    }

    render() {
        return (
            <div>
                <h3>Manage cash in this portfolio</h3>
                <input id="cash-input" type="number" min="0" placeholder="Amount" name="amount" value={this.state.name} onChange={this.updateHandler} />
                <select id="select-input" name="operation" onChange={this.updateHandler}>
                    <option value="Deposit">Deposit</option>
                    <option value="Withdraw">Withdraw</option>
                </select>
                <input id="cash-date" type="date" placeholder="Date" name="operationDate" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postCash}>Update Cash</button>
            </div>
        )
    }
}

export default SaveCash