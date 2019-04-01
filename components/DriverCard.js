import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import FastestBus from '../components/FastestBus'
import BasicCard from './BasicCard'

class DriverCard extends Component {
  static propTypes = {
    driver: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      buses: PropTypes.object.isRequired,
      // dateOfBirth: PropTypes.object.isRequired,
      onPress: PropTypes.func
    })
  }

  render() {
    const {onPress} = this.props
    const {firstName, middleName, lastName, buses, dateOfBirth} = this.props.driver
    const date = dateOfBirth.toDateString()

    return <BasicCard onPress = {onPress}>
      <View style = {styles.textView}>
        <Text>
          {firstName} {middleName} {lastName}
        </Text>
      </View>

      <View style = {styles.textView}>
        <Text>
          {date}
        </Text>
      </View>

      <View style = {styles.textView}>
        <Text>
          {buses}
        </Text>
      </View>

      <FastestBus buses = {buses}/>
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

export default DriverCard