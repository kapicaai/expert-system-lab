import React, { Component } from 'react';

import EntityForm from './new-entity-form';

import getSystemCore from '../expert-system-core';
import { Button } from 'react-bootstrap';

class ExpertSystemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      systemCore: getSystemCore(),
      result: ''
    };

    this.addEntity = this.addEntity.apply(this);
    this.checkEntity = this.checkEntity.bind(this);
  }

  renderResult() {
    return this.state.result;
  }

  addEntity(fields, entityName) {
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
      <div>
        Add Entity
        {this.renderNewEntityForm()}
        <hr />
        Check Entity
        {this.renderEntityToCheckForm()}
        <hr />
        All fields in system
        {this.state.systemCore.knoledgeBase}
      </div>
    );
  }
}

export default ExpertSystemContainer;
