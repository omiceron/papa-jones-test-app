import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View
} from 'react-native'
import {connect} from 'react-redux'
import {driversSortedSelector} from '../selectors'
import FastestBus from '../components/FastestBus'

// todo speed
@connect(state => ({drivers: driversSortedSelector(state)}))
class CalculatedListScreen extends React.Component {
  static navigationOptions = {
    title: 'Calculated'
  }

  renderItem = ({item}) => {
    return <View style = {styles.itemContainer}>

      <View style = {styles.itemText}>
        <Text>
          {item.firstName} {item.middleName} {item.lastName}
        </Text>
      </View>

      <FastestBus distance = {this.props.navigation.state.params.distance} buses = {item.buses}/>

    </View>
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <View>
          <Text>
            {String(Math.round(this.props.navigation.state.params.distance))}
          </Text>
        </View>
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