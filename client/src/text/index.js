const toString = (state) => [`<Table text="${state.content}">`,'</Table>']

const textProps = {
  name: 'Text',
  state: {
    content: ''
  },
  toString
}

export default textProps