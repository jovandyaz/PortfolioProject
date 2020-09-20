import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Portfolio extends Component {

    render() {
        const portf = this.props.portfolio
        return (
            <div>
                <Link to={`/Portfolio/${portf._id}`}>{portf.portfolioName}</Link>
                {/* {portf.stocks.map(m => <p key={m._id}>{m.companyName}: {m.price}</p>)} */}
            </div>
        )
    }
}

export default Portfolio