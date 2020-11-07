import React, { Component } from 'react'
import { stockAPI } from '../config/stockAPI'
class LiveStock extends Component {
    _isMounted = false

    constructor() {
        super()
        this.state = {
            stockData: {}
        }
    }

    // componentDidMount() {
    //     this.timer = setInterval(
    //         () => this.getLiveStock(this.props.symbol),
    //         3000
    //     )
    // }

    getLiveStock = async (symbol) => {
        this._isMounted = true
        try {
            const stockData = await stockAPI.getRequest(symbol)
            if (this._isMounted) {
                this.setState({ stockData }
                    , () => console.log(this.state.stockData)
                )
            }
        }
        catch (error) { console.log(error) }
    }

    // componentWillUnmount() {
    //     this._isMounted = false
    //     clearInterval(this.timer)
    // }

    render() {
        const stock = this.state.stockData
        return (
            <div className="col data price">${stock.regularMarketPrice}</div>
        )
    }
}

export default LiveStock