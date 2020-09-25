import React, { Component } from 'react'
import axios from 'axios'
import Portfolio from './Portfolio'
import AddPortfolio from './AddPortfolio'
export class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfoliosDB: [],
            cashDB: [],
            stockDB: []
        }
    }

    getPortfoliosDB = async () => {
        const response = await axios.get("http://localhost:8080/portfolios")
        // console.log(response.data)
        this.setState({ portfoliosDB: response.data })
    }

    getCashDB = async () => {
        const response = await axios.get("http://localhost:8080/cash")
        // console.log(response.data)
        this.setState({ cashDB: response.data })
    }

    getStockDB = async () => {
        const response = await axios.get("http://localhost:8080/stocks")
        // console.log(response.data)
        this.setState({ stockDB: response.data })
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getDBdata = async () => {
        await this.getPortfoliosDB()
        await this.getCashDB()
        await this.getStockDB()
    }

    componentDidMount = async () => await this.getDBdata()

    render() {
        const stockDB = this.state.stockDB
        const portfs = this.state.portfoliosDB
        console.log(portfs)
        return (
            <div>
                {portfs !== undefined && portfs.length !== 0
                    ? <div>
                        {portfs.map(m => <Portfolio key={m._id} portfolio={m} />)}
                        <AddPortfolio getPortfoliosDB={this.getPortfoliosDB} />

                        <h2>Stocks DataBase</h2>
                        {stockDB.map((m) => (
                            <div key={m._id}>{m.companyName} ({m.symbol}): ${m.price}</div>
                        ))}
                    </div>
                    : <div>Loading...</div>}
            </div>
        )
    }
}

export default Portfolios
