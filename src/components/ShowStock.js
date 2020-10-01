import React, { Component } from 'react'
import axios from "axios"

 class ShowStock extends Component {
    constructor() {
        super()
        this.state = {
            stockData: {},
        }
    }

    componentDidMount (){
        this.getStock()
    }

    getStock = async () => {
        const response = await axios.get(`http://localhost:8080/stocks/${this.props.idPortf}/${this.props.symbol}`)
        this.setState({ stockData: response.data })
    }
    
    render() {
        const stock = this.state.stockData
        return (
            <span>
                {stock.symbol}: ${stock.averageCost} - ({stock.totalAmount})
            </span>
        )
    }
}
export default ShowStock