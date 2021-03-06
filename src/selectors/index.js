import {createSelector} from 'reselect'

export const driversMapSelector = state => state.drivers.get('entities')
export const tempDriverMapSelector = state => state.drivers.get('tempEntity')
export const busesMapSelector = state => state.buses.get('entities')
export const tempBusMapSelector = state => state.buses.get('tempEntity')
export const distanceSelector = state => state.distance.get('distance')
export const errorSelector = state => state.distance.get('error')
export const loadingDistanceSelector = state => state.distance.get('loading')

export const idSelector = (_, props) => props.id
export const idFromNavigationSelector = (_, props) => props.navigation.state.params.id
export const busIdSelector = (_, props) => props.bus.id
export const driverBusesSelector = (_, props) => props.driver.buses

export const driversSelector = createSelector(driversMapSelector, drivers => drivers.valueSeq().toArray())
export const busesSelector = createSelector(busesMapSelector, buses => buses.valueSeq().toArray())

export const driversSortedSelector = createSelector(driversMapSelector, busesMapSelector,
  (drivers, buses) => drivers
    .sortBy(driver => driver.buses
      .map(id => Number(buses.get(id).speed))
      .max()
    )
    .reverse()
    .valueSeq()
    .toArray()
)

export const fastestBusOfDriverSelector = createSelector(busesMapSelector, driverBusesSelector,
  (buses, driverBuses) => buses
    .filter(bus => driverBuses.includes(bus.id))
    .maxBy(bus => Number(bus.speed))
)

export const allBusesOfDriverSelector = createSelector(busesMapSelector, driverBusesSelector,
  (buses, driverBuses) => buses
    .filter(bus => driverBuses.includes(bus.id))
    .valueSeq()
    .toArray()
)

export const busesSortedSelector = createSelector(busesMapSelector,
  buses => buses.sortBy(bus => Number(bus.speed)).reverse().valueSeq().toArray()
)

export const busSelector = createSelector(busesMapSelector, idFromNavigationSelector,
  (buses, id) => buses.get(id)
)

export const driverSelector = createSelector(driversMapSelector, idFromNavigationSelector,
  (drivers, id) => drivers.get(id)
)

export const busToggleSelector = createSelector(tempDriverMapSelector, busIdSelector,
  (tempDriver, id) => tempDriver.get('buses').includes(id)
)