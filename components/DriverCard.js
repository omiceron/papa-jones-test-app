import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import SegmentedCard from './SegmentedCard'

class DriverCard extends Component {
  static propTypes = {
    driver: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
      buses: PropTypes.object.isRequired
      // dateOfBirth: PropTypes.object.isRequired,
    }).isRequired,
    onPress: PropTypes.func
  }

  render() {
    const {onPress, LeftComponent} = this.props
    const {firstName, middleName, lastName, buses, dateOfBirth} = this.props.driver
    const date = dateOfBirth//.toDateString()

    return <SegmentedCard onPress = {onPress} LeftComponent = {LeftComponent}>
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

    </SegmentedCard>
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