const presenter = (volume) => {
  var diffDays = Math.ceil(((volume.toDate - volume.fromDate) + 1) / (1000 * 3600 * 24));
  return {
    volumeTotal: volume.totalVolume,
    averageDaily: Number((volume.totalVolume / diffDays).toFixed(2))
  }
}

export default {
  present: presenter
}
