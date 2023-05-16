const query = (params) => [
  {
    $match: {
      codSupBuy: params.codSupBuy
    }
  },
  {
    $lookup: {
      from: 'property',
      localField: 'cpf',
      foreignField: 'cpf',
      as: 'newProperty'
    }
  },
  {
    $project: {
      cpf: 1,
      codePiracanjuba: '$newProperty.codePiracanjuba',
      codSupBuy: 1
    }
  },
  {
    $unwind: '$codePiracanjuba'
  },
  {
    $lookup: {
      from: 'milkPrice',
      localField: 'codePiracanjuba',
      foreignField: 'identifierProducer',
      as: 'Result'
    }
  },
  {
    $unwind: '$Result'
  },
  {
    $project: {
      cpf: 1,
      codePiracanjuba: 1,
      volume: '$Result.volume',
      date: '$Result.date',
      codSupBuy: 1,
      price: '$Result.price',
      year: '$Result.year',
      month: '$Result.month'
    }
  },
  {
    $match: {
      $or: [
        {
          year: params.yearFinal,
          month: {
            $lte: params.month
          }
        },
        {
          year: params.yearInitial,
          month: {
            $gt: params.month
          }
        }
      ]
    }
  },
  {
    $group: {
      _id: { year: '$year', month: '$month' },
      average: {
        $avg: {
          $toDouble: '$price'
        }
      }
    }
  },
  {
    $sort: {
      '_id.year': -1,
      '_id.month': -1
    }
  }
];

export default {
  collection: 'user',
  query
};
