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

    render() {
        const portfs = this.props.portfoliosDB
        return (
            <div>
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <button >Creat</button>
                {portfs.map(m => <Portfolio key={m._id} portfolio={m} showPortf={this.showPortf} />)}
            </div>
        )
    }
}

export default Portfolios
