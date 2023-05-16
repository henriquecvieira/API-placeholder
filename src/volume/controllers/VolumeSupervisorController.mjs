import { default as VolumeSupervisorPresenter } from '../presenters/volumeSupervisor.mjs';
import { default as SearchVolumeSupervisorValidator } from './validators/SearchVolumeSupervisor.mjs';
import RepositoryImpl from '../../../infra/repository/index.mjs';
import VolumeRepository from '../repositories/Volume.mjs';
import SearchVolumeSupervisor from '../use_cases/SearchVolumeSupervisor.mjs';
import url from 'url';

const Repository = new VolumeRepository(RepositoryImpl);

export async function search(request, response, next) {
  try {
    let urlParts = url.parse(request.url, true);
    const volumeDto = urlParts.query;
    let validator = await SearchVolumeSupervisorValidator.validate(volumeDto);
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      });
    }

    const searchVolumeSupervisorUseCase = new SearchVolumeSupervisor(
      Repository
    );
    const searchVolumeSupervisor = await searchVolumeSupervisorUseCase.execute(
      volumeDto
    );

    if (searchVolumeSupervisor?.error) {
      return response
        .status(searchVolumeSupervisor.statusCode)
        .json(searchVolumeSupervisor);
    }
    const presentVolumeSupervisor = await VolumeSupervisorPresenter.present(
      searchVolumeSupervisor
    );
    return response.status(200).json(presentVolumeSupervisor);
  } catch (error) {
    return next(error);
  }
}
