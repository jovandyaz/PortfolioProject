import React, { Component } from 'react'
class SearchStock extends Component {
    constructor() {
        super()
        this.state = { stock: "" }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getStockData = async () => { await this.props.getStockData(this.state.stock) }

    render() {
        const stockData = this.props.stockData
        // console.log(dataStock)
        return (
            <div>
                <input id="stock-input" type="text" placeholder="Search Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Get</button>
                {stockData !== undefined
                    ? stockData.displayName ? <div>{stockData.displayName}: ${stockData.regularMarketPrice}</div> : null
                    : <div>Stock no finded, try again</div>}
            </div>
        )
    }
}

export default SearchStock