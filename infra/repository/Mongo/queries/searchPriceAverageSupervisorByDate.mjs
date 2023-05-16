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
      $and: [
        {
          year: params.year
        },
        {
          month: params.month
        }
      ]
    }
  },
  {
    $group: {
      _id: '$codSupBuy',
      average: {
        $avg: {
          $toDouble: '$price'
        }
      }
    }
  }
];

export default {
  collection: 'user',
  query
};
