import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  View
} from 'react-native'
import {connect} from 'react-redux'
import {addBus} from '../actions'
import BasicButton from '../components/BasicButton'
import BasicInput from '../components/BasicInput'
import startCase from 'lodash/startCase'

@connect(null, {addBus})
class AddBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add bus'
  }

  componentWillUnmount() {
    // this.props.maybeDeleteBus
  }

  state = {
    model: '',
    year: '',
    speed: ''
  }

  handleSubmit = () => {
    if (Object.values(this.state).some(value => !value)) return
    this.props.addBus(this.state)
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
          style = {{height: 400, justifyContent: 'center'}}
        >
          {this.renderInputs()}

          <BasicButton onPress = {this.handleSubmit} title = 'Add bus'/>

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
  },
})

export default AddBusFormScreen