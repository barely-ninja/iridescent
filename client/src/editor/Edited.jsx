import React from 'react'

const wrapEdited = (target, id, commonProps) => {
  //console.log(target, id, commonProps)
  return (props) => (
    <div
      className="edited branch" key={id.join('-')}>
      {('children' in target && Array.isArray(target.children)) ? 
        target.children.map((item, cid) => {
          const childId = id.slice()
          childId.push(cid)
          return wrapEdited(item, childId, commonProps)
        }) : 
        React.createElement(target.component, {...props, position: id})}
      <div
        className="toolbar">
        <div
          className="add-toggle toggle">
          Add:
          <div
            className="add-components">
            <select name="components">
              {commonProps.components.map((item, ind) => (
                <option 
                  key={ind}
                  value={ind} 
                  onSelect={()=>commonProps.onAddComponent(id, ind)}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>    
    </div> 
  )
}

export default wrapEdited