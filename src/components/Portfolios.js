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
            stocks: []
        }
        this.props.postPortf(newPortf)
        console.log(newPortf)
    }

    render() {
        const portfs = this.props.portfoliosDB
        return (
            <div>
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postPortf}>Create</button>
                {portfs.map(m => <Portfolio key={m._id} portfolio={m} showPortf={this.showPortf} />)}
            </div>
        )
    }
}

export default Portfolios
