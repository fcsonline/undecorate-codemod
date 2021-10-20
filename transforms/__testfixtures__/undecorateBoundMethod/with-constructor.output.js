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

  constructor (props: Props) {
    super(props)

    this.renderItem = this.renderItem.bind(this);

    makeObservable(this, {
      isAuthor: computed
    })
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
