import url from 'url';
import { default as FormatDate } from '../use_cases/FormatDate.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import VolumeRepository from '../repositories/Volume.mjs'
import SearchVolumeMetric from '../use_cases/SearchVolumeMetric.mjs'
import { default as validateVolumeMetric } from './validators/SearchVolumeMetric.mjs'

const Repository = new VolumeRepository(RepositoryImpl)

export async function search(request, response, next) {
  try {
    let urlParts = url.parse(request.url, true);
    const volumeDto = urlParts.query
    let validator = await validateVolumeMetric.validate(volumeDto)
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      })
    }
    const formatDate = FormatDate.formatDate(volumeDto)
    if (formatDate.resultDateTo < formatDate.resultDateFrom) {
      return response.status(400).json({ error: 'Data final menor que data inicial.' })
    }
    const searchVolumeUseCase = new SearchVolumeMetric(Repository)
    const searchVolume = await searchVolumeUseCase.execute(
      volumeDto.identifierProducer, formatDate
    )

    if (searchVolume?.error) {
      return response.status(404).json({ message: searchVolume })
    }

    return response.status(200).json(searchVolume)
  } catch (error) {
    return next(error)
  }
}
