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
import {addDriver} from '../actions/index'
import {busesSelector} from '../selectors'
import {Seq} from 'immutable'
import BasicInput from '../components/common/BasicInput'
import startCase from 'lodash/startCase'
import BasicButton from '../components/common/BasicButton'
import BasicField from '../components/common/BasicField'

// todo platform
@connect(state => ({buses: busesSelector(state)}), {addDriver})
class AddDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add driver'
  }

  state = {
    driver: {
      firstName: '',
      middleName: '',
      lastName: '',
      dateOfBirth: '',
      buses: new Seq([])
    },
    isDatePickerOn: false
  }

  handleSubmit = () => {
    if (Object.values(this.state.driver).some(value => !value)) return
    if (!this.state.driver.buses.count()) return
    this.props.addDriver(this.state.driver)
    this.props.navigation.goBack()
  }

  handleLinkBuses = () => {
    this.props.navigation.push('BusLink', {
      getBuses: () => this.state.driver.buses,
      toggleBus: this.toggleBus
    })
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
          <BasicButton onPress = {this.handleSubmit} title = 'Add driver'/>

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

export default AddDriverFormScreen