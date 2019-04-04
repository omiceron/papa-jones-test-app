import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {driversSortedSelector, loadingDistanceSelector, distanceSelector, errorSelector} from '../selectors'
import FastestBusDriver from '../components/drivers/FastestBusDriver'
import Loader from '../components/common/Loader'
import ErrorView from '../components/common/ErrorView'

// todo speed
@connect(state => ({
  drivers: driversSortedSelector(state),
  distance: distanceSelector(state),
  error: errorSelector(state),
  loading: loadingDistanceSelector(state)
}))
class CalculatedListScreen extends React.Component {
  static navigationOptions = {
    title: 'Calculated'
  }

  renderItem = ({item}) => <FastestBusDriver driver = {item}/>

  render() {
    if (this.props.loading) return <Loader/>

    if (this.props.error) return <ErrorView error = {this.props.error}/>

    return (
      <SafeAreaView style = {styles.container}>
        <FlatList
          data = {this.props.drivers}
          renderItem = {this.renderItem}
          keyExtractor = {({id}) => id}
        />
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

export default CalculatedListScreen