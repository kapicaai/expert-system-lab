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
    // console.log(`max param ${paramsIndex} : ${maxParamValue}`);
    maxParamsArray.push(maxParamValue);

    //находим и добавляем в масссив минимальное значение текущего параметра
    let minParamValue = Math.min(...allParamsValues);
    // console.log(`min param ${paramsIndex} : ${minParamValue}`);
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

export function dataNormalization(data) {
  let normalizedData = [];
  const minParamsArray = [...minMaxAvrCounter(data).minParamsArray];
  const maxParamsArray = [...minMaxAvrCounter(data).maxParamsArray];

  console.log(data[0][0] - minParamsArray[0]);

  for (let caseIndex = 0; caseIndex < data.length; caseIndex++) {
    normalizedData[caseIndex] = [];
    for (let propIndex = 0; propIndex < data[caseIndex].length; propIndex++) {
      normalizedData[caseIndex][propIndex] = Math.abs(
        (data[caseIndex][propIndex] - minParamsArray[propIndex]) /
          (maxParamsArray[propIndex] - minParamsArray[propIndex])
      ).toFixed(3);
    }
  }

  return normalizedData;
};
