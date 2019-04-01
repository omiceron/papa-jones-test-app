import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'
import FastestBus from '../components/FastestBus'

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

    return <TouchableOpacity onPress = {onPress}>
      <View style = {styles.container}>

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

      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'rgba(127,127,127, 0.1)'
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  }
})

export default DriverCard