import { default as VariantVolumeMonthPresenter } from '../presenters/variantVolumeMonth.mjs'
import { default as MediaVolumeMonthPresenter } from '../presenters/mediaVolumeMonth.mjs'
import { default as MediaVolumePresenter } from '../presenters/mediaVolume.mjs'
import { default as SumVolumePresenter } from '../presenters/sumVolume.mjs'
import { default as VolumePresenter } from '../presenters/volume.mjs'
import { default as CreateVolumePresenter } from '../presenters/createVolume.mjs'
import { default as UpdateVolumeValidator } from './validators/UpdateVolume.mjs'
// import { default as StoreVolume } from '../use_cases/StoreVolume.mjs'
import { default as CreateVolumeValidator } from './validators/CreateVolume.mjs'
import { default as SearchVolumeValidator } from './validators/SearchVolume.mjs'
import { default as FormatDate } from '../use_cases/FormatDate.mjs'
import RepositoryImpl from '../../../infra/repository/index.mjs'
import ReplaceVolume from '../use_cases/ReplaceVolume.mjs'
import VolumeRepository from '../repositories/Volume.mjs'
import RemoveVolume from '../use_cases/RemoveVolume.mjs'
import SearchVolume from '../use_cases/SearchVolume.mjs'
import CreateVolume from '../use_cases/CreateVolume.mjs'

import url from 'url';

const Repository = new VolumeRepository(RepositoryImpl)

