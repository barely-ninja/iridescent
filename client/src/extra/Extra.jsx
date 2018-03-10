import React from 'react'

class Extra extends React.Component {
  constructor(props){
    super(props)
    this.state = {isShown: false}
  }

  render(){
    return (
      <div 
        className="extra-container"
        onClick={() => this.setState({isShown:!this.state.isShown})}>
        {this.state.isShown?this.props.children:this.props.text}
      </div>
    )
  }
}

export default Extra