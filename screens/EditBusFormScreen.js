import React from 'react'
import {
  TextInput,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import colors from '../constants/Colors'
import {connect} from 'react-redux'
import {saveBus, deleteBus} from '../actions'
import {busSelector} from '../selectors'

@connect((state, props) => ({
  bus: busSelector(state, props)
}), {saveBus, deleteBus})
class EditBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Edit bus'
  }

  state = {
    model: this.props.bus.model,
    year: this.props.bus.year,
    speed: this.props.bus.speed
  }


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

  // changeValue = (key) => (value) => {
  //   this.props.updateBus(key, value, this.props.navigation.state.params.id)
  // }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 500, justifyContent: 'center'}}
        >

          <View style = {styles.field}>
            <TextInput
              placeholder = 'model'
              style = {[styles.getStartedText]}
              value = {this.state.model}
              // value = {this.props.bus.model}
              onChangeText = {this.changeValue('model')}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
            />
          </View>

          <View style = {styles.field}>
            <TextInput
              placeholder = 'speed'
              style = {[styles.getStartedText]}
              value = {this.state.speed}
              // value = {this.props.bus.speed}
              onChangeText = {this.changeValue('speed')}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
            />
          </View>

          <View style = {styles.field}>
            <TextInput
              placeholder = 'year'
              style = {[styles.getStartedText]}
              value = {this.state.year}
              // value = {this.props.bus.year}
              onChangeText = {this.changeValue('year')}
              returnKeyType = 'done'
              clearButtonMode = 'while-editing'
            />

          </View>


          <TouchableOpacity onPress = {this.handleSubmit}>
            <View style = {[styles.field, styles.button]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Save bus</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress = {this.handleDelete}>
            <View style = {[styles.field, styles.button, styles.destructiveButton]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Delete bus</Text>
            </View>
          </TouchableOpacity>

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
  itemContainer: {
    height: 60,
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    margin: 20,
    backgroundColor: 'rgba(127,127,127, 0.1)'
  },
  itemText: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  field: {
    height: 45,
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
  destructiveButton: {
    backgroundColor: colors.destructiveColor
  },
  getStartedText: {
    margin: 10,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default EditBusFormScreen