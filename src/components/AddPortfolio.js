import React, { Component } from 'react'
import axios from "axios"
class AddPortfolio extends Component {
    constructor() {
        super()
        this.state = {
            portfolio: "",
            current: "USD",
        }
    }

    updateHandler = event => this.setState({ [event.target.name]: event.target.value })

    postPortf = async () => {
        if (this.state.portfolio !== "") {
            if (window.confirm(`Do you want to add ${this.state.portfolio} as a new portfolio?`)) {
                const newPortf = {
                    portfolioName: this.state.portfolio,
                    current: this.state.current,
                }
                const response = await axios.post("http://localhost:8080/portfolio", newPortf)
                console.log(response)
                if (response.data.message === "Duplicate") {
                    alert("This portfolio already exists, change the name")
                }
                else {
                    console.log(newPortf)
                    alert("Portfolio added")
                    this.props.getPortfoliosDB()
                }
            } else alert("Operation canceled")
        } else alert("Add a name, please")
    }

    handleSubmit = event => event.preventDefault()

    componentDidMount = async () => await this.props.getPortfoliosDB()

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Write a new one:</label>
                <input id="portfolio-input" type="text" placeholder="Portfolio" name="portfolio" value={this.state.name} onChange={this.updateHandler} />
                <select id="select-input" name="current" onChange={this.updateHandler}>
                    <option value="USD">USD</option>
                    <option value="MXN">MXN</option>
                </select>
                <button onClick={this.postPortf}>Create</button>
            </form>
        )
    }
}

export default AddPortfolio