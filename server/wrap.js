const ST = require('stream-template')

const wrapBundle = (contentStream) => ST`
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
  wrapBundle
}