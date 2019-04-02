import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import SegmentedCard from '../common/SegmentedCard'

class DriverCard extends Component {
  static propTypes = {
    driver: PropTypes.shape({
      firstName: PropTypes.string.isRequired,
      middleName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired, // buses: PropTypes.object.isRequired
      dateOfBirth: PropTypes.string.isRequired,
    }).isRequired,
    onPress: PropTypes.func,
    showDate: PropTypes.any
  }

  maybeRenderDate = () => {
    return this.props.showDate ? <View style = {styles.textView}>
      <Text style = {styles.text}>
        {this.props.driver.dateOfBirth}
      </Text>
    </View> : null
  }

  render() {
    const {onPress, LeftComponent} = this.props
    const {firstName, middleName, lastName, buses, dateOfBirth} = this.props.driver

    return <SegmentedCard onPress = {onPress} LeftComponent = {LeftComponent}>
      <View style = {styles.textView}>
        <Text style = {styles.text}>
          {firstName} {middleName} {lastName}
        </Text>
      </View>

      {this.maybeRenderDate()}

    </SegmentedCard>
  }
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default DriverCard