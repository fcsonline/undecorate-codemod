// @flow
import * as React from 'react'
import boundMethod from 'autobind-decorator'

type CustomProps = {}

type State = {
  loading: boolean
}

class List extends React.Component<CustomProps, State> {
  state = {
    loading: true
  }

  async componentDidMount () {
    this.setState({ loading: false })
  }

  @boundMethod
  renderItem(item: ItemModel) {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
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