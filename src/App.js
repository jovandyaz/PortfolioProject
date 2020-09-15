import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Portfolios from './components/Portfolios'
import StocksPortf from './components/StocksPortf'
import './styles/App.css'
class App extends Component {
  constructor() {
    super()
    this.state = {
      stockAPI: [],
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
      this.setState({ stockAPI: response.data.quoteResponse.result }, () => console.log(this.state.stockAPI))
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

  postStock = async (newStock) => {
    await axios.post("http://localhost:8080/stock", newStock)
    this.getStockDB()
    this.getPortfoliosDB()
  }

  componentDidMount = async () => {
    await this.getStockDB()
    await this.getPortfoliosDB()
  }

  render() {
    const stockDB = this.state.stockDB
    return (
      <Router>

        <div className="App-container">
          <h1 id="titleProject">Portfolio Project</h1>

          <div id="main-links">
            <Link to="/" >Home</Link>
            <Link to="/portfolios" >Portfolios</Link>
            <Redirect to="/" />
          </div>

          <Route path="/portfolios" exact render={() => <Portfolios portfoliosDB={this.state.portfoliosDB} />} />
          <Route path="/portfolio/:id" exact render={({ match }) => <StocksPortf match={match} portfoliosDB={this.state.portfoliosDB} stock={this.state.stockAPI} getStockData={this.getStockData} postStock={this.postStock} />} />

          <h2>Stocks DataBase</h2>
          {stockDB.map(m => <div key={m._id}>{m.companyName} ({m.symbol}): ${m.price} - {m.datePrice}</div>)}

        </div>
      </Router>
    )
  }
}

export default App

