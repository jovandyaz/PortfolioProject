import React, { Component } from 'react'

export class Portfolio extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: "",
            stock: ""
        }
    }

    showPortf = () => {
        this.props.showPortf(this.props.portfolio._id)
    }

    render() {
        const portf = this.props.portfolio
        console.log(portf)
        return (
            <div>
                <h3 onClick={this.showPortf}>{portf.portfolioName}</h3>
                {portf.stocks.map(m => <p key={m._id}>{m.companyName}</p>)}
            </div>
        )
    }
}

export default Portfolio