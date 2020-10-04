import React, { Component } from 'react'

class ShowCash extends Component {
    render() {
        const cash = this.props.cash
        const { operation, amount, operationDate } = cash
        // console.log(operationDate)
        // console.log( new Date(operationDate))
        const formatedDate = new Date(operationDate).toDateString()
        // console.log(formatedDate)
        return (
            < React.Fragment >
                { operation}: ${ amount} - {formatedDate } | {operationDate}
            </React.Fragment >
        )
    }
}

export default ShowCash