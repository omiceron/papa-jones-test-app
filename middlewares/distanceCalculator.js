import {Location} from 'expo'

const getHaversineDistance = (firstLocation, secondLocation) => {
  const earthRadius = 6371

  const diffLat = (secondLocation.latitude - firstLocation.latitude) * Math.PI / 180
  const diffLng = (secondLocation.longitude - firstLocation.longitude) * Math.PI / 180

  const arc = Math.cos(
    firstLocation.latitude * Math.PI / 180) * Math.cos(secondLocation.latitude * Math.PI / 180)
    * Math.sin(diffLng / 2) * Math.sin(diffLng / 2)
    + Math.sin(diffLat / 2) * Math.sin(diffLat / 2)
  const line = 2 * Math.atan2(Math.sqrt(arc), Math.sqrt(1 - arc))

  const distance = earthRadius * line

  return distance
}

export default store => next => async action => {
  if (!action.findDistance) return next(action)

  const [[from], [to]] = await
    Promise.all([action.from, action.to].map(Location.geocodeAsync))

  if (!from || !to) return next({...action, distance: null})

  const distance = getHaversineDistance(from, to)

  next({
    ...action,
    distance
  })

}