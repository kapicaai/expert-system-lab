import React, { Component } from 'react';

import EntityForm from './new-entity-form';

import getSystemCore from '../expert-system-core';
import { Row, Col } from 'react-bootstrap';

class ExpertSystemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemCore: getSystemCore(),
      result: ''
    };

    this.addEntity = this.addEntity.bind(this);
    this.checkEntity = this.checkEntity.bind(this);
  }

  renderResult() {
    return this.state.result;
  }

  addEntity(fields, entityName) {
    console.log('reached');
    this.state.systemCore.addEntity(fields, entityName);
  }

  renderNewEntityForm() {
    return <EntityForm onAddEntity={this.addEntity} shouldRenderName={true} />;
  }

  checkEntity(entity) {
    const result = this.state.systemCore.checkEntity(entity);
    this.setState({
      result: result
    });
  }

  renderEntityToCheckForm() {
    return <EntityForm onAddEntity={this.checkEntity} />;
  }

  render() {
    return (
      <Row>
        <Col sm="4">
          Add Entity
          {this.renderNewEntityForm()}
        </Col>
        <Col sm="4">
          Check Entity
          {this.renderEntityToCheckForm()}
        </Col>
        <Col sm="4">
          RESULT
          <br />
          {this.renderResult()}
          <br />
          All fields in system:
          {Object.keys(this.state.systemCore.knoledgeBase).join(', ')}
        </Col>
      </Row>
    );
  }
}

export default ExpertSystemContainer;
