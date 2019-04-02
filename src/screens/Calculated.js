import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {driversSortedSelector, distanceSelector, errorSelector} from '../selectors'
import FastestBusDriver from '../components/drivers/FastestBusDriver'

// todo speed
@connect(state => ({
  drivers: driversSortedSelector(state),
  distance: distanceSelector(state),
  error: errorSelector(state)
}))
class CalculatedListScreen extends React.Component {
  static navigationOptions = {
    title: 'Calculated'
  }

  renderItem = ({item}) => <FastestBusDriver driver = {item}/>

  render() {
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
  }
})

export default CalculatedListScreen