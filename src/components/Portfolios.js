import React, { Component } from 'react'

export class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: ""
        }
    }

    getStockData = () => {

    }

    render() {
        const stock = this.props.dataStock
        return (
            <div>
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Creat </button>
                <div>{stock.map(m => m.displayName)}</div>
            </div>
        )
    }
}

export default Portfolios
