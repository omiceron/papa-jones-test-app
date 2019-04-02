import React from 'react'
import BusEditorCore from '../components/buses/BusEditorCore'

class EditBusFormScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {model, year} = navigation.state.params.bus
    return {
      title: `Edit ${model} ${year}`
    }
  }

  render() {
    const {id} = this.props.navigation.state.params.bus
    return <BusEditorCore id = {id}/>
  }

}

export default EditBusFormScreen