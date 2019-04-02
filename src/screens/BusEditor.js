import React from 'react'
import {connect} from 'react-redux'
import {saveBus, deleteBus} from '../actions/index'
import {busSelector} from '../selectors'
import BusEditorCore from '../components/buses/BusEditorCore'

@connect((state, props) => ({
  bus: busSelector(state, props)
}))
class EditBusFormScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const {model, year} = navigation.state.params.bus
    return {
      title: `Edit ${model} ${year}`
    }
  }

  render() {
    const {id} = this.props.navigation.state.params.bus
    return <BusEditorCore id = {id} bus = {this.props.bus}/>
  }

}

export default EditBusFormScreen