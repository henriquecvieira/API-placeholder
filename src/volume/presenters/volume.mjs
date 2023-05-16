import UUIDGenerator from '../../support/UUIDGenerator.mjs';
const presenter = (volume) => {
  const resultVolume = volume.map((Temp) => {
    let id = UUIDGenerator.from(Temp._id)
    let result = {
      id: id.toString(),
      identifier: Temp.identifier,
      Temp: Temp.volume,
      date: Temp.date,
      identifierProducer: Temp.identifierProducer
    }

    return result
  })

  return resultVolume
}

export default {
  present: presenter
}
