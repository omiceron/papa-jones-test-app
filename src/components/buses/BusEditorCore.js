import React from 'react'
import {
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert
} from 'react-native'
import {connect} from 'react-redux'
import {saveBus, addBus, deleteBus, updateBus, updateBusForm, clearBusForm} from '../../actions/index'
import {tempBusMapSelector} from '../../selectors'
import BasicButton from '../../components/common/BasicButton'
import BasicInput from '../../components/common/BasicInput'
import startCase from 'lodash/startCase'
import {withNavigation} from 'react-navigation'
import PropTypes from 'prop-types'

@connect((state) => ({tempBus: tempBusMapSelector(state)}), {
  updateBusForm,
  saveBus,
  deleteBus,
  addBus,
  updateBus,
  clearBusForm
})
@withNavigation
class BusEditorCore extends React.Component {
  static propTypes = {
    id: PropTypes.string
  }

  componentDidMount() {
    this.props.updateBusForm(this.props.id)
  }

  componentWillUnmount() {
    this.props.clearBusForm()
  }

  handleSubmit = () => {
    if (this.props.tempBus.toSeq().some((value, key) => !value && key !== 'id')) {
      Alert.alert('All fields are required!')
      return
    }
    this.props.id
      ? this.props.saveBus(this.props.id)
      : this.props.addBus()
    this.props.navigation.goBack()
  }

  handleDelete = () => {
    this.props.deleteBus(this.props.id)
    this.props.navigation.goBack()
  }

  changeValue = (key) => (value) => this.props.updateBus(key, value)

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
      value = {this.props.tempBus[input]}
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