/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
class SearchVolumeSupervisor {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(params) {
    let fromDate = new Date(params.fromDate);
    let toDate = new Date(params.toDate);

    if (toDate < fromDate) {
      return { error: 'Date to menor que Date from', statusCode: 400 };
    }
    params.fromDate = fromDate;
    params.toDate = toDate;

    const resultVolume = await this.repository.findVolumeSupervisorByDate(params);

    if (resultVolume?.length > 0) {
      return {
        totalVolume: resultVolume[0].totalVolume,
        fromDate,
        toDate
      }
    }
    return {
      error: `Volume não encontrado para codSupBuy: ${params.codSupBuy}, Date from: ${params.fromDate}, Date to: ${params.toDate}`,
      statusCode: 404
    };
  }
}

export default SearchVolumeSupervisor;
