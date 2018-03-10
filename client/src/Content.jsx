import React from 'react'
import Picture from 'src/picture/Picture.jsx'
import Extra from 'src/extra/Extra.jsx'
import Table from 'src/table/Table.jsx'
import Editor from 'src/editor/Editor.jsx'

const Content = () => ( 
  <div
    className="content-container">
    <div className="post-container">
      <p>Hello world, this is result of SSR:</p>
      <Picture src="https://dummyimage.com/300x200/000000/cc33dd.png&text=Hiiii">some pic</Picture>
      <Extra text="from data...">
        <p>from data shown in table:</p>
        <Table src="http://samplecsvs.s3.amazonaws.com/SalesJan2009.csv">some table</Table>
      </Extra>
    </div>
    <Editor/>
  </div>
)

export default Content