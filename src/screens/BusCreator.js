import React from 'react'
import {connect} from 'react-redux'
import {addBus} from '../actions/index'
import BusEditorCore from '../components/buses/BusEditorCore'

class AddBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add bus'
  }

  render() {
    return <BusEditorCore bus = {this.props.bus}/>
  }
}

export default AddBusFormScreen