import React from 'react'
import DriverEditorCore from '../components/drivers/DriverEditorCore'

class DriverEditor extends React.Component {

  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state

    return {
      title: params && params.driver ? `${params.driver.firstName} ${params.driver.lastName}` : 'Add driver'
    }
  }

  render() {
    const {params} = this.props.navigation.state
    return <DriverEditorCore id = {params && params.driver && params.driver.id}/>
  }

}

export default DriverEditor