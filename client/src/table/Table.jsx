import React from 'react'

class Table extends React.Component {
  constructor(props){
    super(props)
    this.state = {header: [], rows: [[]]}
  }

  componentDidMount(){
    /*fetch(this.props.src, {mode: 'no-cors'})
      .then(response => {console.log(response); return response.text()})
      .then(data => {
        console.log(data)
        const textRows = data.split('\n')
        const headerRow = textRows.shift()
        const header = headerRow.split(',')
        const rows = textRows.map(row => row.split(','))
        this.setState({ header, rows })
      })*/
    this.setState({ header:['n', 'ttt'], rows:[[11,12],[13,14]] })
  }

  render(){
    return (
      <div 
        className="table leaf">
        <table>
          <thead>
            <tr>
              {this.state.header.map((item, id) => <th key={id}>{item}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.state.rows.map((row,id) =>
              <tr key={id}>
                {row.map((item,id) => <td key={id}>{item}</td>)}
              </tr>)}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Table