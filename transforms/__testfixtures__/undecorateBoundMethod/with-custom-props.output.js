// @flow
import * as React from 'react'

type CustomProps = {}

type State = {
  loading: boolean
}

class List extends React.Component<CustomProps, State> {
  constructor(props: CustomProps) {
    super(props)
    this.renderItem = this.renderItem.bind(this);
  }

  state = {
    loading: true
  }

  async componentDidMount () {
    this.setState({ loading: false })
  }

  renderItem: Function;


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
