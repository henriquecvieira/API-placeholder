const presenter = async (volume) => {
  const resultVolume = volume.map((Temp) => {
    let result = Temp.average.toFixed(2);
    result = result.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    return result;
  });

  return {
    averagePrice: parseFloat(resultVolume).toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })
  };
};

export default {
  present: presenter
};
