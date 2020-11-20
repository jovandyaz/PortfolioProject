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
    componentDidMount() {
        this.getLiveStock(this.props.symbol)
    }

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
            <React.Fragment>
                { stock.regularMarketPrice !== undefined ?
                    <div className="col data price">${stock.regularMarketPrice.toFixed(2)}</div>
                    : <div className="col data price">$0</div>
                }
            </React.Fragment>

        )
    }
}

export default LiveStock