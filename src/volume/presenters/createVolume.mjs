const presenter = async (volume) => {
  return {
    identifier: volume.identifier,
    volume: volume.volume,
    date: volume.date,
    identifierProducer: volume.identifierProducer
  }
}

export default {
  present: presenter
}
