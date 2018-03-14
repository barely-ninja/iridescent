import React from 'react'
import Picture from 'src/picture/Picture.jsx'
import Extra from 'src/extra/Extra.jsx'
import Table from 'src/table/Table.jsx'
import Text from 'src/text/Text.jsx'
import Editor from 'src/editor/Editor.jsx'

const Content = () => ( 
  <div
    className="content branch">
    <Extra text="Add new post...">
      <Editor/>
    </Extra>
    <div className="post branch">
      <Text>Hello world, this is result of SSR:</Text>
      <Picture src="https://dummyimage.com/300x200/000000/cc33dd.png&text=Hiiii">some pic</Picture>
      <Extra text="from data...">
        <Text>from data shown in table:</Text>
        <Table src="http://samplecsvs.s3.amazonaws.com/SalesJan2009.csv">some table</Table>
      </Extra>
      <Extra text="Reply...">
        <Editor/>
      </Extra>
    </div>

  </div>
)

export default Content