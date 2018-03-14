import React from 'react'

const EditText = (props) => {
  return (
    <div
      className="edited-table leaf">
      <textarea
        onChange={(ev)=>props.onChangeState(props.position, {content: ev.target.value})}
        value={props.state.content}
        rows="4"
        placeholder="Add some text:">
      </textarea>
    </div>
  )
}

export default EditText