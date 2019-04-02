import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {distanceSelector, fastestBusOfDriverSelector} from '../selectors'
import DriverCard from './DriverCard'

@connect((state, props) => ({
  fastestBus: fastestBusOfDriverSelector(state, props),
  distance: distanceSelector(state, props)
}))
class FastestBusDriver extends React.Component {

  getDays = () => {
    return String(Math.ceil(this.props.distance / this.props.fastestBus.speed / 3))
  }

  renderFastestBus = () => {
    return <View style = {{flex: 1}}>
      <Text>
        {this.props.fastestBus.model}
      </Text>
      <Text>
        {this.getDays()}
      </Text>
    </View>
  }

  render() {
    return (
      <DriverCard driver = {this.props.driver} LeftComponent = {this.renderFastestBus}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

export default FastestBusDriver