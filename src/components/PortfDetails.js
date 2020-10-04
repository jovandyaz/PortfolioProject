import React, { Component } from 'react'
import AddStock from './AddStock'
import AddCashOp from './AddCashOp'
import LiveStock from './LiveStock'
import SearchStock from './SearchStock'
import ShowStock from './ShowStock'
import axios from "axios"
import { stockAPI } from '../config/stockAPI'
import ShowCash from './ShowCash'
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

    findPortf = (id) => {
        const index = this.state.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    componentDidMount = async () => {
        await this.getPortfoliosDB()
    }

    render() {
        const matchID = this.props.match.params.id
        const portf = this.state.portfoliosDB[this.findPortf(matchID)]
        let symbols = []
        if (portf !== undefined) {
            symbols = [...new Set(portf.stocks.map(m => m.symbol))]
            console.log(symbols)
        }
        return (
            <React.Fragment>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <h4>Total Cash: ${portf.totalCash}</h4>
                        <h3>Cash history:</h3>
                        {portf.cash.map(m => <div key={m._id}> <ShowCash cash={m} /></div>)}
                        <br />
                        <AddCashOp portf={portf} getPortfoliosDB={this.getPortfoliosDB} />

                        <h3>Stocks:</h3>
                        <h4>Symbol | Average Cost | Quantity | Live Price | Post Market</h4>
                        {/* {portf.stocks.map(m =>
                            <div key={m._id}><ShowStock stock={m} getStock={this.getStock} /> <LiveStock symbol={m.symbol} /></div>)} */}
                        {symbols.map(m =>
                            <div key={m}><ShowStock symbol={m} idPortf={portf._id} /> <LiveStock symbol={m} /></div>)}

                        <h3>Add Stock to the Portfolio</h3>
                        <SearchStock getStockData={this.getStockData} stockData={this.state.stockData} />
                        <br />
                        <AddStock portf={portf} stockData={this.state.stockData} getPortfoliosDB={this.getPortfoliosDB} />
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default PortfDetails