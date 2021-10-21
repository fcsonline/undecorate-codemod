// @flow
import * as React from 'react'

class List extends React.Component {
  renderItem = (item: ItemModel): Form => {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
  };

  renderFoo = (item: ItemModel) => {
    return null
  };

  render () {
    return (
      <ul className={styles.list}>
        {sorted.map(this.renderItem)}
      </ul>
    )
  }
}

export default observer(List)
