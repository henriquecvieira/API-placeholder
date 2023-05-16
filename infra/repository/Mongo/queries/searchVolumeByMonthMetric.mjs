const query = (params) => (
  [{
    $match: {
      $and: [
        {
          date: {
            $gte: params.dateFrom
          }
        },
        {
          date: {
            $lte: params.dateTo
          }
        },
        {
          identifierProducer: params.identifierProducer
        }
      ]
    }
  }, {
    $group: {
      _id: {
        $substr: [
          '$date',
          5,
          2
        ]
      },
      monthAverage: {
        $avg: '$volume'
      },
      totalVolume: {
        $sum: '$volume'
      }
    }
  }, {
    $project: {
      monthAverage: { $round: ['$monthAverage', 2] },
      totalVolume: { $round: ['$totalVolume', 3] },
      type: 'month',
      data: 1
    }
  }]
)

export default {
  collection: 'milkVolume',
  query
}
