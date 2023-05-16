const query = (params) => (
  [{
    $match: {
      codSupBuy: params.codSupBuy
    }
  }, {
    $lookup: {
      from: 'property',
      localField: 'cpf',
      foreignField: 'cpf',
      as: 'newProperty'
    }
  }, {
    $project: {
      cpf: 1,
      codePiracanjuba: '$newProperty.codePiracanjuba',
      codSupBuy: 1
    }
  }, {
    $unwind: '$codePiracanjuba'
  }, {
    $lookup: {
      from: 'milkVolume',
      localField: 'codePiracanjuba',
      foreignField: 'identifierProducer',
      as: 'Result'
    }
  }, {
    $unwind: '$Result'
  }, {
    $project: {
      cpf: 1,
      codePiracanjuba: 1,
      volume: '$Result.volume',
      date: '$Result.date',
      codSupBuy: 1
    }
  }, {
    $match: {
      $and: [
        {
          date: {
            $gte: params.fromDate
          }
        },
        {
          date: {
            $lte: params.toDate
          }
        }
      ]
    }
  }, {
    $group: {
      _id: {
        $substr: [
          '$date',
          8,
          2
        ]
      },
      totalVolume: {
        $sum: '$volume'
      }
    }
  }, {
    $sort: {
      _id: 1
    }
  }]
)

export default {
  collection: 'user',
  query
}
