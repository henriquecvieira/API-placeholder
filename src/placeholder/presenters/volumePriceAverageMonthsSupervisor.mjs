const presenter = async (price) => {
  const resultPrice = price.map((Temp) => {
    const result = {
      month: Temp._id.month,
      year: Temp._id.year,
      averageMonth: parseFloat(Temp.average).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
    };

    return result;
  });

  return resultPrice;
};

export default {
  present: presenter
};
