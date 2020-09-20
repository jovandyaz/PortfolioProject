import React, { Component } from 'react'
import SaveStock from './SaveStock'
import axios from 'axios'
export class StocksPortf extends Component {
    constructor() {
        super()
        this.state = {
            stockLiveAPI: [],
            portfolio: "",
            stock: ""
        }
    }

    getLiveStock = async (symbol) => {
        // console.log(symbol)
        try {
            const response = await axios({
                "method": "GET",
                "url": "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
                    "x-rapidapi-key": "57ae4cfc65msh4d184d0863c6a8bp12a226jsn42ada5b35177",
                    "useQueryString": true
                }, "params": {
                    "lang": "en",
                    "symbols": `${symbol}`
                }
            })
            this.setState({ stockLiveAPI: response.data.quoteResponse.result }
                , () => console.log(this.state.stockLiveAPI)
            )
        }
        catch (error) { alert(error) }
    }

    findPortf = (id) => {
        const index = this.props.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    componentDidMount = async () => {
        // const portf = this.props.portfoliosDB[this.findPortf(this.props.match.params.id)]
        // console.log(portf)
        const arraySymbols = this.props.portfoliosDB[this.findPortf(this.props.match.params.id)].stocks.map(m => m.symbol)
        // console.log(arraySymbols)
        console.log(arraySymbols.toString())
        const stringSymbols = arraySymbols.toString()
        this.timer = setInterval(() => {
            this.getLiveStock(stringSymbols)
        }, 1000)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    render() {
        const matchID = this.props.match.params.id
        const portf = this.props.portfoliosDB[this.findPortf(matchID)]
        console.log(portf)
        const stockLive = this.state.stockLiveAPI
        console.log(stockLive)
        return (
            <div>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <SaveStock stock={this.props.stock} portf={portf} getStockData={this.props.getStockData} postStock={this.props.postStock} />
                        {portf.stocks.map(m => <p key={m._id}>{m.companyName}: ${m.price} - {m.operation}: ({m.totalAmount})</p>)}
                        {/* {stockLive.stocks.map(m => <p key={m.symbol}>{m.symbol}: ${m.companyName} - {m.price}</p>)} */}

                        {/* <h4>Symbol | Price | Post-Market</h4>
                        <p>{stockLive.symbol} | {stockLive.regularMarketPrice} | {stockLive.postMarketPrice}</p> */}

                    </div>
                    : null}
            </div>
        )
    }
}

export default StocksPortf