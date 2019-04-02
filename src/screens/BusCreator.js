import React from 'react'
import BusEditorCore from '../components/buses/BusEditorCore'

class AddBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add bus'
  }

  render() {
    return <BusEditorCore />
  }
}

export default AddBusFormScreen