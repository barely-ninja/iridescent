import React from 'react'
import Picture from 'src/picture/Picture.jsx'
import Extra from 'src/extra/Extra.jsx'
import Table from 'src/table/Table.jsx'
import Text from 'src/text/Text.jsx'
import Editor from 'src/editor/Editor.jsx'

const buildTree = component => {
  const componentNames = {
    Text: Text,
    Extra: Extra,
    Picture: Picture,
    Table: Table 
  }

  return (component.children.length == 0) ?
    React.createElement(componentNames[component.name], component.props, null) : 
    React.createElement(componentNames[component.name], component.props, ...component.children.map(buildTree))
}

const Content = (props) => ( 
  <div
    className="content branch">
    <Extra text="Add new post...">
      {props.loggedIn && <Editor/>}
    </Extra>
    {props.posts.map(post => 
      <div className="post branch">
        {post.components.map(buildTree)}
        <Extra text="Reply...">
          {props.loggedIn && <Editor/>}
        </Extra>
      </div>
    )}
  </div>
)

export default Content