import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  FlatList
} from 'react-native'
import {connect} from 'react-redux'
import {busesSelector} from '../selectors'
import BusLinkRow from '../components/drivers/BusLinkRow'

@connect(state => ({buses: busesSelector(state)}))
class LinkBusToDriverFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Link buses'
  }

  renderItem = ({item}) => {
    return <BusLinkRow bus = {item}/>
  }

  render() {

    return (
      <SafeAreaView style = {styles.container}>
        <FlatList
          data = {this.props.buses}
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

export default LinkBusToDriverFormScreen