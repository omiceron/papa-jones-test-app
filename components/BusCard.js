import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import SegmentedCard from './SegmentedCard'

class BusCard extends Component {
  static propTypes = {
    bus: PropTypes.shape({
      model: PropTypes.string.isRequired,
      speed: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      onPress: PropTypes.func
    }).isRequired
  }

  render() {
    const {onPress, LeftComponent} = this.props
    const {model, speed, year} = this.props.bus

    return <SegmentedCard onPress = {onPress} LeftComponent = {LeftComponent}>

        <View style = {styles.textView}>
          <Text style = {styles.text}>
            {model}
          </Text>
        </View>

        <View style = {styles.textView}>
          <Text style = {styles.text}>
            {year}
          </Text>
        </View>

      <View style = {styles.textView}>
        <Text style = {styles.text}>
          {speed} km/h
        </Text>
      </View>

    </SegmentedCard>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default BusCard