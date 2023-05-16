/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
class SearchPriceAverageVolumeSupervisor {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(params) {
    let month = new Date(params.date).getUTCMonth() + 1;
    const date = {
      codSupBuy: params.codSupBuy,
      year: new Date(params.date).getFullYear(),
      month: month
    };

    const resultVolume = await this.repository.findPriceAverageSupervisorByDate(date);

    if (resultVolume?.length > 0) {
      return resultVolume;
    }
    return {
      error: `Não foi encontrado média de preço para codSupBuy: ${params.codSupBuy}, Date from: ${params.date}`,
      statusCode: 404
    };
  }
}

export default SearchPriceAverageVolumeSupervisor;
