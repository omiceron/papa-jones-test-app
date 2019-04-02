import React from 'react'
import {Platform, StatusBar, StyleSheet, View} from 'react-native'
import {AppLoading, Asset, Font, Icon} from 'expo'
import AppNavigator from './src/navigation/AppNavigator'
import {Provider} from 'react-redux'
import {store, persistor} from './src/store'
import {PersistGate} from 'redux-persist/lib/integration/react'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync = {this._loadResourcesAsync}
          onError = {this._handleLoadingError}
          onFinish = {this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store = {store}>
          <PersistGate persistor = {persistor}>
            <View style = {styles.container}>
              {Platform.OS === 'ios' && <StatusBar barStyle = "default"/>}
              <AppNavigator/>
            </View>
          </PersistGate>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      // Asset.loadAsync([]),
      Font.loadAsync({
        ...Icon.Ionicons.font
      })
    ])
  }

  _handleLoadingError = error => {
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({isLoadingComplete: true})
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  }
})
