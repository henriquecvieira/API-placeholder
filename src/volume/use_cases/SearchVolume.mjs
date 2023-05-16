/* eslint-disable eqeqeq */
class SearchVolume {
  constructor(repository) {
    this.repository = repository
  }

  async execute(identifierProducer, dateFrom, dateTo) {
    let dateInitial = new Date(dateFrom + 'T00:00:00.000Z')
    let dateFinal = new Date(dateTo + 'T00:00:00.000Z')
    const resultVolume = await this.repository.findVolumeByDate(
      identifierProducer,
      dateInitial,
      dateFinal
    )
    if (resultVolume?.length > 0) {
      return resultVolume
    }
    return {
      error: `Volume não encontrado para identifierProducer: ${identifierProducer}, from: ${dateFrom}, to: ${dateTo}`,
      statusCode: 404
    }
  }
}

export default SearchVolume
