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
import {addBus} from '../actions'

@connect(null, {addBus})
class AddBusFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add bus'
  }

  state = {
    model: '',
    year: null,
    speed: null
  }


  handleSubmit = () => {
    if (Object.values(this.state).some(value => !value)) return
    this.props.addBus(this.state)
    this.props.navigation.goBack()
  }

  changeValue = (key) => (value) => this.setState({[key]: value})

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
              onChangeText = {this.changeValue('year')}
              returnKeyType = 'done'
              clearButtonMode = 'while-editing'
            />

          </View>


          <TouchableOpacity onPress = {this.handleSubmit}>
            <View style = {[styles.field, styles.button]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Add bus</Text>
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
  getStartedText: {
    margin: 10,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default AddBusFormScreen