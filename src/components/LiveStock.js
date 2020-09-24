import React, { Component } from 'react'
import axios from 'axios'
export class LiveStock extends Component {
    constructor() {
        super()
        this.state = {
            stockLiveAPI: {},
        }
    }

    getLiveStock = async (symbol) => {
        // console.log(symbol)
        try {
            const response = await axios({
                "method": "GET",
                "url": "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote",
                "headers": {
                    "content-type": "application/octet-stream",
                    "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
                    // "x-rapidapi-key": "57ae4cfc65msh4d184d0863c6a8bp12a226jsn42ada5b35177",  // jvaonam@me.com
                    "x-rapidapi-key": "a12a1e5f76msh3441869bfa154bfp1dbcadjsnd030ce2b2055",  // jovannotty@gmail.com
                    "useQueryString": true
                }, "params": {
                    "lang": "en",
                    "symbols": `${symbol}`
                }
            })
            this.setState({ stockLiveAPI: response.data.quoteResponse.result[0] }
                , () => console.log(this.state.stockLiveAPI)
            )
        }
        catch (error) { console.log(error) }
    }

    componentDidMount = async () => {
        this.timer = setInterval(() => {
            this.getLiveStock(this.props.symbol)
        }, 1000)
    }

    componentWillUnmount = () => clearTimeout(this.timer)

    render() {
        const stock = this.state.stockLiveAPI
        // console.log(this.props.symbol)
        return (
            <span>${stock.regularMarketPrice} | ${stock.postMarketPrice}</span>
        )
    }
}

export default LiveStock