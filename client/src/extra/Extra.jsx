import React from 'react'

class Extra extends React.Component {
  constructor(props){
    super(props)
    this.state = {isShown: false}
  }

  render(){
    return (
      <div 
        className="extra branch">
        <div
          className="toolbar">
          <div 
            className="extra-toggle toggle"
            onClick={() => this.setState({isShown:!this.state.isShown})}>
            {this.state.isShown?'Hide':this.props.text}
          </div>
        </div>
        <div 
          className={this.state.isShown?'extra-contents branch':'hidden'}>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Extra