import React, {Component} from 'react'
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native'
import PropTypes from 'prop-types'
import Colors from '../../constants/colors'

class BasicButton extends Component {
  static propTypes = {
    onPress: PropTypes.func,
    title: PropTypes.string,
    destructive: PropTypes.any
  }

  render() {
    const {onPress, title, destructive, inactive} = this.props
    const InteractionComponent = inactive ? View : TouchableOpacity
    return <InteractionComponent onPress = {onPress}>
      <View
        style = {[styles.container, destructive && styles.destructive, inactive && styles.inactive]}>
        <Text style = {styles.text}>
          {title}
        </Text>
      </View>
    </InteractionComponent>
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
  },
  destructive: {
    backgroundColor: Colors.destructiveColor
  },
  inactive: {
    backgroundColor: Colors.inactiveColor

  }
})

export default BasicButton