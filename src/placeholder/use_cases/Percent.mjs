const execute = async (valueOne, valueTwo) => {
  let maior = (parseFloat(valueOne) > parseFloat(valueTwo) ? valueOne : valueTwo)
  let menor = (parseFloat(valueOne) < parseFloat(valueTwo) ? valueOne : valueTwo)

  let result = (menor / maior) * 100;
  if (parseFloat(valueTwo) > parseFloat(valueOne)) {
    result = (100 - result) * -1
  } else {
    result = ((maior / menor) * 100);
  }

  return result.toFixed(2)
}

export default {
  execute
}
