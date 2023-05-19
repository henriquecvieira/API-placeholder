const presenter = (dateFrom, dateTo, volume) => {
  let dataFromFormat = ((dateFrom.getFullYear())) + '-' + ((dateFrom.getMonth() + 1)) + '-' + dateFrom.getDate();
  let dataToFormat = ((dateTo.getFullYear())) + '-' + ((dateTo.getMonth() + 1)) + '-' + dateTo.getDate();

  let sumVolume = 0
  for (let i = 0; i < volume.length; i += 1) {
    sumVolume += volume[i].volume
  }

  // eslint-disable-next-line no-use-before-define
  const numberMonth = dateRange(dataFromFormat, dataToFormat);

  const mediaVolume = sumVolume / numberMonth.length

  return {
    code: volume[0].code,
    dataFromFormat,
    dataToFormat,
    sumVolume,
    numMonth: numberMonth.length,
    mediaVolume: mediaVolume.toFixed(2)
  }
}

function dateRange(startDate, endDate) {
  var start = startDate.split('-');
  var end = endDate.split('-');
  var startYear = parseInt(start[0]);
  var endYear = parseInt(end[0]);
  var dates = [];

  for (var i = startYear; i <= endYear; i += 1) {
    var endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
    var startMon = i === startYear ? parseInt(start[1]) - 1 : 0;
    for (var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j + 1) {
      var month = j + 1;
      var displayMonth = month < 10 ? '0' + month : month;
      dates.push([i, displayMonth, '01'].join('-'));
    }
  }
  return dates;
}

export default {
  present: presenter
}
