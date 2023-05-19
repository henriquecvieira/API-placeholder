/* eslint-disable max-len */
import RepositoryImpl from '../../../infra/repository/index.mjs';
import VolumeRepository from '../repositories/Volume.mjs';
import SearchPriceAverageSupervisor from '../use_cases/SearchPriceAverageSupervisor.mjs';
import { default as SearchPriceAverageSupervisorValidator } from './validators/SearchPriceAverageSupervisor.mjs';
import { default as VolumePriceAverageSupervisor } from '../presenters/volumePriceAverageSupervisor.mjs';
import url from 'url';

const Repository = new VolumeRepository(RepositoryImpl);

export async function search(request, response, next) {
  try {
    let urlParts = url.parse(request.url, true);
    const averageDto = urlParts.query;
    let validator = await SearchPriceAverageSupervisorValidator.validate(averageDto);
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      });
    }

    const priceAverageSupervisorUseCase = new SearchPriceAverageSupervisor(Repository);
    const priceAverageSupervisor = await priceAverageSupervisorUseCase.execute(averageDto);

    if (priceAverageSupervisor?.error) {
      return response.status(priceAverageSupervisor.statusCode).json(priceAverageSupervisor);
    }
    const presentVolumeSupervisor = await VolumePriceAverageSupervisor.present(priceAverageSupervisor);
    return response.status(200).json(presentVolumeSupervisor);
  } catch (error) {
    return next(error);
  }
}
