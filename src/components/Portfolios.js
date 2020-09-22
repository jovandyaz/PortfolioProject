import React, { Component } from 'react'
import Portfolio from './Portfolio'
export class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: ""
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postPortf = () => {
        const newPortf = {
            portfolioName: this.state.portfolio,
            stocks: [],
            cash: []
        }
        this.props.postPortf(newPortf)
        console.log(newPortf)
    }

    render() {
        const portfs = this.props.portfoliosDB
        const cash = this.props.cashDB
        console.log(portfs)
        console.log(cash)
        return (
            <div>
                {portfs.map(m => <Portfolio key={m._id} portfolio={m} />)}
                Add a new one: 
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postPortf}>Create</button>
            </div>
        )
    }
}

export default Portfolios
