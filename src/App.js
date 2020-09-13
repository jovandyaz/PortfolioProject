import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import './styles/App.css'
class App extends Component {
  constructor() {
    super()
    this.state = {
      dataStock: [],
      stockDB: [],
      stock: ""
    }
  }

  updateHandler = event => this.setState({ [event.target.name]: event.target.value })

  getStockData = async () => {
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
      this.setState({ dataStock: response.data.quoteResponse.result }, ()=> console.log(this.state.dataStock))
    }
    catch (error) { alert(error) }
  }

  getStockDB = async () => {
    const response = await axios.get("http://localhost:8080/stocks")
    console.log(response.data)
    this.setState({ stockDB: response.data })
  }

  componentDidMount = async () => {
    await this.getStockDB()
  }

  postStock = async () => {
    let stock = this.state.dataStock[0]
    function toDateTime(secs) { return new Date(1970, 0, 1).setSeconds(secs) }
    let postStock = { symbol: stock.symbol, companyName: stock.displayName, price: stock.regularMarketPrice, datePrice: toDateTime(stock.regularMarketTime), portfolio: "5f5da506a20a658eb27e7580" }
    await axios.post("http://localhost:8080/stock", postStock)
    this.getStockDB()
  }

  render() {
    const stock = this.state.dataStock
    const stockDB = this.state.stockDB
    return (
      <Router>

        <div className="App-container">
          <h1 id="titleProject">Portfolio Project</h1>

          <div id="main-links">
            <Link to="/" >Home</Link>
            <Redirect to="/" />
          </div>

          <h3>Get Stock from API</h3>
          <input id="stock-input" type="text" placeholder="Stock" name="stock" value={this.state.name} onChange={this.updateHandler} />
          <button onClick={this.getStockData}>Get</button>
          {stock.map(m => <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice} <button onClick={this.postStock}>Save</button></div>)}
          <h3>Stocks DataBase</h3>
          {stockDB.map(m => <div key={m._id}>{m.companyName} ({m.symbol}): ${m.price} - {m.datePrice}</div>)}

        </div>
      </Router>
    )
  }
}

export default App

