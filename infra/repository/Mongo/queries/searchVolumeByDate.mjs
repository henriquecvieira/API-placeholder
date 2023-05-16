const query = (identifierProducer, dateFrom, dateTo) => (
  {
    $and: [{
      $and: [{
        date: {
          $gte: dateFrom
        }
      }, {
        date: {
          $lte: dateTo
        }
      }]
    }, {
      identifierProducer
    }]
  }
)

export default {
  collection: 'milkVolume',
  query
}
