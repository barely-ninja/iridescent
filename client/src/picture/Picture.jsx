import React from 'react'

const Picture = props => (
  <div
    className="picture leaf">
    <img src={props.src} alt={props.caption}/>
  </div>)

export default Picture