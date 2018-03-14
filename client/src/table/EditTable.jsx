import React from 'react'

const EditTable = (props) => {
  return (
    <div
      className="edited-table leaf">
      <input 
        type="text" 
        onChange={(ev) => props.onChangeState(props.position, {src: ev.target.value})}
        value={props.state.src}/>
    </div>
  )
}

export default EditTable