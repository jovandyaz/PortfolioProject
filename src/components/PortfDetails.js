import React, { Component } from 'react'
import SaveStock from './SaveStock'
import SaveCash from './SaveCash'
import LiveStock from './LiveStock'
export class PortfDetails extends Component {

    findPortf = (id) => {
        const index = this.props.portfoliosDB.findIndex(p => p._id === id)
        return index
    }

    render() {
        const matchID = this.props.match.params.id
        const portf = this.props.portfoliosDB[this.findPortf(matchID)]
        console.log(portf)
        return (
            <div>
                {portf !== undefined ?
                    <div>
                        <h2>{portf.portfolioName}</h2>
                        <SaveCash portf={portf} postCash={this.props.postCash} />
                        <SaveStock portf={portf}
                            stock={this.props.stock} getStockData={this.props.getStockData} postStock={this.props.postStock} />
                        {portf.cash.map(m => <div key={m._id}>{m.operation}: ${m.amount}</div>)}
                        {portf.stocks.map(m =>
                            <div key={m._id}>
                                <div>Symbol | Av Cost | Price | Post Market</div>
                                <div>{m.symbol} | $ | <LiveStock symbol={m.symbol} /></div>
                            </div>)}
                    </div>
                    : null}
            </div>
        )
    }
}

export default PortfDetails