import React, { Component } from 'react'
import axios from 'axios'
import Portfolio from './Portfolio'
export class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: "",
            current: "USD"
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postPortf = async () => {
        if (this.state.portfolio !== "") {
            if (window.confirm(`Do you want to add ${this.state.portfolio} as a new portfolio?`)) {
                const newPortf = {
                    portfolioName: this.state.portfolio,
                    current: this.state.current,
                    stocks: [],
                    cash: []
                }
                // this.props.postPortf(newPortf)
                await axios.post("http://localhost:8080/portfolio", newPortf)
                console.log(newPortf)
                alert("Portfolio added")
            } else alert("Operation canceled")
        } else alert("Add a name, please")
    }

    render() {
        const portfs = this.props.portfoliosDB
        console.log(portfs)
        return (
            <div>
                {portfs.map(m => <Portfolio key={m._id} portfolio={m} />)}
                Add a new one:
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <select id="select-input" name="current" onChange={this.updateHandler}>
                    <option value="USD">USD</option>
                    <option value="MXN">MXN</option>
                </select>
                <button onClick={this.postPortf}>Create</button>
            </div>
        )
    }
}

export default Portfolios
