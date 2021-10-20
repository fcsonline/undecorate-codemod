// @flow
import * as React from 'react'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this);
    this.renderFoo = this.renderFoo.bind(this);
  }

  renderItem: Function;

  renderItem(item: ItemModel) {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
  }

  renderFoo: Function;


  renderFoo(item: ItemModel) {
    return null
  }

  render () {
    return (
      <ul className={styles.list}>
        {sorted.map(this.renderItem)}
      </ul>
    )
  }
}

export default observer(List)
