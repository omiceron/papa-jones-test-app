import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

class BasicButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    destructive: PropTypes.any
  }

  render() {
    const {onPress, title, destructive} = this.props
    return <TouchableOpacity onPress = {onPress}>
      <View style = {[styles.container, destructive && {backgroundColor: Colors.destructiveColor}]}>
        <Text style = {styles.text}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginHorizontal: 50,
    marginBottom: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.tintColor
  },
  text: {
    margin: 10,
    fontSize: 17,
    color: '#fff'
  }
})

export default BasicButton