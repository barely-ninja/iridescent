import React from 'react'

const wrapEdited = (target, id, commonProps) => {
  console.log(target, id, commonProps)
  return (props) => (
    <div
      className="editor-component-wrapper" key={id.join('-')}>
      {('children' in target && Array.isArray(target.children)) ? 
        target.children.map((item, cid) => {
          const childId = id.slice()
          childId.push(cid)
          return wrapEdited(item, childId, commonProps)
        }) : 
        React.createElement(target.component, {...props, position: id})}
      <div
        className="add-component-button">
        Add
      </div>
      <div
        className="component-list">
        <ul>
          {commonProps.components.map((item, ind) => (
            <li 
              key={ind} 
              onClick={()=>commonProps.onAddComponent(id, ind)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>    
    </div> 
  )
}

export default wrapEdited