import React from 'react'
import {
  StyleSheet,
  View,
  Switch
} from 'react-native'
import PropTypes from 'prop-types'
import BusCard from '../buses/BusCard'
import {connect} from 'react-redux'
import {busToggleSelector} from '../../selectors'
import {toggleBus} from '../../actions'

@connect((state, props) => ({
  isSelected: busToggleSelector(state, props)
}), {toggleBus})
class BusLinkRow extends React.Component {
  static propTypes = {
    bus: PropTypes.object.isRequired
  }

  toggleBus = (value) => {
    this.props.toggleBus(this.props.bus.id, value)
  }

  renderSwitch = () => {
    const {isSelected} = this.props

    return <View style = {styles.switchContainer}>
      <Switch
        value = {isSelected}
        onValueChange = {this.toggleBus}
      />
    </View>
  }

  render() {
    return <BusCard bus = {this.props.bus} LeftComponent = {this.renderSwitch}/>
  }
}

const styles = StyleSheet.create({
  switchContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  }
})

export default BusLinkRow