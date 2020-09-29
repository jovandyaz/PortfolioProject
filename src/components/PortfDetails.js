import React, { Component } from 'react'
import AddStock from './AddStock'
import AddCashOp from './AddCashOp'
import LiveStock from './LiveStock'
import SearchStock from './SearchStock'
import { stockAPI } from '../config/stockAPI'
import axios from "axios"
class PortfDetails extends Component {
    constructor() {
        super()
        this.state = {
            portfoliosDB: [],
            stockData: {}
        }
    }

    getPortfoliosDB = async () => {
        const response = await axios.get("http://localhost:8080/portfolios")
        console.log(response.data)
        this.setState({ portfoliosDB: response.data })
    }

    getStockData = async (symbol) => {
        try {
            const stockData = await stockAPI.getRequest(symbol)
            this.setState({ stockData }, () => console.log(this.state.stockData))
        } catch (error) { console.log(error) }
    }

    componentDidMount = async () => {
        await this.getPortfoliosDB()
    }

    findPortf = (id) => {
        const index = this.state.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    render() {
        const matchID = this.props.match.params.id
        const portf = this.state.portfoliosDB[this.findPortf(matchID)]
        console.log(portf)
        return (
            <div>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <h3>Cash history:</h3>
                        {portf.cash.map(m => <div key={m._id}>{m.operation}: ${m.amount}</div>)}
                        <br />
                        <AddCashOp portf={portf} getPortfoliosDB={this.getPortfoliosDB} />
                        <h3>Stocks:</h3>
                        <h4>Symbol | Av Cost | Price | Post Market</h4>
                        {portf.stocks.map(m =>
                            <div key={m._id}>
                                <div>{m.symbol} | $ | <LiveStock symbol={m.symbol} /></div>
                            </div>)}
                        <h3>Add Stock to the Portfolio</h3>
                        <SearchStock getStockData={this.getStockData} stockData={this.state.stockData} />
                        <br />
                        <AddStock portf={portf} stockData={this.state.stockData} getPortfoliosDB={this.getPortfoliosDB} />
                    </div>
                    : null}
            </div>
        )
    }
}

export default PortfDetails