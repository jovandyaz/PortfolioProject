import React, { Component } from 'react'
import { stockAPI } from '../config/stockAPI'
import LiveStock from './LiveStock'
import SearchStock from './SearchStock'
import ShowStock from './ShowStock'
import AddStock from './AddStock'

class StockDetails extends Component {
    constructor() {
        super()
        this.state = {
            stockData: {}
        }
    }

    getStockData = async (symbol) => {
        try {
            const stockData = await stockAPI.getRequest(symbol)
            this.setState({ stockData }, () => console.log(this.state.stockData))
        } catch (error) { console.log(error) }
    }

    render() {
        const portf = this.props.portf
        let symbols = []
        symbols = [...new Set(portf.stocks.map(m => m.symbol))]
        console.log(symbols)

        return (
            <div>
                <h3>Stocks:</h3>
                <h4>Symbol | Average Cost | Quantity | Live Price | Post Market</h4>
                {symbols.map(m =>
                    <div key={m}><ShowStock symbol={m} idPortf={portf._id} /> <LiveStock symbol={m} /></div>)}

                <h3>Add Stock to the Portfolio</h3>
                <SearchStock getStockData={this.getStockData} stockData={this.state.stockData} />
                <br />
                <AddStock portf={portf} stockData={this.state.stockData} getPortfoliosDB={this.props.getPortfoliosDB} />

            </div>
        )
    }
}

export default StockDetails