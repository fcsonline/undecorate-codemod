// @flow
import * as React from 'react'

type Props = {}

type State = {
  loading: boolean
}

class List extends React.Component<Props, State> {
  state = {
    loading: true
  }

  async componentDidMount () {
    this.setState({ loading: false })
  }

  renderItem = async (item: ItemModel) => {
    return (
      <li key={item.id}>
        { /**/ }
      </li>
    )
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
