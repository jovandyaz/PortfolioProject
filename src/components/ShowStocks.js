import React, { Component } from 'react'
import axios from "axios"

class ShowStocks extends Component {
    constructor() {
        super()
        this.state = {
            stockData: {}
        }
    }

    componentDidMount() {
        this.timer = setInterval(
            () => this.getStock(),
            1000
        )
    }
    // componentDidMount() {
    //     this.getStock()
    // }

    getStock = async () => {
        const response = await axios.get(`http://localhost:8080/stocks/${this.props.idPortf}/${this.props.symbol}`)
        this.setState({ stockData: response.data })
    }

    componentWillUnmount() {
        this._isMounted = false
        clearInterval(this.timer)
    }

    render() {
        const stock = this.state.stockData
        return (
            <React.Fragment>
                    <div className="col data symbol">{stock.symbol}</div>
                    <div className="col data avCost">${stock.averageCost}</div>
                    <div className="col data quantity">{stock.totalRemaining}</div>
            </React.Fragment>
        )
    }
}
export default ShowStocks