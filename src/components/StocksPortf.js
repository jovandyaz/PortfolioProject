import React, { Component } from 'react'
import StockSearch from './StockSearch'

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
        console.log(this.props)
        return (
            <div>
                <StockSearch stock={this.props.stock} getStockData={this.props.getStockData} postStock={this.props.postStock}/>
                <h3>{portf.portfolioName}</h3>
                {portf.stocks.map(m => <p key={m._id}>{m.companyName}</p>)}
            </div>
        )
    }
}

export default StocksPortf