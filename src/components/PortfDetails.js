import React, { Component } from 'react'
import AddStock from './AddStock'
import AddCashOp from './AddCashOp'
import LiveStock from './LiveStock'
import SearchStock from './SearchStock'
import axios from "axios"
export class PortfDetails extends Component {
    constructor() {
        super()
        this.state = {
            portfoliosDB: [],
            stockAPI: {}
        }
    }

    getPortfoliosDB = async () => {
        const response = await axios.get("http://localhost:8080/portfolios")
        console.log(response.data)
        this.setState({ portfoliosDB: response.data })
    }

    getStockData = async (symbol) => {
        // console.log(symbol)
        try {
            const response = await axios({
                "method": "GET",
                "url": "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
                    "x-rapidapi-key": "57ae4cfc65msh4d184d0863c6a8bp12a226jsn42ada5b35177", // jvaonam@me.com
                    // "x-rapidapi-key": "a12a1e5f76msh3441869bfa154bfp1dbcadjsnd030ce2b2055", // jovannotty@gmail.com
                    "useQueryString": true,
                },
                "params": {
                    "lang": "en",
                    "symbols": `${symbol}`,
                }
            })
            this.setState({ stockAPI: response.data.quoteResponse.result[0] }, () => console.log(this.state.stockAPI))
        } catch (error) { console.log(error) }
    }

    findPortf = (id) => {
        const index = this.state.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    componentDidMount = async () => await this.getPortfoliosDB()

    render() {
        const matchID = this.props.match.params.id
        const portf = this.state.portfoliosDB[this.findPortf(matchID)]
        console.log(portf)
        return (
            <div>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <AddCashOp portf={portf} postCash={this.props.postCash} />
                        <h3>Cash history:</h3>
                        {portf.cash.map(m => <div key={m._id}>{m.operation}: ${m.amount}</div>)}
                        <h3>Stocks:</h3>
                        <h4>Symbol | Av Cost | Price | Post Market</h4>
                        {portf.stocks.map(m =>
                            <div key={m._id}>
                                <div>{m.symbol} | $ |
                                <LiveStock symbol={m.symbol} />
                                </div>
                            </div>)}
                        <h3>Add Stock to the Portfolio</h3>
                        <SearchStock getStockData={this.getStockData} dataStock={this.state.stockAPI} />
                        <AddStock portf={portf} dataStock={this.state.stockAPI} />
                    </div>
                    : null}
            </div>
        )
    }
}

export default PortfDetails