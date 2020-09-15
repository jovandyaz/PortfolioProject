import React, { Component } from 'react'
import SaveStock from './SaveStock'
export class StocksPortf extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: "",
            stock: ""
        }
    }

    findPortf = (id) => {
        const index = this.props.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    render() {
        const matchID = this.props.match.params.id
        const portf = this.props.portfoliosDB[this.findPortf(matchID)]
        console.log(portf)
        return (
            <div>
                <SaveStock stock={this.props.stock} portf={portf} getStockData={this.props.getStockData} postStock={this.props.postStock} />
                <h3>{portf.portfolioName}</h3>
        {portf.stocks.map(m => <p key={m._id}>{m.companyName}: ${m.price} - {m.operation}: ({m.totalAmount})</p>)}
            </div>
        )
    }
}

export default StocksPortf