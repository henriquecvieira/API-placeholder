/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
class ReplaceVolume {
  constructor(repository) {
    this.repository = repository
  }

  async execute(volumeDto, identifier) {
    const resultVolume = await this.repository.findVolumeByIdentifier(
      identifier
    )

    if (resultVolume?.length === 0) {
      return {
        error: 'Volume não encontrado',
        statusCode: 404
      }
    }
    if (volumeDto?.date) {
      volumeDto.date = new Date(volumeDto.date)
    }

    let volume = volumeDto
    volume.updated_at = new Date()
    volume._id = resultVolume[0]._id
    await this.repository.save(volume)
    return volume
  }
}

export default ReplaceVolume
