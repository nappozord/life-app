export function calculatePercentage(numbers, total) {
  const percentageArray = [];

  numbers.forEach((number) => {
    let division = (number / total);

    let percentage = Math.floor(division * 100);

    percentage.toString() === "NaN" ? percentage = 100 : null;

    percentage.toString() === "Infinity" ? percentage = -100 : null;
    percentage.toString() === "-Infinity" ? percentage = 100 : null;

    percentageArray.push(percentage);
  });

  return percentageArray;
}

export function calculatePercentageDifference(value1, value2) {
  if(value1 == 0 && value2 == 0){
    return {
      value: 0,
      symbol: "+",
    }
  }

  return {
    value: ((Math.abs(value1 - value2) / value1) * 100).toFixed(2),
    symbol: value1 < value2 ? "-" : "+",
  };
}
