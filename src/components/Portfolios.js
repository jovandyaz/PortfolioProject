import React, { Component } from 'react'
import axios from 'axios'
import Portfolio from './Portfolio'
import AddPortfolio from './AddPortfolio'
class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfoliosDB: []
        }
    }

    getPortfoliosDB = async () => {
        const response = await axios.get("http://localhost:8080/portfolios")
        // console.log(response.data)
        this.setState({ portfoliosDB: response.data })
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    componentDidMount = async () => await this.getPortfoliosDB()

    render() {
        const portfs = this.state.portfoliosDB
        console.log(portfs)
        return (
            <React.Fragment>
                {portfs !== undefined && portfs.length !== 0
                    ? <div>
                        {portfs.map(m => <Portfolio key={m._id} portfolio={m} />)}
                        <br />
                        <AddPortfolio getPortfoliosDB={this.getPortfoliosDB} />
                    </div>
                    : <div>Loading...</div>}
            </React.Fragment>
        )
    }
}

export default Portfolios