export async function mediaVolumeMonths(request, response, next) {
  try {
    if (!request.query?.code || !request.query?.from || !request.query?.to) {
      return response.status(400).json({
        message: 'Invalid parameters. Expecting code, from and to.'
      })
    }

    let urlParts = url.parse(request.url, true)
    const code = urlParts.query.code
    const from = urlParts.query.from
    const to = urlParts.query.to
    const formatDate = FormatDate.formatDate(from, to)
    const searchVolumeUseCase = new SearchVolume(Repository)
    const searchVolume = await searchVolumeUseCase.execute(
      code, formatDate.resultDateFrom, formatDate.resultDateTo
    )

    if (searchVolume?.error) {
      return response.status(404).json({ message: searchVolume })
    }
    const presentVolume = MediaVolumeMonthPresenter.present(
      formatDate.resultDateFrom, formatDate.resultDateTo, searchVolume
    )
    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function mediaVolume(request, response, next) {
  try {
    if (!request.query?.code || !request.query?.from) {
      return response.status(400).json({
        message: 'Invalid parameters. Expecting code and from.'
      })
    }

    let urlParts = url.parse(request.url, true);
    const code = urlParts.query.code;
    const from = urlParts.query.from;
    const formatDate = FormatDate.formatDate(from, from)
    const searchVolumeUseCase = new SearchVolume(Repository)
    const searchVolume = await searchVolumeUseCase.execute(
      code, formatDate.resultDateFrom, formatDate.resultDateTo
    )

    if (searchVolume?.error) {
      return response.status(404).json({ message: searchVolume })
    }
    const presentVolume = await MediaVolumePresenter.present(
      formatDate.resultDateFrom, formatDate.resultDateTo, searchVolume, formatDate.numDaysMonth
    )
    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function sumVolume(request, response, next) {
  try {
    if (!request.query?.code || !request.query?.from || !request.query?.to) {
      return response.status(400).json({
        message: 'Invalid parameters. Expecting code, from and to.'
      })
    }

    let urlParts = url.parse(request.url, true);
    const code = urlParts.query.code
    const from = urlParts.query.from
    const to = urlParts.query.to
    const formatDate = FormatDate.formatDate(from, to)
    const searchVolumeUseCase = new SearchVolume(Repository)
    const searchVolume = await searchVolumeUseCase.execute(
      code, formatDate.resultDateFrom, formatDate.resultDateTo
    )

    if (searchVolume?.error) {
      return response.status(404).json({ message: searchVolume })
    }
    const presentVolume = await SumVolumePresenter.present(
      formatDate.resultDateFrom, formatDate.resultDateTo, searchVolume
    )
    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function index(request, response, next) {
  try {
    const volumeDto = request.query
    let validator = await SearchVolumeValidator.validate(volumeDto)
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      })
    }
    const identifierProducer = request.params?.identifierProducer
    if (!identifierProducer) {
      return response.status(400).json({ error: 'Campo identifierProducer obrigatório' })
    }
    const { fromDate, toDate } = volumeDto

    const searchVolumeUseCase = new SearchVolume(Repository)

    const searchVolume = await searchVolumeUseCase.execute(identifierProducer, fromDate, toDate)

    if (searchVolume?.error) {
      return response.status(searchVolume.statusCode).json(searchVolume)
    }
    const presentVolume = await VolumePresenter.present(searchVolume)
    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function store(request, response, next) {
  try {
    const volumeDto = request.body
    let validator = await CreateVolumeValidator.validate(volumeDto)
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      })
    }
    const createVolumeUseCase = new CreateVolume(Repository)
    const storeVolume = await createVolumeUseCase.execute(volumeDto)
    if (storeVolume?.error) {
      return response.status(storeVolume.statusCode).json(storeVolume)
    }
    const presentVolume = await CreateVolumePresenter.present(storeVolume)

    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function update(request, response, next) {
  try {
    const volumeDto = request.body
    let validator = await UpdateVolumeValidator.validate(volumeDto)
    if (validator !== true) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.',
        errors: validator
      })
    }
    const identifier = request.params?.identifier
    if (!identifier) {
      return response.status(400).json({ error: 'Campo identifier obrigatório' })
    }

    const VolumeUseCase = new ReplaceVolume(Repository)
    const updateVolume = await VolumeUseCase.execute(volumeDto, identifier)
    if (updateVolume?.error) {
      return response.status(updateVolume.statusCode).json(updateVolume)
    }
    const presentVolume = await CreateVolumePresenter.present(updateVolume)

    return response.status(200).json(presentVolume)
  } catch (error) {
    return next(error)
  }
}

export async function remove(request, response, next) {
  try {
    const identifier = request.params?.identifier
    if (!identifier) {
      return response.status(400).json({
        message: 'Parâmetros inválidos.'
      })
    }

    const removeVolumeUseCase = new RemoveVolume(Repository)
    const removeVolume = await removeVolumeUseCase.execute(identifier)

    if (removeVolume?.error) {
      return response.status(404).json(removeVolume)
    }

    return response.status(200).json(removeVolume)
  } catch (error) {
    return next(error)
  }
}

export async function variantVolumeMonths(request, response, next) {
  try {
    if (!request.query?.code || !request.query?.from) {
      return response.status(400).json({
        message: 'Invalid parameters. Expecting code and from.'
      })
    }

    let urlParts = url.parse(request.url, true);
    const code = urlParts.query.code;
    const from = urlParts.query.from;
    const formatDate = FormatDate.formatDate(from, from)
    const searchVolumeUseCase = new SearchVolume(Repository)
    const searchVolume = await searchVolumeUseCase.execute(
      code, formatDate.resultDateFrom, formatDate.resultDateTo
    )
    let result = []
    if (searchVolume?.error) {
      result.push({ notResultToFrom: true })
    } else {
      const presentVolume = VariantVolumeMonthPresenter.present(
        formatDate.resultDateFrom, formatDate.resultDateTo, searchVolume
      )
      result.push(presentVolume)
    }

    const formatDateVariant = FormatDate.formatDateMonth(from, from)
    const searchVariantVolumeUseCase = new SearchVolume(Repository)
    const searchVolumeVariant = await searchVariantVolumeUseCase.execute(
      code, formatDateVariant.resultDateFrom, formatDateVariant.resultDateTo
    )
    if (searchVolumeVariant?.error) {
      result.push({ notResultToFrom: searchVolumeVariant?.error })
    } else {
      const presentVolumeVariant = VariantVolumeMonthPresenter.present(
        formatDateVariant.resultDateFrom, formatDateVariant.resultDateTo, searchVolumeVariant
      )
      result.push(presentVolumeVariant)
    }

    const resultVolume = VariantVolumeMonthPresenter.resultPresenter(result)
    if (resultVolume?.error) {
      return response.status(400).json(resultVolume)
    }
    return response.status(200).json(resultVolume)
  } catch (error) {
    return next(error)
  }
}
