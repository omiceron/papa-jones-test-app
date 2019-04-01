import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  DatePickerIOS,
  Picker
} from 'react-native'
import {connect} from 'react-redux'
import {addDriver} from '../actions'
import colors from '../constants/Colors'
import {busesSelector} from '../selectors'
import {Seq, List} from 'immutable'

// todo platform
@connect(state => ({buses: busesSelector(state)}), {addDriver})
class AddDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add driver'
  }

  state = {
    firstName: '',
    middleName: '',
    lastName: '',
    // dateOfBirth: '',
    dateOfBirth: new Date(),
    buses: new Seq([])
  }

  handleSubmit = () => {
    if (Object.values(this.state).some(value => !value)) return
    this.props.addDriver(this.state)
    this.props.navigation.goBack()
  }

  handleLinkBuses = () => {
    this.props.navigation.push('LinkBuses', {
      getBuses: () => this.state.buses,
      toggleBus: this.toggleBus
    })
  }

  toggleBus = (id, val) => {
    const buses = val
      ? this.state.buses.concat(id)
      : this.state.buses.filter(bus => bus !== id)
    this.setState({buses})
  }

  changeValue = (key) => (value) => this.setState({[key]: value})

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <View style = {{flex: 1}}/>
        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 500, justifyContent: 'center'}}
        >

          <View style = {styles.field}>
            <TextInput
              placeholder = {'First name'}
              style = {[styles.getStartedText]}
              value = {this.state.firstName}
              onChangeText = {this.changeValue('firstName')}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
            />
          </View>

          <View style = {styles.field}>
            <TextInput
              placeholder = {'Middle name'}
              style = {[styles.getStartedText]}
              value = {this.state.middleName}
              onChangeText = {this.changeValue('middleName')}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
            />
          </View>

          <View style = {styles.field}>
            <TextInput
              placeholder = {'Last name'}
              style = {[styles.getStartedText]}
              value = {this.state.lastName}
              onChangeText = {this.changeValue('lastName')}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
            />
          </View>

          {/*<View style = {styles.field}>*/}
          {/*<TextInput*/}
          {/*placeholder = {'Date of birth'}*/}
          {/*style = {[styles.getStartedText]}*/}
          {/*value = {this.state.dateOfBirth}*/}
          {/*onChangeText = {this.changeValue('dateOfBirth')}*/}
          {/*returnKeyType = 'done'*/}
          {/*clearButtonMode = 'while-editing'*/}
          {/*/>*/}
          {/*</View>*/}


          <TouchableOpacity onPress = {this.handleLinkBuses}>
            <View style = {[styles.field, styles.button]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Link buses</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress = {this.handleSubmit}>
            <View style = {[styles.field, styles.button]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Add driver</Text>
            </View>
          </TouchableOpacity>

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
  },
  field: {
    height: 45,
    marginHorizontal: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(127,127,127, 0.1)',
    justifyContent: 'center'
  },
  dateField: {
    marginHorizontal: 50,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(127,127,127, 0.1)',
    justifyContent: 'center'
  },
  button: {
    alignItems: 'center',
    backgroundColor: colors.tintColor
  },
  getStartedText: {
    margin: 10,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default AddDriverFormScreen