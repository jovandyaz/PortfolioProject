import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Portfolio extends Component {

    render() {
        const portf = this.props.portfolio
        return (
            <div>
                -<Link to={`/Portfolio/${portf._id}`}>{portf.portfolioName}</Link>
                {/* {portf.cash.map(m => <p key={m._id}>{m.amount}</p>)} */}
            </div>
        )
    }
}

export default Portfolio