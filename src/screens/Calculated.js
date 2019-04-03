import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  ActivityIndicator
} from 'react-native'
import {connect} from 'react-redux'
import {driversSortedSelector, loadingDistanceSelector, distanceSelector, errorSelector} from '../selectors'
import FastestBusDriver from '../components/drivers/FastestBusDriver'

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
    if (this.props.loading) return <ActivityIndicator/>

    if (this.props.error) return <Text>
      {this.props.error}
    </Text>

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