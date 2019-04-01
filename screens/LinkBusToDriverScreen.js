import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Switch,
  ScrollView,
  FlatList
} from 'react-native'
import {connect} from 'react-redux'
import colors from '../constants/Colors'
import {busesSelector} from '../selectors'
import BusesList from '../components/BusesList'

@connect(state => ({buses: busesSelector(state)}))
class LinkBusToDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Add buses'
  }

  renderItem2 = ({model, year, speed, id}, buses, toggleBus) => {
    // renderItem = ({item: {model, year, speed, id}}) => {
    return <View>
      <Text>
        {model} {year} {speed}
      </Text>
      <Switch
        value = {buses.includes(id)}
        onValueChange = {(val) => {
          toggleBus(id, val)
          this.forceUpdate()
        }}
      />
    </View>
  }

  renderItem = ({item}) => {
    const {getBuses, toggleBus} = this.props.navigation.state.params
    return <BusesList item = {item} getBuses = {getBuses} toggleBus = {toggleBus}/>
  }

  render() {

    return (
      <SafeAreaView style = {styles.container}>
        <ScrollView style = {styles.container}>
          <FlatList
            data = {this.props.buses}
            renderItem = {this.renderItem}
            keyExtractor = {({id}) => id}
          />
        </ScrollView>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
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

export default LinkBusToDriverFormScreen