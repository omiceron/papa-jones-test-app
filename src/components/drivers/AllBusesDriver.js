import React from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import {connect} from 'react-redux'
import {distanceSelector, allBusesOfDriverSelector} from '../../selectors/index'
import DriverCard from './DriverCard'

@connect((state, props) => ({
  allBuses: allBusesOfDriverSelector(state, props),
  distance: distanceSelector(state, props)
}))
class AllBusesDriver extends React.Component {

  renderAllBuses = () => {
    return <View style = {styles.textView}>
      {this.props.allBuses.map(bus => <View key = {bus.id}>
          <Text style = {styles.text}>
            {bus.model} {bus.year}
          </Text>
        </View>
      )}

    </View>
  }

  render() {
    const {driver, allBuses, distance, ...rest} = this.props
    console.log(allBuses)
    return (
      <DriverCard {...rest} driver = {driver} LeftComponent = {this.renderAllBuses}/>
    )
  }
}

const styles = StyleSheet.create({
  textView: {
    flex: 1,
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)'
  }
})

export default AllBusesDriver