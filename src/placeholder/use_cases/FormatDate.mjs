const formatDates = (params) => {
  const from = params.dateFrom.split('-');
  const to = params.dateTo.split('-');

  let numDaysMonth = new Date(to[0], to[1], 0);
  numDaysMonth = numDaysMonth.getDate();

  const resultDateFrom = new Date(from[0], from[1] - 1, from[2])

  const resultDateTo = new Date(to[0] + '-' + to[1] + '-' + numDaysMonth + 'T23:59:59.001Z')

  return {
    resultDateFrom,
    resultDateTo,
    numDaysMonth
  }
}

const formatNewDate = (dateFrom, dateTo) => {
  const resultDateFrom = new Date(dateFrom + 'T00:00:00.000Z')
  const resultDateTo = new Date(dateTo + 'T23:59:59.001Z')

  return {
    resultDateFrom,
    resultDateTo
  }
}

const formatDateMonth = (dateFrom) => {
  // Formata data com menos um mês
  let dayMonth = new Date()
  const from = dateFrom.split('-');
  const day = dayMonth.getDate() < 10 ? '0' + dayMonth.getDate() : dayMonth.getDate();
  let d = new Date(from[0] + '-' + from[1] + '-' + day + 'T00:00:00.000Z');

  d.setMonth(d.getMonth() - 1)

  let numDaysMonth = new Date(d.getFullYear(), (d.getMonth() + 1), 0);

  numDaysMonth = numDaysMonth.getDate();
  let month = d.getMonth() + 1
  month = month < 10 ? '0' + month : month;

  const resultDateFrom = new Date(d.getFullYear() + '-' + month + '-01T00:00:00.000Z')

  const resultDateTo = new Date(d.getFullYear() + '-' + month + '-' + numDaysMonth + 'T23:59:59.001Z')

  return {
    resultDateFrom,
    resultDateTo,
    numDaysMonth
  }
}

export default {
  formatDate: formatDates,
  formatNewDate: formatNewDate,
  formatDateMonth: formatDateMonth
}
