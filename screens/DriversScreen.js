import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native'
import {connect} from 'react-redux'
import {driversSelector, driversSortedSelector} from '../selectors'
import {addDriver, deleteDriver} from '../actions'
import DriverCard from '../components/DriverCard'
import BasicButton from '../components/BasicButton'

@connect(state => ({drivers: driversSelector(state)}), {addDriver, deleteDriver})
class DriversScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivers'
  }

  renderItem = ({item}) => <DriverCard
    driver = {item}
    onPress = {() => this.props.deleteDriver(item.id)}
  />

  handleSubmit = () => {
    this.props.navigation.push('AddDriver')
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <FlatList
          // contentContainerStyle = {}
          // ItemSeparatorComponent = {}
          data = {this.props.drivers}
          renderItem = {this.renderItem}
          keyExtractor = {({id}) => id}
          // ListFooterComponent = {}
        />

        <BasicButton onPress = {this.handleSubmit} title = 'Add driver'/>


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

export default DriversScreen