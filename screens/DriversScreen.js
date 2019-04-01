import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity
} from 'react-native'
import {connect} from 'react-redux'
import {driversSelector, driversSortedSelector} from '../selectors'
import {addDriver, deleteDriver} from '../actions'
import colors from '../constants/Colors'
import DriverCard from '../components/DriverCard'

@connect(state => ({drivers: driversSelector(state)}), {addDriver, deleteDriver})
class DriversScreen extends React.Component {
  static navigationOptions = {
    header: null
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

        <TouchableOpacity onPress = {this.handleSubmit}>
          <View style = {[styles.field, styles.button]}>
            <Text style = {[styles.getStartedText, {color: 'white'}]}>Add driver</Text>
          </View>
        </TouchableOpacity>

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

export default DriversScreen