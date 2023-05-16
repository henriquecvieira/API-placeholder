const query = (params) => (
  [
    {
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
    },
    {
      $group: {
        _id: '$identifierProducer',
        average: {
          $avg: '$volume'
        },
        totalVolume: {
          $sum: '$volume'
        },
        data: {
          $push: {
            volume: '$volume',
            ref: {
              $dayOfMonth: '$date'
            }
          }
        }
      }
    },
    {
      $project: {
        average: { $round: ['$average', 2] },
        totalVolume: { $round: ['$totalVolume', 3] },
        type: 'day',
        data: 1,
        percent: '0'
      }
    }
  ]
)

export default {
  collection: 'milkVolume',
  query
}
