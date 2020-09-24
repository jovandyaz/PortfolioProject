import React, { Component } from 'react'
export class SearchStock extends Component {
    constructor() {
        super()
        this.state = { stock: "" }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    getStockData = async () => { await this.props.getStockData(this.state.stock) }

    render() {
        const dataStock = this.props.dataStock
        // console.log(dataStock)
        return (
            <div>
                <input id="stock-input" type="text" placeholder="Search Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.getStockData}>Get</button>
                {dataStock.displayName
                    ? <div>{dataStock.displayName}: ${dataStock.regularMarketPrice}</div>
                    : null}
            </div>
        )
    }
}

export default SearchStock