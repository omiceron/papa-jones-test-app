import React from 'react'
import BusEditorCore from '../components/buses/BusEditorCore'

class EditBusFormScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state

    return {
      title: params && params.bus ? `Edit ${params.bus.model} ${params.bus.year}` : 'Add bus'
    }
  }

  render() {
    const {params} = this.props.navigation.state
    return <BusEditorCore id = {params && params.bus && params.bus.id}/>
  }

}

export default EditBusFormScreen