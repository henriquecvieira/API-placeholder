const presenter = async (volume) => {
  var diffDays = Math.ceil(((volume.toDate - volume.fromDate) + 1) / (1000 * 3600 * 24));
  let totalVolume = 0
  for (let i = 0; i < volume.resultVolume.length; i++) {
    totalVolume += volume.resultVolume[i].totalVolume
  }

  const resultVolume = volume.resultVolume.map((Temp) => {
    let result = {
      day: Temp._id,
      totalDay: Temp.totalVolume
    }

    return result
  })

  return {
    volumeTotal: totalVolume,
    averageDaily: Number((totalVolume / diffDays).toFixed(2)),
    days: resultVolume
  }
}

export default {
  present: presenter
}
