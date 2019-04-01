import React from 'react'
import {
  Platform,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView
} from 'react-native'
import colors from '../constants/Colors'
import {busesSelector, busesSortedSelector} from '../selectors'
import {connect} from 'react-redux'
import {addBus} from '../actions'
import BusCard from '../components/BusCard'
import Separator from '../components/Separator'

@connect(state => ({buses: busesSelector(state)}), {addBus})
class BusesScreen extends React.Component {
  static navigationOptions = {
    header: null
  }

  renderItem = ({item}) => (
    <BusCard
      bus = {item}
      onPress = {() => this.props.navigation.navigate('EditBus', {id: item.id})}
    />
  )

  handleSubmit = () => {
    this.props.navigation.push('AddBus')
  }

  render() {
    return (
      <SafeAreaView style = {styles.container}>
        <FlatList
          // contentContainerStyle = {}
          ItemSeparatorComponent = {Separator}
          data = {this.props.buses}
          renderItem = {this.renderItem}
          keyExtractor = {({id}) => id}
          // ListFooterComponent = {}
        />
        <TouchableOpacity onPress = {this.handleSubmit}>
          <View style = {[styles.field, styles.button]}>
            <Text style = {[styles.getStartedText, {color: 'white'}]}>
              Add bus
            </Text>
          </View>
        </TouchableOpacity>
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

export default BusesScreen