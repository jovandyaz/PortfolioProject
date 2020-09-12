import React, { Component } from 'react'
// import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './styles/App.css'

class App extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
      stock: ""
    }
  }

  updateHandler = event => this.setState({ [event.target.name]: event.target.value })

  getData = async () => {
    console.log(this.state.stock)
    const symbol = this.state.stock
    try {
      const response = await axios({
        "method": "GET",
        "url": "https://yahoo-finance-low-latency.p.rapidapi.com/v6/finance/quote",
        "headers": {
          "content-type": "application/octet-stream",
          "x-rapidapi-host": "yahoo-finance-low-latency.p.rapidapi.com",
          "x-rapidapi-key": "57ae4cfc65msh4d184d0863c6a8bp12a226jsn42ada5b35177",
          "useQueryString": true
        }, "params": {
          "lang": "en",
          "symbols": `${symbol}`
        }
      })
      this.setState({ data: response.data.quoteResponse.result[0] }, () => console.log(this.state.data))
    }
    catch (error) {
      console.log(error)
    }
  }

  componentDidMount = async () => {
    const response = await this.getData()
    console.log(response)
    console.log(this.state.stock)
  }

  render() {
    const stock = this.state.data
    return (
      <div>
        Portfolio Project
        <input id="name-input" type="text" placeholder="Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
        <button onClick={this.getData}>Go! </button>
        <div>{stock.displayName}</div>
        <div>{stock.regularMarketPrice}</div>
      </div>
    )
  }
}

export default App

