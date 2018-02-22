const ST = require('stream-template')

const wrapContent = content => `
  import React from 'react'
  import Picture from 'src/Picture.jsx'
  import Extra from 'src/Extra.jsx'
  import Table from 'src/Table.jsx'

  const Content = props => ( 
  <div
    className="content-container">
    ${content}
  </div>
  )

  export default Content
`
const wrapBundle = contentStream => ST`
  <html>
      <head>
        <link rel="icon" href="data:;base64,iVBORw0KGgo=">
      </head>
      <body>
        <div id="mount"></div>
      </body>
      <script type="text/javascript">
      ${contentStream}
      </script>
  </html>

`

module.exports = {
  wrapContent,
  wrapBundle
}