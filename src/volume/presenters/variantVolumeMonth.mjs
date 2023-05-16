/* eslint-disable max-len */
const presenter = (dateFrom, dateTo, volume) => {
  let dataFromFormat = ((dateFrom.getFullYear())) + '-' + ((dateFrom.getMonth() + 1)) + '-' + dateFrom.getDate();
  let dataToFormat = ((dateTo.getFullYear())) + '-' + ((dateTo.getMonth() + 1)) + '-' + dateTo.getDate();

  let sumVolume = 0
  for (let i = 0; i < volume.length; i += 1) {
    sumVolume += volume[i].volume
  }

  return {
    dataFromFormat,
    dataToFormat,
    sumVolume
  }
}

const resultPresenter = (params) => {
  if (params[0]?.notResultToFrom || params[1]?.notResultToFrom) {
    return {
      error: 'Não foi possível obter os dados',
      params
    }
  }

  let maior = (parseFloat(params[0].sumVolume) > parseFloat(params[1].sumVolume) ? params[0].sumVolume : params[1].sumVolume)
  let menor = (parseFloat(params[0].sumVolume) < parseFloat(params[1].sumVolume) ? params[0].sumVolume : params[1].sumVolume)

  let result = (menor / maior) * 100;
  if (parseFloat(params[1].sumVolume) > parseFloat(params[0].sumVolume)) {
    result = (100 - result) * -1
  } else {
    result = ((maior / menor) * 100);
  }

  return {
    params,
    percentMonth: result.toFixed(2)
  }
}

export default {
  present: presenter,
  resultPresenter: resultPresenter
}
