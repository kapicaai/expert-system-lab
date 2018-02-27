import React, { Component } from 'react';
import { rawData } from '../training-data';
import data from '../training-data';
import { minMaxAvrCounter, diffCouter } from '../pattern-recognition';
import { Col, Row } from 'react-bootstrap';

class PatternRecognition extends Component {
  goodParams = (avrParamsHealthy, avrParamsSick, rawAvrParams) => {
    let goodParams = [];
    for (let index = 0; index < rawAvrParams.length; index++) {
      if (Math.abs(avrParamsHealthy[index] - rawAvrParams[index]) > 1) {
        goodParams.push(index);
      } else if (Math.abs(avrParamsSick[index] - rawAvrParams[index]) > 1) {
        goodParams.push(index);
      }
    }
    return goodParams;
  };

  dataNormalization = data => {
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

  render() {
    return (
      <Row cols={2} style={{ padding: '3em' }}>
        {/* <Col md={6}>
          {'Max healthy params: ' +
            minMaxAvrCounter(data.healthy).maxParamsArray.toString()}
        </Col>
        <Col md={6}>
          {'Min healthy params: ' +
            minMaxAvrCounter(data.healthy).minParamsArray.toString()}
        </Col>
        <Col md={6}>
          {'Max sick params:' +
            minMaxAvrCounter(data.sick).maxParamsArray.toString()}
        </Col>
        <Col md={6}>
          {'Min sick params:' +
            minMaxAvrCounter(data.sick).minParamsArray.toString()}
        </Col>
        <Col md={6}>
          {'Avr healthy params: ' +
            minMaxAvrCounter(data.healthy).averageParamsArray.toString()}
        </Col> */}
        <Col md={12}>
          {'Diff healthy params: ' +
            minMaxAvrCounter(data.healthy).averageParamsArray.toString()}
        </Col>

        {/* <Col md={6}>
          {'Avr sick params:' +
            minMaxAvrCounter(data.sick).averageParamsArray.toString()}
        </Col> */}
        <Col md={12}>
          {'Diff sick params: ' +
            minMaxAvrCounter(data.sick).averageParamsArray.toString()}
        </Col>
        <Col md={12}>
          {'Diff avr params: ' +
            minMaxAvrCounter(rawData).averageParamsArray.toString()}
        </Col>

        <Col md={12}>
          {'Good params are: ' +
            this.goodParams(
              minMaxAvrCounter(data.healthy).averageParamsArray,
              minMaxAvrCounter(data.sick).averageParamsArray,
              minMaxAvrCounter(rawData).averageParamsArray
            ).toString()}
        </Col>
        <Col md={12}>
          {'Normalized data: ' +
            this.dataNormalization(rawData).map(it => it.toString() + ' | ')}
        </Col>
      </Row>
    );
  }
}

export default PatternRecognition;
