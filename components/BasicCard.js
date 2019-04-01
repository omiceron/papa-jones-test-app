import React, {Component} from 'react'
import {
  StyleSheet,
  View,
  TouchableOpacity
} from 'react-native'
import PropTypes from 'prop-types'

class BasicCard extends Component {
  static propTypes = {
    children: PropTypes.node,
    onPress: PropTypes.func
  }

  render() {
    const {onPress, children, ...rest} = this.props

    const InteractionComponent = onPress ? TouchableOpacity : View

    return <InteractionComponent onPress = {onPress}>
      <View {...rest} style = {styles.container}>
        {children}
      </View>
    </InteractionComponent>
  }
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  }
})

export default BasicCard