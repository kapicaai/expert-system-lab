import React, { Component } from 'react';
import neuralNetwork from '../neural-network';
import data from '../training-data';

import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  ButtonGroup,
  Button,
  Col,
  Row
} from 'react-bootstrap';

const fields = [
  { label: 'Рост', ref: 'height' },
  { label: 'Вес', ref: 'weight' },
  { label: 'Давл. ниж.', ref: 'pressL' },
  { label: 'Давл. верх.', ref: 'pressH' },
  { label: 'Темп.', ref: 'temp' },
  { label: 'Пульс', ref: 'puls' },
  { label: 'Лейкоц.', ref: 'leic' },
  { label: 'СОЭ', ref: 'soe' },
  { label: 'Миоглоб.', ref: 'mio' },
  { label: 'Холест.', ref: 'holest' },
  { label: 'Гемоглоб.', ref: 'hemog' },
  { label: 'Нейтроф.', ref: 'neutro' },
  { label: 'Тромбоц.', ref: 'tromb' },
  { label: 'Гематокр.', ref: 'hemat' }
];

class NeuralNetworkContainer extends Component {
  constructor(props) {
    super(props);

    this.network = neuralNetwork();
    this.state = {
      result: null
    };

    this.onCheckButtonClick = this.onCheckButtonClick.bind(this);
  }

  componentWillMount() {
    this.network.init(data.healthy[0]);
    for (let j = 0; j < 20; j++) {
      for (let i = 0; i < 26; i++) {
        if (data.healthy[i]) {
          this.network.adjustWeights(data.healthy[i], 1);
        }
        if (data.sick[i]) {
          this.network.adjustWeights(data.sick[i], 0);
        }
      }
    }
  }

  renderField(label, ref) {
    return (
      <FormGroup key={ref}>
        <ControlLabel bsSize="sm">{label}</ControlLabel>
        <input
          className="form-control form-control-sm"
          type="number"
          ref={ref}
        />
      </FormGroup>
    );
  }

  renderFields() {
    return fields.map(it => {
      return this.renderField(it.label, it.ref);
    });
  }

  onCheckButtonClick() {
    const refs = this.refs;
    console.log(refs);
    const fieldValues = [];
    fields.forEach(field => {
      fieldValues.push(new Number(refs[field.ref].value));
    });

    this.setState({
      result: this.network.evaluate(fieldValues)
    });
  }

  renderResult() {
    const { result } = this.state;
    if (result == null || result == undefined) {
      return 'No result';
    }
    return result > 0.5 ? 'Здоровый' : 'Больной';
  }

  render() {
    return (
      <Row>
        <Col sm={4}>
          <Form>
            {this.renderFields()}
            <Button onClick={this.onCheckButtonClick}>Check if sick</Button>
          </Form>
        </Col>
        <Col sm={6}>
          {this.network.getWeights().join('\n')}
          <br />
          <br />
          RESULT
          <br />
          {this.renderResult()}
        </Col>
      </Row>
    );
  }
}

export default NeuralNetworkContainer;
