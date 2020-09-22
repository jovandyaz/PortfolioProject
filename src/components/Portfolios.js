import React, { Component } from 'react'
import Portfolio from './Portfolio'
export class Portfolios extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: ""
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postPortf = () => {
        if (this.state.portfolio !== "") {
            if (window.confirm(`Do you want to add ${this.state.portfolio} as a new portfolio?`)) {
                const newPortf = {
                    portfolioName: this.state.portfolio,
                    stocks: [],
                    cash: []
                }
                this.props.postPortf(newPortf)
                console.log(newPortf)
                alert("Portfolio added")
            } else alert("Operation canceled")
        } else alert("Add a name, please")
    }

    render() {
        const portfs = this.props.portfoliosDB
        const cash = this.props.cashDB
        console.log(portfs)
        console.log(cash)
        return (
            <div>
                {portfs.map(m => <Portfolio key={m._id} portfolio={m} />)}
                Add a new one:
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <button onClick={this.postPortf}>Create</button>
            </div>
        )
    }
}

export default Portfolios
