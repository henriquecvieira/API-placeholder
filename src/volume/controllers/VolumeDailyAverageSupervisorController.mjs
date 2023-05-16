import RepositoryImpl from '../../../infra/repository/index.mjs';
import VolumeRepository from '../repositories/Volume.mjs';
import SearchDailyAverageSupervisor from '../use_cases/SearchDailyAverageSupervisor.mjs';
import { default as SearchDailyAverageSupervisorValidator } from './validators/SearchDailyAverageSupervisor.mjs';
import { default as volumeDailyAverageSupervisor } from '../presenters/volumeDailyAverageSupervisor.mjs';
import url from 'url';

const Repository = new VolumeRepository(RepositoryImpl);

export async function search(request, response, next) {
  try {
    let urlParts = url.parse(request.url, true)
    const averageDto = urlParts.query
    let validator = await SearchDailyAverageSupervisorValidator.validate(averageDto);
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      });
    }

    const dailyAverageSupervisorUseCase = new SearchDailyAverageSupervisor(Repository)
    const dailyAverageSupervisor = await dailyAverageSupervisorUseCase.execute(averageDto)

    if (dailyAverageSupervisor?.error) {
      return response
        .status(dailyAverageSupervisor.statusCode)
        .json(dailyAverageSupervisor)
    }
    const presentVolumeSupervisor = await volumeDailyAverageSupervisor.present(
      dailyAverageSupervisor
    );
    return response.status(200).json(presentVolumeSupervisor);
  } catch (error) {
    return next(error);
  }
}
