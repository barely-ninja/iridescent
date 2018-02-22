import React from 'react'
import ReactDOM from 'react-dom'
import Content from 'src/Content.jsx'

document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render(
    React.createElement(Content),
    document.getElementById('mount')
  )
})