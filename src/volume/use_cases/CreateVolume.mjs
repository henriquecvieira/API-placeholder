/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import UUIDGenerator from '../../support/UUIDGenerator.mjs'
// import moment from 'moment-timezone'

class CreateVolume {
  constructor(repository) {
    this.repository = repository
  }

  async execute(volumeDto) {
    const { identifier } = volumeDto

    const resultVolume = await this.repository.findVolumeByIdentifier(identifier)

    if (resultVolume?.length > 0) {
      return {
        error: `Volume já existe, identifier: ${identifier}`,
        statusCode: 422
      }
    }

    volumeDto.created_at = new Date()
    volumeDto.date = new Date(volumeDto.date)
    volumeDto._id = UUIDGenerator.generate()

    await this.repository.save(volumeDto)
    return volumeDto
  }
}

export default CreateVolume
