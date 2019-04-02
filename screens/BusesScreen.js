import React from 'react'
import {
  Platform,
  StyleSheet,
  FlatList,
  SafeAreaView
} from 'react-native'
import {busesSelector, busesSortedSelector} from '../selectors'
import {connect} from 'react-redux'
import {addBus} from '../actions'
import BusCard from '../components/BusCard'
import Separator from '../components/Separator'
import BasicButton from '../components/BasicButton'

@connect(state => ({buses: busesSelector(state)}), {addBus})
class BusesScreen extends React.Component {
  static navigationOptions = {
    title: 'Buses'
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

        <BasicButton onPress = {this.handleSubmit} title = 'Add bus'/>
      </SafeAreaView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center'
  }
})

export default BusesScreen