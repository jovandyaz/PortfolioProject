import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import StockSearch from './components/StockSearch'
import Portfolios from './components/Portfolios'
import StocksPortf from './components/StocksPortf'
import './styles/App.css'
class App extends Component {
  constructor() {
    super()
    this.state = {
      dataStock: [],
      stockDB: [],
      portfoliosDB: []
    }
  }

  getStockData = async (symbol) => {
    console.log(symbol)
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
      this.setState({ dataStock: response.data.quoteResponse.result }, () => console.log(this.state.dataStock))
    }
    catch (error) { alert(error) }
  }

  getStockDB = async () => {
    const response = await axios.get("http://localhost:8080/stocks")
    console.log(response.data)
    this.setState({ stockDB: response.data })
  }

  getPortfoliosDB = async () => {
    const response = await axios.get("http://localhost:8080/portfolios")
    console.log(response.data)
    this.setState({ portfoliosDB: response.data })
  }

  componentDidMount = async () => {
    await this.getStockDB()
    await this.getPortfoliosDB()
  }

  postStock = async () => {
    let stock = this.state.dataStock[0]
    // function toDateTime(secs) { return new Date(1970, 0, 1).setSeconds(secs) }
    const toDateTime = (secs) => { return new Date(1970, 0, 1).setSeconds(secs) }
    let postStock = {
      totalAmount: 1,
      symbol: stock.symbol,
      companyName: stock.displayName,
      price: stock.regularMarketPrice,
      datePrice: toDateTime(stock.regularMarketTime),
      portfolio: "5f5ed6b9b0ad7013f62751ba"
    }
    await axios.post("http://localhost:8080/stock", postStock)
    this.getStockDB()
  }

  render() {
    // const stock = this.state.dataStock
    const stockDB = this.state.stockDB
    return (
      <Router>

        <div className="App-container">
          <h1 id="titleProject">Portfolio Project</h1>

          <div id="main-links">
            <Link to="/" >Home</Link>
            <Link to="/Portfolios" >Portfolios</Link>
            <Redirect to="/" />
          </div>

          <Route path="/" exact render={() => <StockSearch stock={this.state.dataStock} getStockData={this.getStockData} postStock={this.postStock}/>} />
          <Route path="/portfolios" exact render={() => <Portfolios portfoliosDB={this.state.portfoliosDB} />} />
          <Route path="/portfolio/:id" exact render={({ match }) => <StocksPortf match={match} portfoliosDB={this.state.portfoliosDB} stock={this.state.dataStock} getStockData={this.getStockData} postStock={this.postStock}/>} />

          {/* {stock.map(m => <div key={m.symbol}>{m.displayName}: ${m.regularMarketPrice} <button onClick={this.postStock}>Save</button></div>)} */}

          <h3>Stocks DataBase</h3>
          {stockDB.map(m => <div key={m._id}>{m.companyName} ({m.symbol}): ${m.price} - {m.datePrice}</div>)}

        </div>
      </Router>
    )
  }
}

export default App

