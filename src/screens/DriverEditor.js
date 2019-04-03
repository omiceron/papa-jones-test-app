import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  View,
  KeyboardAvoidingView,
  DatePickerIOS,
  LayoutAnimation,
  Keyboard,
  Alert,
  ScrollView
} from 'react-native'
import {connect} from 'react-redux'
import {tempDriverMapSelector} from '../selectors'
import {saveDriver, deleteDriver, updateDriver, updateDriverForm, clearDriverForm} from '../actions/index'
import BasicInput from '../components/common/BasicInput'
import startCase from 'lodash/startCase'
import BasicButton from '../components/common/BasicButton'
import BasicField from '../components/common/BasicField'

// todo platform
@connect((state, props) => ({
  driver: tempDriverMapSelector(state, props)
}), {saveDriver, deleteDriver, updateDriver, updateDriverForm, clearDriverForm})
class EditDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit driver'
  }

  state = {
    isDatePickerOn: false
  }

  componentDidMount() {
    this.props.updateDriverForm(this.props.navigation.state.params.id)
  }

  componentWillUnmount() {
    this.props.clearDriverForm()
  }

  handleSubmit = () => {
    if (this.props.driver.toSeq().some((value, key) => !value && key !== 'id')) {
      Alert.alert('All fields are required!')
      return
    }

    if (!this.props.driver.buses.count()) {
      Alert.alert('At least one bus must be chosen!')
      return
    }
    this.props.saveDriver(this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  handleLinkBuses = () => {
    this.props.navigation.push('BusLink')
  }

  changeValue = (key) => (value) => this.props.updateDriver(key, value)

  handleDelete = () => {
    this.props.deleteDriver(this.props.navigation.state.params.id)
    this.props.navigation.goBack()
  }

  refs = {}
  inputs = ['firstName', 'middleName', 'lastName']

  setRef = (key) => (ref) => this.refs = {...this.refs, [key]: ref}

  setDate = (date) => {
    const dateOfBirth = date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
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

    // todo!!
    return <DatePickerIOS
      date = {new Date(this.props.driver.dateOfBirth)}
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
      value = {this.props.driver[input]}
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
            title = {this.props.driver.dateOfBirth}
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