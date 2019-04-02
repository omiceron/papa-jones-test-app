import React from 'react'
import {
  Platform,
  StyleSheet,
  View,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import {connect} from 'react-redux'
import {findDistance} from '../actions'
import BasicInput from '../components/BasicInput'
import BasicButton from '../components/BasicButton'

@connect(null, {findDistance})
class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  state = {
    departure: '',
    arrival: ''
  }

  setDeparture = (departure) => {
    this.setState({departure})
  }

  setArrival = (arrival) => {
    this.setState({arrival})
  }

  setArrivalRef = (ref) => {
    this.arrivalRef = ref
  }

  handleSubmit = () => {
    this.props.findDistance(this.state.departure, this.state.arrival)
    this.props.navigation.push('CalculatedList')
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <View style = {{flex: 1}}/>

        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 500, justifyContent: 'center'}}
        >

          <BasicInput
            placeholder = 'Departure city'
            value = {this.state.departure}
            onSubmitEditing = {() => this.arrivalRef.focus()}
            onChangeText = {this.setDeparture}
            textContentType = 'addressCity'
          />

          <BasicInput
            onChangeText = {this.setArrival}
            setRef = {this.setArrivalRef}
            placeholder = 'Arrival city'
            value = {this.state.arrival}
            onSubmitEditing = {this.handleSubmit}
            textContentType = 'addressCity'
            returnKeyType = 'done'
          />

          <BasicButton title = 'Find' onPress = {this.handleSubmit}/>

        </KeyboardAvoidingView>

        <View style = {{flex: 1}}/>

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
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: {height: -3},
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  }
})

export default HomeScreen