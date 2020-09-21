import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import Portfolios from './components/Portfolios'
import PortfDetails from './components/PortfDetails'
import './styles/App.css'
class App extends Component {
  constructor() {
    super()
    this.state = {
      portfoliosDB: [],
      cashDB: [],
      stockDB: [],
      stockAPI: [],
      stockLiveAPI: [],
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
          "x-rapidapi-key": "57ae4cfc65msh4d184d0863c6a8bp12a226jsn42ada5b35177",
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

  getStockData = async (symbol) => {
    // console.log(symbol)
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
    catch (error) { console.log(error) }
  }

  getPortfoliosDB = async () => {
    const response = await axios.get("http://localhost:8080/portfolios")
    console.log(response.data)
    this.setState({ portfoliosDB: response.data })
  }

  getStockDB = async () => {
    const response = await axios.get("http://localhost:8080/stocks")
    console.log(response.data)
    this.setState({ stockDB: response.data })
  }

  getCashDB = async () => {
    const response = await axios.get("http://localhost:8080/cash")
    console.log(response.data)
    this.setState({ cashDB: response.data })
  }

  getDBdata = async () => {
    await this.getPortfoliosDB()
    await this.getStockDB()
    await this.getCashDB()
  }

  postPortf = async (newPortf) => {
    await axios.post("http://localhost:8080/portfolio", newPortf)
    this.getDBdata()
  }

  postCash = async (newCash) => {
    await axios.post("http://localhost:8080/cash", newCash)
    this.getDBdata()
  }

  postStock = async (newStock) => {
    await axios.post("http://localhost:8080/stock", newStock)
    this.getDBdata()
  }

  componentDidMount = async () => {
    await this.getDBdata()
    this.timer = setInterval(() => {
      this.getLiveStock("AAPL")
    }, 1000)
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
  }

  render() {
    const stockDB = this.state.stockDB
    const stockLive = this.state.stockLiveAPI
    return (
      <Router>

        <div className="App-container">
          <h1 id="titleProject">Portfolio Project</h1>

          <div id="main-links">
            <Link to="/" >Home</Link>
            <Link to="/portfolios" >Portfolios</Link>
            <Redirect to="/" />
          </div>

          <Route path="/portfolios" exact render={() => <Portfolios portfoliosDB={this.state.portfoliosDB} postPortf={this.postPortf} cashDB={this.state.cashDB}/>} />
          <Route path="/portfolio/:id" exact render={({ match }) =>
            <PortfDetails match={match} portfoliosDB={this.state.portfoliosDB}
              stock={this.state.stockAPI} getStockData={this.getStockData} postStock={this.postStock} 
              postCash={this.postCash} />} />

          <h2>Stocks DataBase</h2>
          {stockDB.map(m => <div key={m._id}>{m.companyName} ({m.symbol}): ${m.price}</div>)}

          <h3>Live Data (beta)</h3>
          <h4>Symbol | Price | Post-Market</h4>
          <p>{stockLive.symbol} | {stockLive.regularMarketPrice} | {stockLive.postMarketPrice}</p>

        </div>
      </Router>
    )
  }
}

export default App

