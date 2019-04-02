import {Location} from 'expo'
import {END, FAILED, START, SUCCESS} from '../constants/actions'

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
  const {findDistance, type, ...rest} = action
  if (!findDistance) return next(action)

  next({...rest, type: type + START})

  try {
    const [[from], [to]] = await
      Promise.all([action.payload.from, action.payload.to].map(Location.geocodeAsync))

    if (!from || !to) return next({...rest, type: type + END + FAILED, error: 'no coords'})

    const distance = getHaversineDistance(from, to)

    next({
      ...rest,
      type: type + END + SUCCESS,
      distance
    })

  } catch (error) {
    next({
      ...rest,
      type: type + END + FAILED,
      error
    })
    console.warn(error)
  }

}