import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native'
import {connect} from 'react-redux'
import {driversSelector, driversSortedSelector} from '../selectors'
import {addDriver, deleteDriver} from '../actions/index'
import BasicButton from '../components/common/BasicButton'
import AllBusesDriver from '../components/drivers/AllBusesDriver'
import Separator from '../components/common/Separator'

@connect(state => ({drivers: driversSelector(state)}), {addDriver, deleteDriver})
class DriversScreen extends React.Component {
  static navigationOptions = {
    title: 'Drivers'
  }

  renderItem = ({item}) => <AllBusesDriver
    showDate
    driver = {item}
    onPress = {() => this.props.navigation.navigate('DriverEditor', {id: item.id})}
  />

  handleSubmit = () => {
    this.props.navigation.push('DriverCreator')
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <FlatList
          // contentContainerStyle = {}
          ItemSeparatorComponent = {Separator}
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