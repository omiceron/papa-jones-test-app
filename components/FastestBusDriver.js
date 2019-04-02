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
    return <View style = {styles.container}>

      <View style = {styles.textView}>
        <Text style = {styles.text}>
          {this.getDays()}
        </Text>
      </View>

      <View style = {styles.textView}>
        <Text style = {styles.text}>
          {this.props.fastestBus.model}
        </Text>
      </View>

    </View>
  }

  render() {
    if (!this.props.fastestBus) return null
    return (
      <DriverCard driver = {this.props.driver} LeftComponent = {this.renderFastestBus}/>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  textView: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default FastestBusDriver