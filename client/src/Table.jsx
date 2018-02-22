import React from 'react'

class Table extends React.Component {
  constructor(props){
    super(props)
    this.state = {header: [], rows: [[]]}
  }

  componentDidMount(){
    fetch(this.props.src)
      .then(response => response.text())
      .then(data => {
        const textRows = data.split('\r')
        const headerRow = textRows.shift()
        const header = headerRow.split(',')
        const rows = textRows.map(row => row.split(','))
        this.setState({ header, rows })
      })
  }

  render(){
    return (
      <div 
        className="table-container">
        <table>
          <tr>
            {this.state.header.map(item => <th>{item}</th>)}
          </tr>
          {this.state.rows.map(row => <tr>{row.map(item => <td>{item}</td>)}</tr>)}
        </table>
      </div>
    )
  }
}

export default Table