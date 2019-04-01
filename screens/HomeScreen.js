import React from 'react'
import {
  TextInput,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  KeyboardAvoidingView
} from 'react-native'
import {Location} from 'expo'
import colors from '../constants/Colors'
import {connect} from 'react-redux'
import {findDistance} from '../actions'

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
    // this.props.navigation.push('CalculatedList', {distance})

  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <View style = {{flex: 1}}/>
        <Text>{this.props.counter}</Text>

        <KeyboardAvoidingView
          behavior = 'position'
          enabled
          style = {{height: 500, justifyContent: 'center'}}
          // keyboardVerticalOffset = {300}
        >

          <View style = {styles.getStartedContainer}>
            <TextInput
              placeholder = 'Departure city'
              style = {[styles.getStartedText]}
              value = {this.state.input}
              onSubmitEditing = {() => this.arrivalRef.focus()}
              onChangeText = {this.setDeparture}
              returnKeyType = 'next'
              clearButtonMode = 'while-editing'
              textContentType = 'addressCity'

              // keyboardType = 'email-address'

            />
          </View>

          <View style = {styles.getStartedContainer}>
            <TextInput
              ref = {this.setArrivalRef}
              placeholder = 'Arrival city'
              style = {[styles.getStartedText]}
              value = {this.state.input}
              onChangeText = {this.setArrival}

              textContentType = 'addressCity'
              returnKeyType = 'done'
              clearButtonMode = 'while-editing'
            />

          </View>

          <TouchableOpacity onPress = {this.handleSubmit}>
            <View style = {[styles.getStartedContainer, {alignItems: 'center', backgroundColor: colors.tintColor}]}>
              <Text style = {[styles.getStartedText, {color: 'white'}]}>Find</Text>
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
    backgroundColor: '#fff',
    justifyContent: 'center'
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center'
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    height: 45,
    marginHorizontal: 50,
    marginBottom: 20,
    // padding: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(127,127,127, 0.1)',
    justifyContent: 'center'
  },
  homeScreenFilename: {
    marginVertical: 7
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)'
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4
  },
  getStartedText: {
    margin: 10,
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
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
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center'
  },
  navigationFilename: {
    marginTop: 5
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  helpLink: {
    paddingVertical: 15
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7'
  }
})

export default HomeScreen