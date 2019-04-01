import React from 'react'
import {
  StyleSheet,
  View,
  Switch
} from 'react-native'
import PropTypes from 'prop-types'
import BusCard from './BusCard'

class BusRow extends React.Component {

  static propTypes = {
    item: PropTypes.object.isRequired,
    getBuses: PropTypes.func.isRequired,
    toggleBus: PropTypes.func.isRequired
  }

  renderSwitch = () => {
    const {item, getBuses, toggleBus} = this.props
    const buses = getBuses()

    return <View style = {styles.switchContainer}>
      <Switch
        value = {buses.includes(item.id)}
        onValueChange = {(val) => {
          toggleBus(item.id, val)
          this.forceUpdate()
        }}
      />
    </View>
  }

  render() {
    const {item} = this.props
    return <BusCard bus = {item} LeftComponent = {this.renderSwitch}/>
  }
}

const styles = StyleSheet.create({
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

export default BusRow