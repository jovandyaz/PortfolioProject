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
            portfoliosDB: []
        }
    }

    getPortfoliosDB = async () => {
        const response = await axios.get("http://localhost:8080/portfolios")
        console.log(response.data)
        this.setState({ portfoliosDB: response.data })
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
        return (
            <React.Fragment>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <h3>Cash: ${portf.totalCash.toFixed(2)}</h3>
                        {portf.cash.length > 0
                            ? <div>
                                <h4>History:</h4>
                                {portf.cash.map(m => <div key={m._id}> <ShowCash cash={m} /></div>)}
                            </div>
                            : null
                        }
                        <br />
                        <AddCashOp portf={portf} getPortfoliosDB={this.getPortfoliosDB} />
                        <StockDetails portf={portf} getPortfoliosDB={this.getPortfoliosDB} />
                    </div>
                    : null}
            </React.Fragment>
        )
    }
}

export default PortfDetails