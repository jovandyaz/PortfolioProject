import React, { Component } from 'react'
import { stockAPI } from '../config/stockAPI'
import LiveStock from './LiveStock'
import SearchStock from './SearchStock'
import ShowStocks from './ShowStocks'
import AddStock from './AddStock'
import '../styles/stockDetails.css'
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
            <React.Fragment>
                {symbols.length > 0
                    ? <section className="stocks">
                        <div className="grid-stocks">
                            <div className="col title symbol">Symbol</div>
                            <div className="col title avCost">Av. Cost</div>
                            <div className="col title quantity">Quantity</div>
                            <div className="col title price">Price</div>
                            {symbols.map(m =>
                                <React.Fragment key={m}><ShowStocks symbol={m} idPortf={portf._id} /> <LiveStock symbol={m} /></React.Fragment>)}
                        </div>
                    </section>
                    : null}
                <br />
                <h4>Add Stock to the Portfolio</h4>
                <SearchStock getStockData={this.getStockData} stockData={this.state.stockData} />
                <br />
                <AddStock portf={portf} stockData={this.state.stockData} getPortfoliosDB={this.props.getPortfoliosDB} />
            </React.Fragment>
        )
    }
}

export default StockDetails