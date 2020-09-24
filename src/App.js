import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Redirect, } from "react-router-dom"
import Portfolios from "./components/Portfolios"
import PortfDetails from "./components/PortfDetails"
import "./styles/App.css"
class App extends Component {

  componentDidMount = () => { }

  render() {
    return (
      <Router>
        <div className="App-container">
          <h1 id="titleProject">Portfolio Project</h1>

          <div id="main-links">
            <Link to="/">Home</Link>
            <Link to="/portfolios">Portfolios</Link>
            <Redirect to="/" />
          </div>

          <Route path="/portfolios" exact render={() => (
            <Portfolios />)} />
          <Route path="/portfolio/:id" exact render={({ match }) => (
            <PortfDetails match={match} />
          )} />

        </div>
      </Router>
    )
  }
}

export default App
