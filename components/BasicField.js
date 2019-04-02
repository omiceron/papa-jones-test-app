import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../constants/Colors'

class BasicField extends Component {
  static propTypes = {
    title: PropTypes.string,
    placeholder: PropTypes.string,
  }

  render() {
    const {
      title,
      placeholder
    } = this.props

    return (
      <TouchableOpacity onPress = {this.props.onPress} style = {styles.container}>
        <Text style = {[styles.text, placeholder && !title && {color: Colors.placeholderColor}]}>
          {title || placeholder}
        </Text>
      </TouchableOpacity>
    )

  }
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    marginHorizontal: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(127,127,127, 0.1)',
    justifyContent: 'center'
  },
  text: {
    margin: 10,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default BasicField