import React, { Component } from 'react'
import axios from "axios"
import AddCashOp from './AddCashOp'
import ShowCash from './ShowCash'
import StockDetails from './StockDetails'
import "../styles/portfDetails.css"
class PortfDetails extends Component {
    constructor() {
        super()
        this.state = {
            portfoliosDB: [],
            portfolioData: [],
            stocksDB: []
        }
    }

    getPortfoliosDB = async () => {
        const portfoliosDB = await axios.get("http://localhost:8080/portfolios/open_stocks")
        const portfolioData = await axios.get(`http://localhost:8080/portfolio/${this.props.match.params.id}/open_stocks`)
        const stocksDB = await axios.get("http://localhost:8080/stocks")
        console.log(portfoliosDB.data)
        console.log(portfolioData.data)
        console.log(stocksDB.data)
        this.setState({ portfoliosDB: portfoliosDB.data, stocksDB: stocksDB.data, portfolioData: portfolioData.data })
    }

    // findPortf = (id) => {
    //     const index = this.state.portfoliosDB.findIndex(p => p._id === id)
    //     return index
    // }

    componentDidMount = async () => {
        await this.getPortfoliosDB()
    }

    render() {
        // const matchID = this.props.match.params.id
        // const portf = this.state.portfoliosDB[this.findPortf(matchID)]
        const portf = this.state.portfolioData
        // console.log(this.state.portfoliosDB)
        console.log(this.state.portfolioData)
        console.log(this.state.stocksDB)
        return (
            <React.Fragment>
                {portf !== undefined && Object.keys(portf).length !== 0
                    ?
                    <div className="portf_details">
                        <h1>{portf.portfolioName}</h1>
                        <h2>${portf.totalCash.toFixed(2)}</h2>
                        <h2>${portf.realizedPL.toFixed(2)}</h2>
                        <h3>History:</h3>
                        {portf.cash.map(m => <div key={m._id}> <ShowCash cash={m} /></div>)}
                        <br />
                        <AddCashOp portf={portf} getPortfoliosDB={this.getPortfoliosDB} />
                        <br />
                        <StockDetails portf={portf} getPortfoliosDB={this.getPortfoliosDB} />
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default PortfDetails