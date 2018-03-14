import React from 'react'
import wrapEdited from './Edited.jsx'
import EditTable from 'src/table/EditTable.jsx'
import tableProps from 'src/table'

const Blank = ()=> <div className="blank leaf"></div>
const blankProps = {
  toString: ()=>''
}

const availableComponents = [
  {
    component: EditTable,
    ...tableProps
  },
]

class Editor extends React.Component {
  constructor(props){
    super(props)
    //[{component: component, toString: toString, children:[{component: component ...}]}]
    this.state = {componentTree: [
      {
        component:Blank,
        ...blankProps
      },
    ]}
  }

  toString(){
    return this.state.componentTree.reduce((acc, cur)=>{
      const wrap = cur.component.toString()
      const string = ('children' in cur) && Array.isArray(cur.children) ? 
        wrap[0]+cur.children.map((item)=>item.toString().join(''))+wrap[1] : 
        wrap.join('')
      return acc+string
    },'')
  }

  changeState(task){
    const makeLens = (indexList, tree) => ({
      get: () => {
        const source = (indexList.length==1) ? tree : tree[indexList[0]].children
        return source.map(item => Object.assign({}, item))
      },
      set: list =>  
        tree.map((item,ind) => {
          if (indexList.length == 1) return list[ind]
          if (ind == indexList[0]) return ({...item, children: list}) 
          return Object.assign({}, item)
        })  
    })

    const makeTransform = task => {
      const listOps = {
        add: (list, pos, item) => [...list.slice(0, pos), item, ...list.slice(pos, list.length)], 
        remove: (list, pos) => [...list.slice(0, pos), ...list.slice(pos+1, list.length)],
        change: (list, pos, props) => [...list.slice(0, pos), {...props, ...list[pos]}, ...list.slice(pos+1, list.length)]
      }
      const transform = {
        add: list => listOps['add'](list, task.position[task.position.length-1], task.item),
        change: list => listOps['change'](list, task.position[task.position.length-1], task.state)
      }
      return transform[task.name]
    }

    const lens = makeLens(task.position, this.state.componentTree)

    const newTree = lens.set(makeTransform(task)(lens.get()))    

    this.setState({componentTree: newTree})
  }

  render(){
    return (<div
      className="editor branch">
      {this.state.componentTree.map((item, id) =>
        wrapEdited(item, [id], {
          onAddComponent: (position, selectedIndex) => this.changeState({
            task:'add',
            position,
            item:availableComponents[selectedIndex].component
          }), //ind: [parent pos, child pos]
          components: availableComponents
        })({
          onChangeState: (position, state) => this.changeState({
            task: 'change',
            position,
            state
          })}))}
    </div>)
  }
}

export default Editor