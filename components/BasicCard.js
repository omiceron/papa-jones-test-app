import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

class BasicCard extends Component {
  static propTypes = {
    children: PropTypes.node
  }

  render() {
    const {onPress, children, ...rest} = this.props
    return <TouchableOpacity onPress = {onPress}>
      <View {...rest} style = {styles.container}>
        {children}
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
  }
})

export default BasicCard