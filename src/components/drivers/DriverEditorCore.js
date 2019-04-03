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
  Platform,
  DatePickerAndroid,
  ScrollView
} from 'react-native'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview'
import {connect} from 'react-redux'
import {tempDriverMapSelector} from '../../selectors'
import {saveDriver, deleteDriver, updateDriver, updateDriverForm, clearDriverForm, addDriver} from '../../actions/index'
import BasicInput from '../../components/common/BasicInput'
import startCase from 'lodash/startCase'
import BasicButton from '../../components/common/BasicButton'
import BasicField from '../../components/common/BasicField'
import {withNavigation} from 'react-navigation'

// todo platform
@connect((state, props) => ({
  driver: tempDriverMapSelector(state, props)
}), {
  saveDriver,
  deleteDriver,
  updateDriver,
  updateDriverForm,
  clearDriverForm,
  addDriver
})
@withNavigation
class DriverEditorCore extends React.Component {
  state = {
    isDatePickerOn: false
  }

  componentDidMount() {
    this.props.updateDriverForm(this.props.id)
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

    this.props.id
      ? this.props.saveDriver(this.props.id)
      : this.props.addDriver()
    this.props.navigation.goBack()
  }

  handleLinkBuses = () => {
    this.props.navigation.push('BusLink')
  }

  changeValue = (key) => (value) => this.props.updateDriver(key, value)

  handleDelete = () => {
    this.props.deleteDriver(this.props.id)
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

    this.props.updateDriver('dateOfBirth', dateOfBirth)
  }

  togglePicker = async (bool) => {
    if (bool && Platform.OS !== 'ios') {
      try {
        const {action, year, month, day} = await DatePickerAndroid.open({
          date: new Date(this.props.driver.dateOfBirth),
          maxDate: new Date(),
          mode: 'spinner'
        })

        if (action !== DatePickerAndroid.dismissedAction) {
          this.setDate(new Date(year, month, day))
        }
      } catch ({code, message}) {
        console.warn('Cannot open date picker', message)
      }

      return

    }

    if (typeof bool !== 'boolean' && !this.state.isDatePickerOn) Keyboard.dismiss()

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    this.setState({
      isDatePickerOn: typeof bool === 'boolean' ? bool : !this.state.isDatePickerOn
    })
  }

  maybeRenderDatePicker = () => {
    if (!this.state.isDatePickerOn || Platform.OS !== 'ios') return null

    return <DatePickerIOS
      date = {this.props.driver.dateOfBirth ? new Date(this.props.driver.dateOfBirth) : new Date()}
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

  maybeRenderDeleteButton = () => this.props.id
    ? <BasicButton onPress = {this.handleDelete} title = 'Delete driver' destructive/>
    : null

  render() {
    return (
      <SafeAreaView style = {styles.container}>

        <KeyboardAwareScrollView
          // style = {{flex: 1}}
          contentContainerStyle = {{flex: 1, justifyContent: 'center'}}
        >

          {this.renderInputs()}

          <BasicField
            onPress = {this.togglePicker}
            title = {this.props.driver.dateOfBirth}
            placeholder = {'Date Of Birth'}
          />

          {this.maybeRenderDatePicker()}

          <BasicButton onPress = {this.handleLinkBuses} title = 'Link buses'/>
          <BasicButton onPress = {this.handleSubmit} title = {`${this.props.id ? 'Save' : 'Add'} driver`}/>

          {this.maybeRenderDeleteButton()}

        </KeyboardAwareScrollView>

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

export default DriverEditorCore