const toString = (state) => [`<Table src="${state.src}">`,'</Table>']

const tableProps = {
  name: 'Table',
  state: {
    src: ''
  },
  toString
}

export default tableProps