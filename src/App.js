import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link, Redirect, } from "react-router-dom"
import Portfolios from "./components/Portfolios"
import PortfDetails from "./components/PortfDetails"
import logo from './img/logo_stocker.png'
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
        <header>
          <img className="logo" src={logo} alt="logo" />
          {/* <div className="title-menu">
            <h1 id="titleProject">Stock Market Portfolio</h1>
          </div> */}

          <nav className="navbar">
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/portfolios">Portfolios</Link></li>
              <Redirect to="/" />
            </ul>
          </nav>
        </header>

        <div className="container">
          <Route path="/portfolios" exact render={() => (<Portfolios />)} />
          <Route path="/portfolio/:id" exact render={({ match }) => (<PortfDetails match={match} />)} />
        </div>

      </Router>
    )
  }
}

export default App
