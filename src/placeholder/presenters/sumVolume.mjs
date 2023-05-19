const presenter = (dateFrom, dateTo, volume) => {
  let dataFromFormat = ((dateFrom.getFullYear())) + '-' + ((dateFrom.getMonth() + 1)) + '-' + dateFrom.getDate();
  let dataToFormat = ((dateTo.getFullYear())) + '-' + ((dateTo.getMonth() + 1)) + '-' + dateTo.getDate();
  let sumVolume = 0
  for (let i = 0; i < volume.length; i += 1) {
    sumVolume += volume[i].volume
  }

  return {
    code: volume[0].code,
    dateFrom: dataFromFormat,
    dateTo: dataToFormat,
    sumVolume: sumVolume
  }
}

export default {
  present: presenter
}
