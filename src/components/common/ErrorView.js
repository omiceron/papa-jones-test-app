import React, {Component} from 'react'
import {View, StyleSheet, Text, Platform} from 'react-native'
import PropTypes from 'prop-types'
import {Icon} from 'expo'
import colors from '../../constants/colors'

class ErrorView extends Component {
  static propTypes = {
    error: PropTypes.string.isRequired
  }

  render() {
    return <View style = {styles.container}>
      <Icon.Ionicons
        name = {`${Platform.OS === 'ios' ? 'ios' : 'md'}-alert`}
        size = {26}
        style = {{marginBottom: -3}}
        color = {colors.inactiveColor}
      />
      <Text style = {styles.errorText}>
        {this.props.error}
      </Text>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorText: {
    margin: 10,
    fontSize: 17,
    color: colors.inactiveColor
  }
})

export default ErrorView