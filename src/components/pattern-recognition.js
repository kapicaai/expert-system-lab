import React, { Component } from 'react';
import { rawData } from '../training-data';
import data from '../training-data';
import { minMaxAvrCounter, diffCouter } from '../pattern-recognition';
import { Col, Row } from 'react-bootstrap';

class PatternRecognition extends Component {
  goodParams = (avrParamsHealthy, avrParamsSick, diffAvrParams) => {
    let goodParams = [];
    for (let index = 0; index < diffAvrParams.length; index++) {
      if (
        avrParamsHealthy[index] >= avrParamsSick[index] &&
        diffAvrParams[index] >= avrParamsHealthy * 0.15
      ) {
        goodParams.push(index);
      } else if (
        avrParamsHealthy[index] < avrParamsSick[index] &&
        diffAvrParams[index] >= avrParamsSick[index] * 0.15
      ) {
        goodParams.push(index);
      }
    }
    return goodParams;
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
            minMaxAvrCounter(data.healthy).diffParamsArray.toString()}
        </Col>

        {/* <Col md={6}>
          {'Avr sick params:' +
            minMaxAvrCounter(data.sick).averageParamsArray.toString()}
        </Col> */}
        <Col md={12}>
          {'Diff sick params: ' +
            minMaxAvrCounter(data.sick).diffParamsArray.toString()}
        </Col>
        <Col md={12}>
          {'Diff avr params: ' +
            diffCouter(
              minMaxAvrCounter(data.sick).averageParamsArray,
              minMaxAvrCounter(data.healthy).averageParamsArray
            ).toString()}
        </Col>

        <Col md={12}>
          {'Good params are: ' +
            this.goodParams(
              minMaxAvrCounter(data.healthy).averageParamsArray,
              minMaxAvrCounter(data.sick).averageParamsArray,
              diffCouter(
                minMaxAvrCounter(data.sick).averageParamsArray,
                minMaxAvrCounter(data.healthy).averageParamsArray
              )
            ).toString()}
        </Col>
      </Row>
    );
  }
}

export default PatternRecognition;
