class RemoveVolume {
  constructor(repository) {
    this.repository = repository
  }

  async execute(identifier) {
    const resultVolume = await this.repository.findVolumeByIdentifier(
      identifier
    )

    if (resultVolume?.length > 0) {
      const result = await this.repository.remove(resultVolume[0]._id)
      if (result?.deletedCount) {
        return { message: "Volume removido com sucesso" }
      }
    }
    return { error: "Volume não localizado" }
  }
}

export default RemoveVolume
