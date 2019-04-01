import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Switch
} from 'react-native'

class BusesList extends React.Component {

  render() {
    const {item, getBuses, toggleBus} = this.props
    const {model, year, speed, id} = item
    const buses = getBuses()

    return (
      <View style = {styles.container}>
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

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    margin: 10,
    padding: 10,
    borderRadius: 10,
  }
})

export default BusesList