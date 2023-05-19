/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
class SearchDailyAverageVolumeSupervisor {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(params) {
    let fromDate = new Date(params.fromDate);
    let toDate = new Date(params.toDate);

    if (toDate < fromDate) {
      return { error: 'Date to menor que Date from', statusCode: 400 };
    }
    params.fromDate = fromDate
    params.toDate = toDate
    const resultVolume = await this.repository.findDailyAverageSupervisorByDate(params);

    if (resultVolume?.length > 0) {
      return {
        resultVolume,
        fromDate,
        toDate
      }
    }
    return {
      error: `Não foi encontrado média diária para codSupBuy: ${params.codSupBuy}, Date from: ${params.fromDate}, Date to: ${params.toDate}`,
      statusCode: 404
    };
  }
}

export default SearchDailyAverageVolumeSupervisor;
