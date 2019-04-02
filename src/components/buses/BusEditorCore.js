import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import {connect} from 'react-redux'
import {saveBus, addBus, deleteBus} from '../../actions/index'
import {busSelector} from '../../selectors'
import BasicButton from '../../components/common/BasicButton'
import BasicInput from '../../components/common/BasicInput'
import startCase from 'lodash/startCase'
import { withNavigation } from 'react-navigation'

@connect(null, {saveBus, deleteBus, addBus})
@withNavigation
class BusEditorCore extends React.Component {

  state = {
    model: this.props.bus ? this.props.bus.model : '',
    year: this.props.bus ? this.props.bus.year : '',
    speed: this.props.bus ? this.props.bus.speed : ''
  }

  handleSubmit = () => {
    if (Object.values(this.state).some(value => !value)) return
    this.props.id
      ? this.props.saveBus(this.state, this.props.id)
      : this.props.addBus(this.state)
    this.props.navigation.goBack()
  }

  handleDelete = () => {
    this.props.deleteBus(this.props.id)
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

  maybeRenderDeleteButton = () => this.props.id
    ? <BasicButton onPress = {this.handleDelete} title = 'Delete bus' destructive/>
    : null

  render() {
    const {id} = this.props
    return (
      <SafeAreaView style = {styles.container}>
        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 400, justifyContent: 'center'}}
        >
          {this.renderInputs()}

          <BasicButton
            onPress = {this.handleSubmit}
            title = {`${id ? 'Save' : 'Add'} bus`}
          />

          {this.maybeRenderDeleteButton()}

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

export default BusEditorCore