import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import "../styles/portfolio.css"
class Portfolio extends Component {

    render() {
        const portf = this.props.portfolio
        return (
            <ul className="portf_link">
                <li><Link to={`/Portfolio/${portf._id}`}>{portf.portfolioName}</Link></li>
            </ul>
        )
    }
}

export default Portfolio