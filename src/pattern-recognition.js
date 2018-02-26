export function minMaxAvrCounter(trainingData) {
  let maxParamsArray = [];
  let minParamsArray = [];
  for (
    let paramsIndex = 0;
    paramsIndex < trainingData[0].length;
    paramsIndex++
  ) {
    let allParamsValues = [];
    for (let caseIndex = 0; caseIndex < trainingData.length; caseIndex++) {
      allParamsValues.push(trainingData[caseIndex][paramsIndex]);
    }

    //находим и добавляем в масссив максимальное значение текущего параметра
    let maxParamValue = Math.max(...allParamsValues);
    console.log(`max param ${paramsIndex} : ${maxParamValue}`);
    maxParamsArray.push(maxParamValue);

    //находим и добавляем в масссив минимальное значение текущего параметра
    let minParamValue = Math.min(...allParamsValues);
    console.log(`min param ${paramsIndex} : ${minParamValue}`);
    minParamsArray.push(minParamValue);
  }

  let averageParamsArray = avrCounter(maxParamsArray, minParamsArray);

  let diffParamsArray = diffCouter(maxParamsArray, minParamsArray);

  return {
    maxParamsArray,
    minParamsArray,
    averageParamsArray,
    diffParamsArray
  };
}

export function diffCouter(firstArray, secondArray) {
  let diffParamsArray = [];
  for (let index = 0; index < firstArray.length; index++) {
    diffParamsArray.push(
      Math.abs((firstArray[index] - secondArray[index]).toFixed(0))
    );
  }
  return diffParamsArray;
}

export function avrCounter(firstArray, secondArray) {
  let averageParamsArray = [];
  for (let index = 0; index < firstArray.length; index++) {
    averageParamsArray.push((firstArray[index] + secondArray[index]) / 2);
  }
  return averageParamsArray;
}
