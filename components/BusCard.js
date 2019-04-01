import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import BasicCard from './BasicCard'

class BusCard extends Component {
  static propTypes = {
    bus: PropTypes.shape({
      model: PropTypes.string.isRequired,
      speed: PropTypes.string.isRequired,
      year: PropTypes.string.isRequired,
      onPress: PropTypes.func
    })
  }

  render() {
    const {onPress} = this.props
    const {model, speed, year} = this.props.bus

    return <BasicCard onPress = {onPress}>
        <View style = {styles.textView}>
          <Text>
            {model}
          </Text>
        </View>

        <View style = {styles.textView}>
          <Text>
            {speed}
          </Text>
        </View>

        <View style = {styles.textView}>
          <Text>
            {year}
          </Text>
        </View>
    </BasicCard>
  }
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
})

export default BusCard