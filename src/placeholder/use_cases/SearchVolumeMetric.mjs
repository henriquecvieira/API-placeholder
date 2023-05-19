/* eslint-disable eqeqeq */
import percent from './Percent.mjs'

class SearchVolumeMetric {
  constructor(repository) {
    this.repository = repository
  }

  async execute(identifierProducer, params) {
    const volumeDto = {
      identifierProducer,
      dateFrom: params.resultDateFrom,
      dateTo: params.resultDateTo,
      numDaysMonth: params.numDaysMonth
    }
    const volumePercentDto = {
      identifierProducer,
      dateFrom: new Date(params.resultDateFrom),
      dateTo: new Date(params.resultDateTo),
      numDaysMonth: params.numDaysMonth
    }

    let resultVolume
    if (volumeDto.dateFrom.getMonth() === volumeDto.dateTo.getMonth()) {
      resultVolume = await this.repository.findVolumeByDayMetric(volumeDto)
      if (resultVolume?.length > 0) {
        volumePercentDto.dateFrom.setMonth(volumePercentDto.dateFrom.getMonth() - 1)
        volumePercentDto.dateTo.setMonth(volumePercentDto.dateTo.getMonth() - 1)

        let resultVolumePrevious = await this.repository.findVolumeByDayMetric(volumePercentDto)
        const data = resultVolume[0].data.map((Temp) => {
          return {
            volume: Temp.volume,
            ref: Temp.ref
          }
        })
        const resultPercent = resultVolumePrevious?.length > 0
          ? await percent.execute(resultVolume[0].totalVolume, resultVolumePrevious[0].totalVolume)
          : 0

        const dateNow = new Date()
        let dayAverage = dateNow.getDate()
        const monthTo = volumeDto.dateTo.getMonth()
        const monthNow = dateNow.getMonth()

        if (monthTo !== monthNow) {
          dayAverage = volumeDto.numDaysMonth
        }

        const average = resultVolume[0].totalVolume
        const resultMonth = {
          totalVolume: resultVolume[0].totalVolume,
          average: (average / dayAverage).toFixed(0),
          type: 'day',
          data: data.sort((a, b) => a.ref - b.ref),
          percent: resultPercent
        }
        return resultMonth
      }
    } else {
      resultVolume = await this.repository.findVolumeByMonthMetric(volumeDto)
      if (resultVolume?.length > 0) {
        let data = []
        let totalVolume = 0

        for (let i = 0; i < resultVolume.length; i++) {
          const total = resultVolume[i].totalVolume
          data.push(
            {
              ref: resultVolume[i]._id,
              volume: total
            }
          )
          totalVolume += resultVolume[i].totalVolume
        }
        const average = totalVolume

        const resultMonth = {
          totalVolume,
          average: (average / resultVolume.length).toFixed(0),
          type: 'month',
          data: data.sort((a, b) => a.ref - b.ref)
        }
        return resultMonth
      }
    }

    return {
      error: `Volume não encontrado para identifierProducer: ${identifierProducer}, from: ${volumeDto.dateFrom}, to: ${volumeDto.dateTo}`
    }
  }
}

export default SearchVolumeMetric
