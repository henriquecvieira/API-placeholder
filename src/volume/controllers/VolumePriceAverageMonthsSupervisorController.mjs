/* eslint-disable max-len */
import RepositoryImpl from '../../../infra/repository/index.mjs';
import VolumeRepository from '../repositories/Volume.mjs';
import SearchPriceAverageMonthsSupervisor from '../use_cases/SearchPriceAverageMonthsSupervisor.mjs';
import { default as SearchPriceAverageMonthsSupervisorValidator } from './validators/SearchPriceAverageMonthsSupervisor.mjs';
import { default as volumePriceAverageMonthsSupervisor } from '../presenters/volumePriceAverageMonthsSupervisor.mjs';
import url from 'url';

const Repository = new VolumeRepository(RepositoryImpl);

export async function search(request, response, next) {
  try {
    let urlParts = url.parse(request.url, true);
    const averageDto = urlParts.query;
    let validator = await SearchPriceAverageMonthsSupervisorValidator.validate(averageDto);
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      });
    }

    const priceAverageMonthsSupervisorUseCase = new SearchPriceAverageMonthsSupervisor(Repository);
    const priceAverageSupervisor = await priceAverageMonthsSupervisorUseCase.execute(averageDto);

    if (priceAverageSupervisor?.error) {
      return response.status(priceAverageSupervisor.statusCode).json(priceAverageSupervisor);
    }
    const presentVolumeSupervisor = await volumePriceAverageMonthsSupervisor.present(priceAverageSupervisor);
    return response.status(200).json(presentVolumeSupervisor);
  } catch (error) {
    return next(error);
  }
}
