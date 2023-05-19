import UUIDGenerator from '../../support/UUIDGenerator.mjs'
class UseCaseVolume {
  constructor(repository) {
    this.repository = repository
  }

  async execute(volumeDto) {
    let volumeId = UUIDGenerator.generate()
    let volume = volumeDto
    volume._id = volumeId

    await this.repository.save(volume)

    return volumeId.toString()
  }
}

export default UseCaseVolume
