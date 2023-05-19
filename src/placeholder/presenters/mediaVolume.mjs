const presenter = (dateFrom, dateTo, volume, numDaysMonth) => {
  let sumVolume = 0
  for (let i = 0; i < volume.length; i += 1) {
    sumVolume += volume[i].volume
  }
  const mediaVolume = sumVolume / numDaysMonth
  return {
    code: volume[0].code,
    dateFrom,
    dateTo,
    sumVolume,
    numDaysMonth,
    mediaVolume: mediaVolume.toFixed(2)
  }
}

export default {
  present: presenter
}
