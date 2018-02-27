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

  getAverages(data) {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let averages = [];
    for(let i = 0; i < 14; i++) {
      const paramInEntries = data.map(entry => entry[i]);
      averages.push(paramInEntries.reduce(reducer)/paramInEntries.length);
    }
    return averages;
  }

  checkAttribute(averageH, averageS) {
    if(Math.abs(averageH - averageS) > 0.15) {
      return true;
    }
    return false;
  }


  render() {
    const normalizedHealthy = this.dataNormalization(data.healthy);
    const normalizedSick = this.dataNormalization(data.sick);

    const healthyAverages = this.getAverages(normalizedHealthy);
    const sickAverages = this.getAverages(normalizedSick);

    const goodAttributes = [];

    healthyAverages.forEach((element, index) => {
      if(this.checkAttribute(element, sickAverages[index])) {
        goodAttributes.push(index);
      }
    });

    return (
      <Row cols={2} style={{ padding: '3em' }}>
        <Col md={12}>
          {'Normalized data: ' +
            this.dataNormalization(rawData).map(it => it.toString() + ' | ')}
        </Col>

        <Col md={12}>
          Good attributes
          {goodAttributes.toString()}
        </Col>
      </Row>
    );
  }
}

export default PatternRecognition;
