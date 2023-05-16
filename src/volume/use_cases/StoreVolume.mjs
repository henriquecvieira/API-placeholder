import { default as VolumeValidator } from '../controllers/validators/CreateVolume.mjs'
import DataNotFoundException from '../../core/exceptions/DataNotFoundException.mjs';
import UUIDGenerator from '../../support/UUIDGenerator.mjs'

class StoreVolume {
  constructor(createVolumeUseCase, replaceVolumeUseCase, removeVolumeUseCase) {
    this.createVolumeUseCase = createVolumeUseCase
    this.replaceVolumeUseCase = replaceVolumeUseCase
    this.removeVolumeUseCase = removeVolumeUseCase
  }

  async execute(volumeDto) {
    let validator
    let objectInvalid = []
    let objectValid = []

    for (let i = 0; i < volumeDto.length; i += 1) {
      try {
        validator = await VolumeValidator.validate(volumeDto[i])

        if (validator === false) {
          objectInvalid.push(volumeDto[i])
        } else {
          // eslint-disable-next-line no-param-reassign
          volumeDto[i].start_date = new Date(volumeDto[i].start_date + 'T' + volumeDto[i].start_time + 'Z')
          // eslint-disable-next-line no-param-reassign
          volumeDto[i].arrival_date = new Date(volumeDto[i].arrival_date + 'T' + volumeDto[i].arrival_time + 'Z')

          try {
            switch (volumeDto[i].status) {
              case 1: {
                // Cadastra o volume
                const volumeId = await this.createVolumeUseCase.execute(volumeDto[i])
                if (volumeId === false) {
                  objectInvalid.push({ ExistsCode: volumeDto[i].code })
                } else {
                  let idVolume = UUIDGenerator.from(volumeId)
                  idVolume = idVolume.toString()
                  objectValid.push({
                    insertCode: volumeDto[i].code,
                    insertId: idVolume
                  })
                }

                break;
              }
              case 2: {
                // Atualiza o volume
                const replaceVolume = await this.replaceVolumeUseCase.execute(volumeDto[i])
                if (replaceVolume === false) {
                  objectInvalid.push({ notExists: volumeDto[i] })
                } else {
                  objectValid.push({ updateCode: volumeDto[i].code })
                }
                break;
              }
              case 3: {
                // Delete o volume
                const removeVolume = await this.removeVolumeUseCase.execute(volumeDto[i])
                if (removeVolume === false) {
                  objectInvalid.push({ notExists: volumeDto[i] })
                } else {
                  objectValid.push({ removeCode: volumeDto[i].code })
                }

                break;
              }
              default:
                objectInvalid.push({ notExistsStatus: volumeDto[i].status })
            }
          } catch (error) {
            throw new DataNotFoundException(`ErrorStoreVolume: ${error}`)
            // return {err: error}
          }
        }
      } catch (error) {
        throw new DataNotFoundException(`ErrorStoreVolume: ${error}`)
      }
    }

    return { objectInvalid, objectValid }
  }
}

export default StoreVolume
