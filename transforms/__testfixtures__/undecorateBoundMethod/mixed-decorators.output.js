// @flow
import * as React from 'react'
import computed from 'mobx'

class List extends React.Component {
  constructor(props) {
    super(props)
    this.renderItem = this.renderItem.bind(this);
  }

  renderItem: Function;

  renderItem(item: ItemModel) {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
  }

  @computed
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
