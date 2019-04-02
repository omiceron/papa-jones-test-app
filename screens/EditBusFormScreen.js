import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import {connect} from 'react-redux'
import {saveBus, deleteBus} from '../actions'
import {busSelector} from '../selectors'
import BasicButton from '../components/BasicButton'
import BasicInput from '../components/BasicInput'
import startCase from 'lodash/startCase'

@connect((state, props) => ({
  bus: busSelector(state, props)
}), {saveBus, deleteBus})
class EditBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit bus'
  }

  // this is anti-pattern but in this very case
  // it doesn't matter - values are only for initial values.
  // Possible salvation from this issue:
  // 1. special record 'newValues' in current entity
  // 2. special record 'currentEditingBus' or smth in store
  state = {
    model: this.props.bus.model,
    year: this.props.bus.year,
    speed: this.props.bus.speed
  }

  // state = {
  //   model: null,
  //   year: null,
  //   speed: null
  // }

  handleSubmit = () => {
    if (Object.values(this.state).some(value => !value)) return
    this.props.saveBus(this.state, this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  handleDelete = () => {
    this.props.deleteBus(this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  changeValue = (key) => (value) => this.setState({[key]: value})

  refs = {}
  inputs = ['model', 'year', 'speed']

  setRef = (key) => (ref) => this.refs = {...this.refs, [key]: ref}

  renderInputs = () => this.inputs.map((input, i, a) => {
    const nextInput = a[i + 1]

    const onSubmitEditing = () =>
      nextInput ? this.refs[nextInput].focus() : this.handleSubmit()

    const returnKeyType = nextInput ? 'next' : 'done'

    return <BasicInput
      key = {input}
      onChangeText = {this.changeValue(input)}
      value = {this.state[input]}
      // value = {this.state[input] === null ? this.props.bus[input] : this.state[input]}
      placeholder = {startCase(input)}
      onSubmitEditing = {onSubmitEditing}
      setRef = {this.setRef(input)}
      returnKeyType = {returnKeyType}
      maxLength = {input === 'year' ? 4 : undefined}
    />
  })

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 600, justifyContent: 'center'}}
        >
          {this.renderInputs()}

          <BasicButton onPress = {this.handleSubmit} title = 'Save bus'/>
          <BasicButton onPress = {this.handleDelete} title = 'Delete bus' destructive/>

        </KeyboardAvoidingView>

      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})

export default EditBusFormScreen