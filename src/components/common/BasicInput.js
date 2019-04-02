import React, {Component} from 'react'
import {View, StyleSheet, TextInput} from 'react-native'
import PropTypes from 'prop-types'

class BasicInput extends Component {
  static propTypes = {
    setRef: PropTypes.func,
    onChangeText: PropTypes.func.isRequired,
    value: PropTypes.string,
    returnKeyType: PropTypes.string,
    clearButtonMode: PropTypes.string,
    placeholder: PropTypes.string,
  }

  componentDidMount() {
    this.props.setRef && this.props.setRef(this)
  }

  focus() {
    this.ref.focus()
  }

  setRef = (ref) => this.ref = ref

  render() {
    const {
      onChangeText,
      value,
      placeholder,
      returnKeyType = 'next',
      clearButtonMode = 'while-editing',
      ...rest
    } = this.props

    return (
      <View style = {styles.container}>
        <TextInput
          ref = {this.setRef}
          placeholder = {placeholder}
          style = {styles.text}
          value = {value}
          onChangeText = {onChangeText}
          returnKeyType = {returnKeyType}
          clearButtonMode = {clearButtonMode}
          {...rest}
        />
      </View>
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

export default BasicInput