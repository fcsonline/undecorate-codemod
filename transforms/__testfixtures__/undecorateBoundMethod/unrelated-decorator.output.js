// @flow
import * as React from 'react'
import computed from 'mobx'

class List extends React.Component {
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
