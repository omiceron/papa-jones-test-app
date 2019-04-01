import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'

class Separator extends Component {
  static propTypes = {}

  render() {
    return <View style = {styles.container}/>
  }
}

const styles = StyleSheet.create({
  container: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(96,100,109, 1)',
    margin: 10
  }
})

export default Separator