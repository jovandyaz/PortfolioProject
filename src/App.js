import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Redirect, } from "react-router-dom"
import Portfolios from "./components/Portfolios"
import PortfDetails from "./components/PortfDetails"
import "./styles/App.css"
class App extends Component {

  checkServer = () => {
    const xhttp = new XMLHttpRequest()
    try {
      xhttp.onreadystatechange = function () {
        console.log(xhttp)
        if (xhttp.readyState === 4 && xhttp.status === 0) {
          alert("Unknown Error Occured. Server response not received.")
        }
      };
      xhttp.open("GET", "http://localhost:8080/portfolios", true);
      // xhttp.open()
      xhttp.send()
    } catch (e) {
      console.log('catch', e)
    }
  }

  componentDidMount = () => {
    this.checkServer()
  }

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
          <br />
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
