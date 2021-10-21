// @flow
import * as React from 'react'
import boundMethod from 'autobind-decorator'

class List extends React.Component {
  @boundMethod
  renderItem(item: ItemModel): Form {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
  }

  @boundMethod
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
