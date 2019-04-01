import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {fastestBusOfDriverSelector} from '../selectors'

@connect((state, props) => ({fastestBus: fastestBusOfDriverSelector(state, props)}))
class FastestBus extends React.Component {
  static defaultProps = {
    fastestBus: {
      model: '',
      speed: null
    }
  }

  render() {
    const days = String(Math.ceil(this.props.distance / this.props.fastestBus.speed / 3))

    return (
      <View>
        <Text>
          {this.props.fastestBus.model}
        </Text>
        <Text>
          {days}
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default FastestBus