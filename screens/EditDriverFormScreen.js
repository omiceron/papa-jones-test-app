import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  DatePickerIOS,
  LayoutAnimation,
  Keyboard,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {driverSelector} from '../selectors'
import {saveDriver, deleteDriver} from '../actions'
import BasicInput from '../components/BasicInput'
import startCase from 'lodash/startCase'
import BasicButton from '../components/BasicButton'
import BasicField from '../components/BasicField'

// todo platform
@connect((state, props) => ({driver: driverSelector(state, props)}), {saveDriver, deleteDriver})
class EditDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit driver'
  }

  // this is anti-pattern but in this very case
  // it doesn't matter - values are only for initial values.
  // Possible salvation from this issue:
  // 1. special record 'newValues' in current entity
  // 2. special record 'currentEditingDriver' or smth in store

  state = {
    driver: {
      firstName: this.props.driver.firstName,
      middleName: this.props.driver.middleName,
      lastName: this.props.driver.lastName,
      dateOfBirth: this.props.driver.dateOfBirth,
      buses: this.props.driver.buses
    },
    isDatePickerOn: false
  }

  handleSubmit = () => {
    console.log(this.state.driver)
    if (Object.values(this.state.driver).some(value => !value)) return
    if (!this.state.driver.buses.count()) return
    this.props.saveDriver(this.state.driver, this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  handleLinkBuses = () => {
    this.props.navigation.push('LinkBuses', {
      getBuses: () => this.state.driver.buses,
      toggleBus: this.toggleBus
    })
  }

  handleDelete = () => {
    this.props.deleteDriver(this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  toggleBus = (id, val) => {
    const buses = val
      ? this.state.driver.buses.concat(id)
      : this.state.driver.buses.filter(bus => bus !== id)
    this.setState({
      driver: {
        ...this.state.driver,
        buses
      }
    })
  }

  refs = {}
  inputs = ['firstName', 'middleName', 'lastName']

  setRef = (key) => (ref) => this.refs = {...this.refs, [key]: ref}
  changeValue = (key) => (value) => this.setState({
    driver: {
      ...this.state.driver,
      [key]: value
    }
  })

  setDate = (date) => {
    const dateOfBirth = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    })

    this.setState({
      driver: {
        ...this.state.driver,
        dateOfBirth
      }
    })
  }

  togglePicker = (bool) => {
    if (typeof bool !== 'boolean' && !this.state.isDatePickerOn) Keyboard.dismiss()

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      isDatePickerOn: typeof bool === 'boolean' ? bool : !this.state.isDatePickerOn
    })
  }

  maybeRenderDatePicker = () => {
    if (!this.state.isDatePickerOn) return null

    return <DatePickerIOS
      date = {new Date(this.state.driver.dateOfBirth)}
      mode = 'date'
      onDateChange = {this.setDate}
      maximumDate = {new Date()}
    />
  }

  renderInputs = () => this.inputs.map((input, i, a) => {
    const nextInput = a[i + 1]

    const onSubmitEditing = () =>
      nextInput ? this.refs[nextInput].focus() : this.togglePicker(true)

    return <BasicInput
      key = {input}
      onChangeText = {this.changeValue(input)}
      onFocus = {() => this.togglePicker(false)}
      value = {this.state.driver[input]}
      placeholder = {startCase(input)}
      onSubmitEditing = {onSubmitEditing}
      setRef = {this.setRef(input)}
    />
  })

  render() {
    return (
      <SafeAreaView style = {styles.container}>

        <View style = {{flex: 1}}/>

        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 600, justifyContent: 'center'}}
        >
          {this.renderInputs()}

          <BasicField
            onPress = {this.togglePicker}
            title = {this.state.driver.dateOfBirth}
            placeholder = {'Date Of Birth'}
          />

          {this.maybeRenderDatePicker()}

          <BasicButton onPress = {this.handleLinkBuses} title = 'Link buses'/>
          <BasicButton onPress = {this.handleSubmit} title = 'Save driver'/>
          <BasicButton onPress = {this.handleDelete} title = 'Delete driver' destructive/>

        </KeyboardAvoidingView>

        <View style = {{flex: 1}}/>

      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }

})

export default EditDriverFormScreen