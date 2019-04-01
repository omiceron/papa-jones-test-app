import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import PropTypes from 'prop-types'
import BasicCard from './BasicCard'

class SegmentedCard extends Component {
  static propTypes = {
    // LeftComponent: PropTypes.node
  }

  renderLeftComponent = () => {
    const {LeftComponent} = this.props
    return LeftComponent
      ? <View style = {styles.leftContainer}>
        <LeftComponent/>
      </View>
      : null
  }

  render() {
    const {LeftComponent, children, ...props} = this.props
    return <BasicCard {...props}>
      <View style = {styles.container}>
        {children}
      </View>
      {this.renderLeftComponent()}
    </BasicCard>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftContainer: {
    marginLeft: 10,
    width: 50,
    alignItems: 'flex-end',
    justifyContent: 'center'
  }
})

export default SegmentedCard